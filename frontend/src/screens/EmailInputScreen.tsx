import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const EmailInputScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!email.includes('@')) {
      setError('Invalid email format');
    } else {
      setError(null);
      navigate('/password_input', { state: { email } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] p-6">
      
      {/* Header back button */}
      <header className="w-full max-w-md mx-auto flex items-center py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>
      
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-start pt-4 space-y-6">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Step 1 of 2</span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              Enter your email
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">
              Access your clinical portal and diagnostic tools by signing in with your institutional credentials.
            </p>
          </div>

          <div className="space-y-4">
            <AppTextField
              label="Institution Email"
              type="email"
              placeholder="doctor.name@clinic.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              error={error || undefined}
            />

            <AppButton fullWidth onClick={handleNext} className="py-4 font-bold text-sm">
              Next
            </AppButton>
          </div>
        </div>

        {/* Secure Verification Banner Card */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex gap-4">
          <div className="w-12 h-12 bg-blue-100 text-[#007AFF] rounded-xl flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Secure Verification</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed font-semibold mt-1">
              We'll send a security code before token authentication to verify your identity.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmailInputScreen;
