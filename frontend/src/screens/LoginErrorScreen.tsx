import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { AlertCircle } from 'lucide-react';

const LoginErrorScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialEmail = location.state?.email || 'doctor.name@clinic.com';
  const initialPassword = location.state?.password || '••••••••';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const handleTryAgain = () => {
    // Navigate back to step 1 (Email Input)
    navigate('/email_input');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] p-6">
      <div className="w-full max-w-md space-y-6">
        
        {/* Red Alert Banner Card at top */}
        <div className="bg-[#FF5252] text-white rounded-3xl p-5 shadow-sm flex gap-4 animate-shake">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">Authentication Failed</h4>
            <p className="text-[10px] text-white/90 leading-relaxed font-semibold mt-1">
              Invalid email or password. Please check your credentials and try again.
            </p>
          </div>
        </div>

        {/* Credentials Form Container with highlights */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-200 space-y-4">
          <AppTextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-red-500 focus:ring-red-400 focus:border-red-400"
            error="Check email credentials"
          />

          <AppTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-red-500 focus:ring-red-400 focus:border-red-400"
            error="Check password credentials"
          />

          <AppButton 
            fullWidth
            onClick={handleTryAgain}
            className="bg-[#FF5252] hover:bg-red-600 focus:ring-red-400 text-white py-4 font-bold text-sm mt-6 border-none"
          >
            Try Again
          </AppButton>
        </div>

        {/* Footer info link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/registration')}
            className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
          >
            Don't have an account? Contact Administrator
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginErrorScreen;
