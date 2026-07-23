import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard, Patient } from '../contexts/DashboardContext';
import AppTextField from '../components/AppTextField';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, Camera } from 'lucide-react';

const AddPatientScreen = () => {
  const navigate = useNavigate();
  const { addPatient } = useDashboard();
  
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [history, setHistory] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    
    const newErrors: { [key: string]: string } = {};
    if (!id.trim()) newErrors.id = 'Patient ID is required';
    if (!name.trim()) newErrors.name = 'Patient name is required';
    if (!dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const today = new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });

    // Derive age from DOB roughly for state compatibility
    let calculatedAge = '35';
    try {
      const birthYear = new Date(dob).getFullYear();
      if (!isNaN(birthYear)) {
        calculatedAge = (new Date().getFullYear() - birthYear).toString();
      }
    } catch (e) {}

    const newPatient: Patient = {
      id: id.trim(),
      name: name.trim(),
      age: calculatedAge,
      gender,
      phone: phone.trim(),
      history: history.trim(),
      status: 'Low Risk',
      date: today,
      profilePhotoUri: profilePhoto,
      latestRadiographUri: null
    };

    setIsSaving(true);
    addPatient(newPatient)
      .then(() => {
        setIsSaving(false);
        navigate('/patient_list');
      })
      .catch((err) => {
        console.error("Save Patient Error", err);
        setIsSaving(false);
        navigate('/patient_list');
      });
  };

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
            Register New Patient
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Complete the clinical record to initiate diagnostic workflow.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        
        {/* Profile Photo Selector */}
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
            <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 stroke-[1.5]" />
              )}
            </div>
          </label>
          <span className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-wider">Patient Portrait</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppTextField
            label="Patient ID"
            placeholder="e.g. #45213"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              if (errors.id) setErrors({ ...errors, id: '' });
            }}
            error={errors.id}
          />

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppTextField
            label="Date of Birth"
            type="date"
            placeholder="MM/DD/YYYY"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              if (errors.dob) setErrors({ ...errors, dob: '' });
            }}
            error={errors.dob}
          />

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              Select Gender
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
          placeholder="e.g. +1 (555) 000-0000"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors({ ...errors, phone: '' });
          }}
          error={errors.phone}
        />

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
            Clinical History / Notes
          </label>
          <textarea
            rows={3}
            placeholder="Detail any allergies, chronic conditions, or previous endodontic procedures..."
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="block w-full rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm text-sm bg-gray-50/50"
          />
        </div>

        {/* AI Optimization Banner */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3">
          <div className="w-10 h-10 bg-blue-100 text-[#007AFF] rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wide">AI Optimization</h4>
            <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-0.5">
              Provide clear clinical notes to help AI models predict accurate material recommendations.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <AppButton 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-1/2 py-3 bg-white hover:bg-gray-50 border-gray-200 text-gray-500 font-bold"
          >
            Cancel
          </AppButton>
          <AppButton type="submit" fullWidth disabled={isSaving} className="w-1/2 py-3 font-bold">
            {isSaving ? 'Registering...' : 'Save Patient'}
          </AppButton>
        </div>
      </form>

    </div>
  );
};

export default AddPatientScreen;
