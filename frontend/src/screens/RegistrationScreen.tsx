import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';

const RegistrationScreen = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [fullNameErr, setFullNameErr] = useState<string | null>(null);
  const [phoneErr, setPhoneErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setFullNameErr(null);
    setPhoneErr(null);
    setEmailErr(null);
    setPasswordErr(null);

    let valid = true;
    if (fullName.trim().length === 0) {
      setFullNameErr('Full Name is required');
      valid = false;
    }
    if (phone.trim().length < 8) {
      setPhoneErr('Invalid phone number');
      valid = false;
    }
    if (!email.includes('@')) {
      setEmailErr('Invalid email format');
      valid = false;
    }
    if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    setShowSaveDialog(true);
  };

  const confirmRegistration = async () => {
    setShowSaveDialog(false);
    await register(fullName, `DOC-${Math.floor(1000 + Math.random() * 9000)}`, email, phone, 'EndoAI Dental Center', 'Medical Plaza Suite 404, San Francisco, CA');
    navigate('/login_success');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] p-6">
      <div className="w-full max-w-md my-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#007AFF]">
            EndoAI Assistant
          </h1>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            Join our clinical community
          </p>

          <form onSubmit={handleCreateAccount} className="space-y-4">
            <AppTextField
              label="Full Name"
              type="text"
              placeholder="Dr. Nancy Thorne"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameErr(null);
              }}
              error={fullNameErr || undefined}
            />

            <AppTextField
              label="Phone Number"
              type="tel"
              placeholder="e.g. 555-0101"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneErr(null);
              }}
              error={phoneErr || undefined}
            />

            <AppTextField
              label="Email Address"
              type="email"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr(null);
              }}
              error={emailErr || undefined}
            />

            <AppTextField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr(null);
              }}
              error={passwordErr || undefined}
            />

            <AppButton
              type="submit"
              fullWidth
              className="mt-6"
            >
              Create Account
            </AppButton>
          </form>

          {/* Sign In link */}
          <div className="flex justify-center mt-6 text-sm text-gray-500">
            <span>Already have an account?&nbsp;</span>
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-[#007AFF] hover:underline bg-transparent border-none"
            >
              Sign In
            </button>
          </div>
        </div>

      </div>

      {/* Save Password Dialog Modal */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl animate-scale-up">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Save Password
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Would you like to save your credentials to your secure keychain for quick biometric sign-in?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={confirmRegistration}
                className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 bg-transparent border-none"
              >
                Not Now
              </button>
              <button
                onClick={confirmRegistration}
                className="px-5 py-2 text-sm font-bold text-[#007AFF] bg-[#E3F2FD] rounded-lg hover:bg-blue-100 transition-colors border-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationScreen;
