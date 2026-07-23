import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { Fingerprint } from 'lucide-react';

const LoginScreen = () => {
  const { login, isBiometricEnabled } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErr(null);
    setPasswordErr(null);

    let valid = true;
    if (!email.includes('@')) {
      setEmailErr('Invalid email format');
      valid = false;
    }
    if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    navigate('/login_validation', { state: { email, password } });
  };

  const handleBiometricLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('dr.nancy@endoai.com', 'Nancy Thorne');
      navigate('/login_success');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] p-6">
      <div className="w-full max-w-md">
        
        {/* Branding & Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#007AFF] rounded-2xl flex items-center justify-center mb-3 shadow-md shadow-blue-100 text-white">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20,30 Q 20,10 50,10 Q 80,10 80,30 Q 85,60 70,90 L 60,80 L 50,90 L 40,80 L 30,90 Q 15,60 20,30 Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="30" r="5" fill="currentColor" />
              <circle cx="38" cy="45" r="4" fill="currentColor" />
              <circle cx="62" cy="45" r="4" fill="currentColor" />
              <line x1="30" y1="65" x2="70" y2="65" stroke="#FF5252" strokeWidth="4" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            EndoAI Assistant
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
            Clinical Decision Support System
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <form onSubmit={handleSignIn} className="space-y-4">
            <AppTextField
              label="Email Address"
              type="email"
              placeholder="doctor.name@clinic.com"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr(null);
              }}
              error={passwordErr || undefined}
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/forgot_password')}
                className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <AppButton
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="mt-6 py-4 font-bold text-sm"
            >
              Sign In
            </AppButton>
          </form>

          {/* Biometric login simulation */}
          {isBiometricEnabled && (
            <div className="flex flex-col items-center mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={handleBiometricLogin}
                className="w-14 h-14 bg-blue-50 hover:bg-blue-100 transition-colors rounded-full flex items-center justify-center text-[#007AFF] border-none cursor-pointer"
                title="Biometric Sign In"
              >
                <Fingerprint className="w-8 h-8" />
              </button>
              <span className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">
                Biometric Login
              </span>
            </div>
          )}
        </div>

        {/* Footer/Create Account suggestion */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/registration')}
            className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
          >
            Don't have an account? Sign Up
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
