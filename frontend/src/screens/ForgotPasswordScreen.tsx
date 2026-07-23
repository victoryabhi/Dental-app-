import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = () => {
    if (!email.includes('@')) {
      setError('Invalid email format');
    } else {
      setError(null);
      navigate('/otp_verification', { state: { email } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <header className="flex items-center py-4">
        <button onClick={() => navigate('/login')} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-start pt-4">
        {/* Banner Box */}
        <div className="w-full h-48 bg-[#E3F2FD] rounded-3xl flex items-center justify-center mb-8">
          <Mail className="w-16 h-16 text-[#007AFF]" />
        </div>

        <h2 className="text-2xl font-black text-gray-900">
          Reset Password
        </h2>
        <p className="text-xs text-gray-400 font-semibold mt-2 leading-relaxed">
          Enter your email to receive an OTP code.
        </p>

        <div className="mt-8 space-y-6">
          <AppTextField
            label="Clinical Email Address"
            type="email"
            placeholder="doctor.name@clinic.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            error={error || undefined}
          />

          <AppButton fullWidth onClick={handleSendOtp} className="py-4 font-bold text-sm">
            Send OTP PIN
          </AppButton>

          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
