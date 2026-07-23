import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, KeyRound } from 'lucide-react';

const OtpVerificationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const email = location.state?.email || 'doctor.name@clinic.com';
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(59);

  // References for shifting focus
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) return;

    const newCode = [...code];
    newCode[index] = cleanValue.substring(cleanValue.length - 1);
    setCode(newCode);
    setError(null);

    // Shift focus forward
    if (index < 3 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      setError(null);

      // Shift focus backward
      if (index > 0 && inputRefs[index - 1].current) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpValue = code.join('');
    if (otpValue === '1234' || otpValue.length === 4) {
      setError(null);
      await login(email);
      navigate('/reset_password', { state: { email } });
    } else {
      setError('Invalid verification code');
    }
  };

  const handleResend = () => {
    setTimer(59);
    setCode(['', '', '', '']);
    setError(null);
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
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

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-start pt-4">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6 text-center">
          
          {/* Banner Box */}
          <div className="w-full h-40 bg-[#E3F2FD] rounded-2xl flex items-center justify-center mb-2">
            <KeyRound className="w-14 h-14 text-[#007AFF]" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Enter 4-digit code
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-2 leading-relaxed">
              sent to <span className="text-gray-950 font-bold">{email}</span>
            </p>
          </div>

          {/* 4 Digit Block Inputs */}
          <div className="flex justify-center gap-3 py-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder="•"
                className="w-12 h-14 text-center text-xl font-extrabold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-300 bg-gray-50/50"
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-500 font-bold">
              {error}
            </p>
          )}

          <AppButton fullWidth onClick={handleVerify} className="py-4 font-bold text-sm">
            Verify
          </AppButton>

          <div className="text-center mt-4">
            {timer > 0 ? (
              <p className="text-xs text-gray-400 font-semibold">
                Resend code in <span className="font-bold text-[#007AFF]">00:{timer.toString().padStart(2, '0')}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
              >
                Didn't receive the code? Resend Code
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OtpVerificationScreen;
