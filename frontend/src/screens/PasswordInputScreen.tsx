import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const PasswordInputScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'doctor.name@clinic.com';
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleLogin = () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
    } else {
      setError(null);
      navigate('/login_validation', { state: { email, password } });
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
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Step 2 of 2</span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              Enter your password
            </h2>
            <p className="text-xs text-gray-400 font-bold mt-2 truncate">
              For {email}
            </p>
          </div>

          <div className="space-y-4">
            <AppTextField
              label="Password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              error={error || undefined}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="text-gray-400 hover:text-gray-600 p-1 bg-transparent border-none cursor-pointer"
                >
                  {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />

            {/* Checkbox and Forgot Link row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-500 font-bold cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={keepLoggedIn} 
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)} 
                  className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF] cursor-pointer"
                />
                Keep me logged in
              </label>
              
              <button
                onClick={() => navigate('/forgot_password')}
                className="font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
              >
                Forgot?
              </button>
            </div>

            <AppButton fullWidth onClick={handleLogin} className="py-4 font-bold text-sm mt-6">
              Login
            </AppButton>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PasswordInputScreen;
