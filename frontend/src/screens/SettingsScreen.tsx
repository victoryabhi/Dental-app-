import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ShieldCheck, Lock, Eye, Bell, Sun, Moon, LogOut, Camera, User as UserIcon, Mail, Phone, Building2, MapPin, Edit3 } from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { user, updateProfile, updateProfilePhoto, isDarkTheme, setDarkTheme, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.name || 'Alex Smith');
  const [doctorId, setDoctorId] = useState(user?.doctorId || 'DOC-99120');
  const [email, setEmail] = useState(user?.email || 'alexsmith@dental.com');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '+1 555-0199');
  const [clinicName, setClinicName] = useState(user?.clinicName || 'Apex Orthodontics');
  const [clinicAddress, setClinicAddress] = useState(user?.clinicAddress || '123 Dental Way, Suite 400');
  const [photoUri, setPhotoUri] = useState<string | null>(user?.profilePhotoUri || null);

  const [hipaaShield, setHipaaShield] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionLogs, setSessionLogs] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(true);
  const [appointmentReminder, setAppointmentReminder] = useState(false);

  const handleSave = () => {
    updateProfile(fullName, doctorId, email, phoneNumber, clinicName, clinicAddress);
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUri(result);
        updateProfilePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ToggleItem = ({ label, desc, checked, onChange, icon: Icon }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <span className="text-xs font-bold text-gray-900 block">{label}</span>
          <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">{desc}</span>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
          className="sr-only peer" 
        />
        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#007AFF]"></div>
      </label>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Profile' : 'Settings'}
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            {isEditing ? 'Modify your clinical identity parameters' : 'App preferences & security options'}
          </p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E3F2FD] text-[#007AFF] hover:bg-blue-100 font-bold text-xs rounded-xl border-none cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        /* Edit Profile Section */
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          
          {/* Avatar Edit */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                {photoUri ? (
                  <img src={photoUri} alt="Profile Photo Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 stroke-[1.5]" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-[#007AFF] text-white rounded-full border-none shadow cursor-pointer hover:bg-blue-600 transition-colors">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoChange} 
                  className="hidden" 
                />
                <Camera className="w-4 h-4" />
              </label>
            </div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Tap camera icon to change photo</span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <AppTextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Dr. Alex Smith"
              leftIcon={<UserIcon className="w-5 h-5 text-gray-400" />}
            />

            <AppTextField
              label="Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="e.g. DOC-99120"
              leftIcon={<ShieldCheck className="w-5 h-5 text-gray-400" />}
            />

            <AppTextField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alexsmith@dental.com"
              leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
            />

            <AppTextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. +1 555-0199"
              leftIcon={<Phone className="w-5 h-5 text-gray-400" />}
            />

            <AppTextField
              label="Clinic Name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="e.g. Apex Orthodontics"
              leftIcon={<Building2 className="w-5 h-5 text-gray-400" />}
            />

            <AppTextField
              label="Clinic Address"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              placeholder="e.g. 123 Dental Way"
              leftIcon={<MapPin className="w-5 h-5 text-gray-400" />}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <button
              onClick={() => setIsEditing(false)}
              className="w-1/2 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <AppButton
              onClick={handleSave}
              className="w-1/2 py-3 font-bold text-xs"
            >
              Save Profile
            </AppButton>
          </div>

        </div>
      ) : (
        /* Settings Read-only View */
        <>
          {/* User Profile Header Card */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
              {photoUri ? (
                <img src={photoUri} alt="Profile Photo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-black">{fullName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">{fullName}</h3>
              <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">ID: {doctorId}</span>
              <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-wider block mt-0.5">{clinicName}</span>
            </div>
          </div>

          {/* Clinic Address Info Card */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Clinic Details
            </h4>
            <div className="space-y-2 text-xs font-semibold text-gray-500">
              <div className="flex justify-between">
                <span>Email</span>
                <span className="text-gray-950 font-bold">{email}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone</span>
                <span className="text-gray-950 font-bold">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="text-gray-950 font-bold text-right">{clinicAddress}</span>
              </div>
            </div>
          </div>

          {/* Security & HIPAA */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Security & HIPAA
            </h4>
            <div className="space-y-1">
              <ToggleItem 
                label="HIPAA Compliance Shield" 
                desc="Secure audit logs generated by EMR" 
                checked={hipaaShield} 
                onChange={() => setHipaaShield(!hipaaShield)} 
                icon={ShieldCheck} 
              />
              <ToggleItem 
                label="Two Factor Authentication" 
                desc="Secure your account with SMS or App" 
                checked={twoFactor} 
                onChange={() => setTwoFactor(!twoFactor)} 
                icon={Lock} 
              />
              <ToggleItem 
                label="Session Logs" 
                desc="Track session activity logs" 
                checked={sessionLogs} 
                onChange={() => setSessionLogs(!sessionLogs)} 
                icon={Eye} 
              />
            </div>
          </div>

          {/* App Notifications */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              App Notifications
            </h4>
            <div className="space-y-1">
              <ToggleItem 
                label="AI Analysis Results" 
                desc="Notify when diagnosis report is ready" 
                checked={aiAnalysis} 
                onChange={() => setAiAnalysis(!aiAnalysis)} 
                icon={Bell} 
              />
              <ToggleItem 
                label="Patient Appointment Reminders" 
                desc="Receive reminders for scheduled visits" 
                checked={appointmentReminder} 
                onChange={() => setAppointmentReminder(!appointmentReminder)} 
                icon={Bell} 
              />
            </div>
          </div>

          {/* Design Theme */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Design Theme
            </h4>
            
            <div className="grid grid-cols-2 gap-4 pt-1">
              <button
                onClick={() => setDarkTheme(false)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  !isDarkTheme 
                    ? 'border-[#007AFF] ring-2 ring-blue-500/10 bg-blue-50/10' 
                    : 'border-gray-100 bg-white hover:bg-gray-50'
                }`}
              >
                <Sun className="w-5 h-5 text-[#007AFF]" />
                <span className="text-xs font-bold text-gray-700">Light</span>
              </button>

              <button
                onClick={() => setDarkTheme(true)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  isDarkTheme 
                    ? 'border-[#007AFF] ring-2 ring-blue-500/10 bg-blue-50/10' 
                    : 'border-gray-100 bg-white hover:bg-gray-50'
                }`}
              >
                <Moon className="w-5 h-5 text-gray-400" />
                <span className="text-xs font-bold text-gray-400">Dark</span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-2">
            <button
              onClick={logout}
              className="w-full py-4 border border-red-200 hover:bg-red-50 text-red-500 font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 bg-white transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default SettingsScreen;
