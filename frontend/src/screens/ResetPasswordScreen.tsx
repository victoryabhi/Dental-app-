import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'doctor@example.com';
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError(null);
      navigate('/login_success');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <header className="flex items-center py-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-start pt-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Create New Password
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Your new password must be different from previously used passwords.
        </p>

        <div className="mt-8 space-y-4">
          <AppTextField
            label="New Password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError(null);
            }}
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

          <AppTextField
            label="Confirm Password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
          />

          {error && (
            <p className="text-sm text-red-500 font-medium">
              {error}
            </p>
          )}

          <AppButton fullWidth onClick={handleReset} className="mt-6">
            Reset Password
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
