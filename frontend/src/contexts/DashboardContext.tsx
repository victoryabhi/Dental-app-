import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
import { 
  ref, 
  onValue, 
  set, 
  update, 
  remove 
} from 'firebase/database';
import { ref as storageRefPath, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';

export interface Patient {
  id: string;
  name: string;
  age: string;
  gender: string;
  history: string;
  phone: string;
  status: string;
  date: string;
  profilePhotoUri?: string | null;
  latestRadiographUri?: string | null;
}

export interface Analysis {
  id: string;
  patientId: string;
  patientName: string;
  result: string;
  time: string;
  date: string;
  rdtValue: string;
  confidence: string;
  xRayUri?: string | null;
  recommendations: string;
  material: string;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  patientId?: string | null;
}

interface AnalysisState {
  xrayImageUri: string | null;
  detectedRegions: any[];
  rdtValue: string | null;
  calculatedRdt: number;
  riskLevel: string | null;
  recommendations: string | null;
  selectedMaterial: string | null;
  aiRecommendedMaterial: string | null;
}

interface DashboardContextType {
  patients: Patient[];
  analyses: Analysis[];
  notifications: Notification[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  currentAnalysis: AnalysisState;
  updateAnalysis: (updates: Partial<AnalysisState>) => void;
  clearAnalysis: () => void;
  addPatient: (patient: Patient) => Promise<void>;
  updatePatient: (patient: Patient) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  saveAnalysis: (analysis: Omit<Analysis, 'id' | 'time' | 'date'>) => Promise<void>;
  clearNotifications: () => Promise<void>;
}

const defaultAnalysisState: AnalysisState = {
  xrayImageUri: null,
  detectedRegions: [],
  rdtValue: null,
  calculatedRdt: 0.4,
  riskLevel: 'High Risk',
  recommendations: null,
  selectedMaterial: null,
  aiRecommendedMaterial: null,
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Helper function to upload image string (Base64) to Firebase Storage
const uploadXRayImage = async (base64Str: string | null): Promise<string | null> => {
  if (!base64Str) return null;
  if (!base64Str.startsWith('data:image')) {
    return base64Str; // Already a URL or direct assets path
  }
  try {
    const fileRef = storageRefPath(storage, `radiographs/${Date.now()}.png`);
    await uploadString(fileRef, base64Str, 'data_url');
    return await getDownloadURL(fileRef);
  } catch (e) {
    console.error("Firebase Image Upload Error", e);
    return base64Str; // Return base64 as fallback
  }
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisState>(defaultAnalysisState);

  // Load cached database records from local storage on mount
  useEffect(() => {
    const storedPatients = localStorage.getItem('patients_list');
    const storedAnalyses = localStorage.getItem('analyses_list');
    const storedNotifications = localStorage.getItem('notifications_list');

    if (storedPatients) setPatients(JSON.parse(storedPatients));
    if (storedAnalyses) setAnalyses(JSON.parse(storedAnalyses));
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));

    // Request desktop notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const isFirstLoadAnalyses = useRef(true);

  // Sync Patients, Analyses, and Notifications in real time from Realtime Database
  useEffect(() => {
    const patientsRef = ref(db, 'patients');
    const unsubscribePatients = onValue(patientsRef, (snapshot) => {
      const pList: Patient[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          pList.push({ id: childSnapshot.key, ...childSnapshot.val() } as Patient);
        });
        setPatients(pList);
        localStorage.setItem('patients_list', JSON.stringify(pList));
      } else {
        // Auto-seed initial patients if empty in RDB
        const initialPatients: Patient[] = [
          { id: "45210", name: "Nancy Thorne", age: "38", gender: "Female", history: "No major issues", phone: "555-0101", status: "High Risk", date: "24 Jan, 2024", latestRadiographUri: null },
          { id: "45211", name: "David Rice", age: "33", gender: "Male", history: "Diabetes Type 2", phone: "555-0102", status: "Low Risk", date: "23 Jan, 2024", latestRadiographUri: null },
          { id: "45212", name: "Sarah Jenkins", age: "45", gender: "Female", history: "Hypertension", phone: "555-0103", status: "Moderate", date: "22 Jan, 2024", latestRadiographUri: null }
        ];
        initialPatients.forEach(p => {
          try {
            set(ref(db, `patients/${p.id}`), p);
          } catch (e) {}
        });
        setPatients(initialPatients);
        localStorage.setItem('patients_list', JSON.stringify(initialPatients));
      }
    });

    const qAnalyses = ref(db, 'analyses');
    const unsubscribeAnalyses = onValue(qAnalyses, (snapshot) => {
      const aList: Analysis[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          aList.push({ id: childSnapshot.key, ...childSnapshot.val() } as Analysis);
        });
        aList.reverse();
        
        // Trigger browser notification for newly added analysis
        if (!isFirstLoadAnalyses.current && aList.length > 0) {
          const previousAnalyses = JSON.parse(localStorage.getItem('analyses_list') || '[]');
          const newItems = aList.filter(a => !previousAnalyses.some((pa: any) => pa.id === a.id));
          
          newItems.forEach(newItem => {
            if ('Notification' in window && Notification.permission === 'granted') {
              try {
                new window.Notification("AI Analysis Complete 🔔", {
                  body: `Analysis for ${newItem.patientName} is ready. Result: ${newItem.result}`,
                  tag: `analysis-${newItem.id}`
                });
              } catch (e) {
                console.error("Browser notification failed", e);
              }
            }
          });
        }
        isFirstLoadAnalyses.current = false;

        setAnalyses(aList);
        localStorage.setItem('analyses_list', JSON.stringify(aList));
      } else {
        // Auto-seed initial analyses if empty in RDB
        const initialAnalyses: Analysis[] = [
          { id: "1", patientId: "45210", patientName: "Nancy Thorne", result: "High Risk", time: "10:30 AM", date: "24 Jan, 2024", rdtValue: "0.4 mm", confidence: "98.4%", material: "Biodentine", recommendations: "Direct Pulp Capping recommended due to proximity to pulp chamber.", xRayUri: null },
          { id: "2", patientId: "45211", patientName: "David Rice", result: "Low Risk", time: "09:15 AM", date: "23 Jan, 2024", rdtValue: "1.8 mm", confidence: "99.1%", material: "MTA", recommendations: "Indirect Pulp Capping or standard restoration suitable.", xRayUri: null },
          { id: "3", patientId: "45212", patientName: "Sarah Jenkins", result: "Moderate", time: "04:30 PM", date: "22 Jan, 2024", rdtValue: "0.9 mm", confidence: "97.5%", material: "Calcium Hydroxide", recommendations: "Stepwise excavation or indirect capping suggested.", xRayUri: null }
        ];
        initialAnalyses.forEach(a => {
          try {
            set(ref(db, `analyses/${a.id}`), a);
          } catch (e) {}
        });
        setAnalyses(initialAnalyses);
        localStorage.setItem('analyses_list', JSON.stringify(initialAnalyses));
      }
    });

    const notificationsRef = ref(db, 'notifications');
    const unsubscribeNotifications = onValue(notificationsRef, (snapshot) => {
      const nList: Notification[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          nList.push(childSnapshot.val() as Notification);
        });
        setNotifications(nList);
        localStorage.setItem('notifications_list', JSON.stringify(nList));
      } else {
        // Auto-seed initial notifications if empty in RDB
        const initialNotifications: Notification[] = [
          { id: 1, title: "AI Analysis Complete", description: "Analysis for Patient Nancy Thorne (#45210) is ready.", time: "2m ago", patientId: "45210" },
          { id: 2, title: "System Update", description: "New clinical AI model version 2.4 deployed.", time: "1h ago" },
          { id: 3, title: "Patient Appointment", description: "David Rice is scheduled for 10:30 AM today.", time: "3h ago", patientId: "45211" }
        ];
        initialNotifications.forEach(n => {
          try {
            set(ref(db, `notifications/${n.id}`), n);
          } catch (e) {}
        });
        setNotifications(initialNotifications);
        localStorage.setItem('notifications_list', JSON.stringify(initialNotifications));
      }
    });

    return () => {
      unsubscribePatients();
      unsubscribeAnalyses();
      unsubscribeNotifications();
    };
  }, []);

  const addPatient = async (newPatient: Patient) => {
    // 1. Write text details to Realtime Database instantly (completes in ~100ms)
    // To prevent giant payload rejects, strip raw base64 from database first, upload it in background
    const initialPatientData = {
      ...newPatient,
      profilePhotoUri: (newPatient.profilePhotoUri && newPatient.profilePhotoUri.startsWith('data:image')) ? null : newPatient.profilePhotoUri,
      latestRadiographUri: (newPatient.latestRadiographUri && newPatient.latestRadiographUri.startsWith('data:image')) ? null : newPatient.latestRadiographUri
    };

    setPatients(prev => {
      const updated = [newPatient, ...prev];
      localStorage.setItem('patients_list', JSON.stringify(updated));
      return updated;
    });

    try {
      set(ref(db, `patients/${newPatient.id}`), initialPatientData).catch(e => {
        console.warn("RDB background addPatient error:", e);
      });
    } catch (e) {
      console.warn("RDB addPatient Error", e);
    }

    // 2. Perform file upload in background to avoid blocking redirect
    if (newPatient.profilePhotoUri && newPatient.profilePhotoUri.startsWith('data:image')) {
      uploadXRayImage(newPatient.profilePhotoUri).then(uploadedUrl => {
        if (uploadedUrl && !uploadedUrl.startsWith('data:image')) {
          setPatients(prev => {
            const updated = prev.map(p => p.id === newPatient.id ? { ...p, profilePhotoUri: uploadedUrl } : p);
            localStorage.setItem('patients_list', JSON.stringify(updated));
            return updated;
          });
          update(ref(db, `patients/${newPatient.id}`), { profilePhotoUri: uploadedUrl }).catch(() => {});
        }
      }).catch(() => {});
    }
  };

  const updatePatient = async (updatedPatient: Patient) => {
    const initialPatientData = {
      ...updatedPatient,
      profilePhotoUri: (updatedPatient.profilePhotoUri && updatedPatient.profilePhotoUri.startsWith('data:image')) ? null : updatedPatient.profilePhotoUri,
      latestRadiographUri: (updatedPatient.latestRadiographUri && updatedPatient.latestRadiographUri.startsWith('data:image')) ? null : updatedPatient.latestRadiographUri
    };

    setPatients(prev => {
      const updated = prev.map(p => p.id === updatedPatient.id ? updatedPatient : p);
      localStorage.setItem('patients_list', JSON.stringify(updated));
      return updated;
    });
    if (selectedPatient && selectedPatient.id === updatedPatient.id) {
      setSelectedPatient(updatedPatient);
    }

    try {
      set(ref(db, `patients/${updatedPatient.id}`), initialPatientData).catch(e => {
        console.warn("RDB background updatePatient error:", e);
      });
    } catch (e) {
      console.warn("RDB updatePatient Error", e);
    }

    // Perform photo upload in background
    if (updatedPatient.profilePhotoUri && updatedPatient.profilePhotoUri.startsWith('data:image')) {
      uploadXRayImage(updatedPatient.profilePhotoUri).then(uploadedUrl => {
        if (uploadedUrl && !uploadedUrl.startsWith('data:image')) {
          setPatients(prev => {
            const updated = prev.map(p => p.id === updatedPatient.id ? { ...p, profilePhotoUri: uploadedUrl } : p);
            localStorage.setItem('patients_list', JSON.stringify(updated));
            return updated;
          });
          if (selectedPatient && selectedPatient.id === updatedPatient.id) {
            setSelectedPatient({ ...initialPatientData, profilePhotoUri: uploadedUrl });
          }
          update(ref(db, `patients/${updatedPatient.id}`), { profilePhotoUri: uploadedUrl }).catch(() => {});
        }
      }).catch(() => {});
    }
  };

  const deletePatient = async (id: string) => {
    setPatients(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('patients_list', JSON.stringify(updated));
      return updated;
    });
    setAnalyses(prev => {
      const updated = prev.filter(a => a.patientId !== id);
      localStorage.setItem('analyses_list', JSON.stringify(updated));
      return updated;
    });
    if (selectedPatient && selectedPatient.id === id) {
      setSelectedPatient(null);
    }

    try {
      remove(ref(db, `patients/${id}`)).catch(e => {
        console.warn("RDB background deletePatient error:", e);
      });
    } catch (e) {
      console.warn("RDB deletePatient Error:", e);
    }
  };

  const saveAnalysis = async (analysisData: Omit<Analysis, 'id' | 'time' | 'date'>) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
    
    const analysisId = Math.floor(100000 + Math.random() * 900000).toString();
    const newAnalysis: Analysis = {
      ...analysisData,
      id: analysisId,
      time: formattedTime,
      date: formattedDate,
      xRayUri: null // Will update once background upload completes
    };

    setAnalyses(prev => {
      const updated = [newAnalysis, ...prev];
      localStorage.setItem('analyses_list', JSON.stringify(updated));
      return updated;
    });

    setPatients(prev => {
      const updated = prev.map(p => {
        if (p.id === analysisData.patientId) {
          return {
            ...p,
            status: analysisData.result
          };
        }
        return p;
      });
      localStorage.setItem('patients_list', JSON.stringify(updated));
      return updated;
    });

    try {
      // Save analysis details (without image first)
      set(ref(db, `analyses/${analysisId}`), newAnalysis).catch(e => {
        console.warn("RDB background saveAnalysis error:", e);
      });
      
      // Update patient status in database
      update(ref(db, `patients/${analysisData.patientId}`), {
        status: analysisData.result
      }).catch(e => {
        console.warn("RDB background update patient status error:", e);
      });

      // Add notification
      const notificationId = Math.floor(1000 + Math.random() * 9000);
      const newNotification: Notification = {
        id: notificationId,
        title: "AI Analysis Complete",
        description: `Analysis for Patient ${analysisData.patientName} (#${analysisData.patientId}) is ready.`,
        time: "Just now",
        patientId: analysisData.patientId
      };
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('notifications_list', JSON.stringify(updated));
        return updated;
      });
      await set(ref(db, `notifications/${notificationId}`), newNotification);

      // Perform heavy x-ray upload in the background
      if (analysisData.xRayUri && analysisData.xRayUri.startsWith('data:image')) {
        uploadXRayImage(analysisData.xRayUri).then(secureXRayURL => {
          if (secureXRayURL && !secureXRayURL.startsWith('data:image')) {
            setAnalyses(prev => {
              const updated = prev.map(a => a.id === analysisId ? { ...a, xRayUri: secureXRayURL } : a);
              localStorage.setItem('analyses_list', JSON.stringify(updated));
              return updated;
            });
            update(ref(db, `analyses/${analysisId}`), { xRayUri: secureXRayURL }).catch(() => {});
            update(ref(db, `patients/${analysisData.patientId}`), { latestRadiographUri: secureXRayURL }).catch(() => {});
          }
        }).catch(() => {});
      }
    } catch (e) {
      console.warn("RDB saveAnalysis Error", e);
    }
  };

  const clearNotifications = async () => {
    setNotifications([]);
    localStorage.setItem('notifications_list', JSON.stringify([]));

    try {
      await remove(ref(db, 'notifications'));
    } catch (e) {
      console.warn("RDB clearNotifications Error:", e);
    }
  };

  const updateAnalysis = (updates: Partial<AnalysisState>) => {
    setCurrentAnalysis(prev => ({ ...prev, ...updates }));
  };

  const clearAnalysis = () => {
    setCurrentAnalysis(defaultAnalysisState);
  };

  return (
    <DashboardContext.Provider value={{
      patients,
      analyses,
      notifications,
      selectedPatient,
      setSelectedPatient,
      currentAnalysis,
      updateAnalysis,
      clearAnalysis,
      addPatient,
      updatePatient,
      deletePatient,
      saveAnalysis,
      clearNotifications
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
