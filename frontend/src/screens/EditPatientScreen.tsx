import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDashboard, Patient } from '../contexts/DashboardContext';
import AppTextField from '../components/AppTextField';
import AppButton from '../components/AppButton';
import { ArrowLeft, Camera, Sparkles, AlertCircle } from 'lucide-react';

const EditPatientScreen = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patients, updatePatient, deletePatient } = useDashboard();
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1990-01-01'); // Mock DOB
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [history, setHistory] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const found = patients.find(p => p.id === patientId);
    if (found) {
      setPatient(found);
      setName(found.name);
      setPhone(found.phone);
      setHistory(found.history || '');
      setProfilePhoto(found.profilePhotoUri || null);
    }
  }, [patientId, patients]);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Patient name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updated: Patient = {
      ...patient,
      name: name.trim(),
      gender,
      phone: phone.trim(),
      history: history.trim(),
      profilePhotoUri: profilePhoto
    };

    updatePatient(updated);
    navigate(`/patient_details/${patient.id}`);
  };

  const handleDelete = () => {
    if (!patient) return;
    deletePatient(patient.id);
    setShowDeleteModal(false);
    navigate('/patient_list');
  };

  if (!patient) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-black text-gray-900">
            Edit Patient Screen
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Update the clinical files for patient ID: #{patient.id}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Personal Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
            Personal Information
          </h3>

          <div className="flex items-center gap-4 py-2">
            <label className="relative cursor-pointer group flex-shrink-0">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleProfilePhotoChange}
                className="hidden"
              />
              <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6" />
                )}
              </div>
            </label>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900">{name || 'Upload Portrait'}</h4>
              <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Edit patient face picture</p>
            </div>
          </div>

          <AppTextField
            label="Full Name"
            placeholder="Enter legal name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppTextField
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm text-sm bg-gray-50/50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <AppTextField
            label="Phone Number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            error={errors.phone}
          />
        </div>

        {/* Clinical History Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
            Clinical History
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              Clinical History / Notes
            </label>
            <textarea
              rows={3}
              placeholder="Clinical Notes"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              className="block w-full rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm text-sm bg-gray-50/50"
            />
          </div>

          {/* Alert Tags */}
          <div className="space-y-2">
            <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Clinical Alerts</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black uppercase rounded-lg border border-red-100">#Hypertension</span>
              <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black uppercase rounded-lg border border-red-100">#Penicillin Allergy</span>
              <button type="button" className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-400 text-[10px] font-black uppercase rounded-lg cursor-pointer hover:bg-gray-100">
                + Add Alert
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex gap-4">
          <div className="w-12 h-12 bg-blue-100 text-[#007AFF] rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wide">AI-Assisted Clinical Guarantee</h4>
            <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-1">
              Predictive analysis accuracy guarantees are bound to the radiographic data input. Validate compliance parameters before finalizing.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <AppButton type="submit" fullWidth className="py-4 font-bold text-sm">
            Update Changes
          </AppButton>
          <AppButton 
            type="button" 
            variant="outline" 
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-white border-red-200 hover:bg-red-50/50 text-red-500 py-4 font-bold text-sm"
          >
            Delete Patient
          </AppButton>
        </div>
      </form>

      {/* Delete Patient Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-left shadow-xl border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-2">Delete Record</h3>
            <p className="text-xs text-gray-400 font-semibold mb-6">Are you sure you want to permanently delete this patient record? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-xs font-bold text-gray-400 bg-transparent border-none cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl border-none cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditPatientScreen;
