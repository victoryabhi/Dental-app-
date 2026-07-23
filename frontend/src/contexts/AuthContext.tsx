import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';
import { auth, db } from '../services/firebase';

interface User {
  name: string;
  doctorId: string;
  email: string;
  phone: string;
  clinicName: string;
  clinicAddress: string;
  profilePhotoUri?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  emailError: string | null;
  passwordError: string | null;
  otpError: string | null;
  isDarkTheme: boolean;
  isBiometricEnabled: boolean;
  isTwoFactorEnabled: boolean;
  
  setEmailError: (error: string | null) => void;
  setPasswordError: (error: string | null) => void;
  setOtpError: (error: string | null) => void;
  
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, doctorId: string, email: string, phone: string, clinic: string, address: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, doctorId: string, email: string, phone: string, clinic: string, address: string) => void;
  updateProfilePhoto: (uri: string) => void;
  setDarkTheme: (isDark: boolean) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setTwoFactorEnabled: (enabled: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  
  const [isDarkTheme, setIsDarkThemeState] = useState<boolean>(false);
  const [isBiometricEnabled, setIsBiometricEnabledState] = useState<boolean>(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabledState] = useState<boolean>(false);

  useEffect(() => {
    // Load local settings & profile fallback
    const storedTheme = localStorage.getItem('is_dark_theme') === 'true';
    const storedBiometric = localStorage.getItem('is_biometric_enabled') === 'true';
    const stored2FA = localStorage.getItem('is_two_factor_enabled') === 'true';
    const storedUser = localStorage.getItem('user_profile');
    
    setIsDarkThemeState(storedTheme);
    setIsBiometricEnabledState(storedBiometric);
    setIsTwoFactorEnabledState(stored2FA);
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {}
    }
    
    if (storedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Firebase Auth State Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        // Fetch doctor profile data from Realtime Database
        try {
          const userRef = ref(db, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const data = snapshot.val() as User;
            setUser(data);
            localStorage.setItem('user_profile', JSON.stringify(data));
          } else if (!localStorage.getItem('user_profile')) {
            const emailPrefix = firebaseUser.email ? firebaseUser.email.split('@')[0] : 'New Doctor';
            const fallbackUser: User = {
              name: firebaseUser.displayName || emailPrefix,
              doctorId: 'Setup Required',
              email: firebaseUser.email || '',
              phone: '',
              clinicName: 'Clinic Setup Required',
              clinicAddress: '',
              profilePhotoUri: firebaseUser.photoURL
            };
            setUser(fallbackUser);
          }
        } catch (dbErr) {
          console.warn("Realtime Database fetch error. Using local profile cache:", dbErr);
        }
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user_profile');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    if (!email.includes('@')) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError(null);
    setPasswordError(null);
    
    try {
      const pass = password || "DefaultPassword123!";
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (e: any) {
      console.error("Firebase Login Error", e);
      if (e.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password');
      } else if (e.code === 'auth/user-not-found') {
        setEmailError('Account not found');
      } else {
        setEmailError('Authentication failed');
      }
      return false;
    }
  };

  const register = async (
    name: string,
    doctorId: string,
    email: string,
    phone: string,
    clinic: string,
    address: string,
    password?: string
  ): Promise<boolean> => {
    try {
      const pass = password || "DefaultPassword123!";
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const firebaseUser = userCredential.user;
      
      const newProfile: User = {
        name,
        doctorId: doctorId || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        email,
        phone,
        clinicName: clinic,
        clinicAddress: address,
        profilePhotoUri: null
      };

      // Store doctor profile in Realtime Database
      try {
        await set(ref(db, `users/${firebaseUser.uid}`), newProfile);
      } catch (dbErr) {
        console.warn("Realtime Database save failed during registration. Using local state.", dbErr);
      }
      
      setUser(newProfile);
      localStorage.setItem('user_profile', JSON.stringify(newProfile));
      return true;
    } catch (e: any) {
      console.error("Firebase Registration Error", e);
      setEmailError(e.message || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user_profile');
    } catch (e) {
      console.error("Firebase SignOut Error", e);
    }
  };

  const updateProfile = async (
    name: string,
    doctorId: string,
    email: string,
    phone: string,
    clinic: string,
    address: string
  ) => {
    const updated: User = {
      name,
      doctorId,
      email,
      phone,
      clinicName: clinic,
      clinicAddress: address,
      profilePhotoUri: user?.profilePhotoUri || null
    };

    setUser(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));

    if (!auth.currentUser) return;

    try {
      await set(ref(db, `users/${auth.currentUser.uid}`), updated);
    } catch (e) {
      console.warn("Realtime Database Profile Update Failed.", e);
    }
  };

  const updateProfilePhoto = async (uri: string) => {
    if (!user) return;
    
    const updated = { ...user, profilePhotoUri: uri };
    setUser(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));

    if (!auth.currentUser) return;

    try {
      await update(ref(db, `users/${auth.currentUser.uid}`), { profilePhotoUri: uri });
    } catch (e) {
      console.warn("Realtime Database Profile Photo Update Failed.", e);
    }
  };

  const setDarkTheme = (isDark: boolean) => {
    setIsDarkThemeState(isDark);
    localStorage.setItem('is_dark_theme', isDark.toString());
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setBiometricEnabled = (enabled: boolean) => {
    setIsBiometricEnabledState(enabled);
    localStorage.setItem('is_biometric_enabled', enabled.toString());
  };

  const setTwoFactorEnabled = (enabled: boolean) => {
    setIsTwoFactorEnabledState(enabled);
    localStorage.setItem('is_two_factor_enabled', enabled.toString());
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      emailError,
      passwordError,
      otpError,
      isDarkTheme,
      isBiometricEnabled,
      isTwoFactorEnabled,
      setEmailError,
      setPasswordError,
      setOtpError,
      login,
      register,
      logout,
      updateProfile,
      updateProfilePhoto,
      setDarkTheme,
      setBiometricEnabled,
      setTwoFactorEnabled
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
