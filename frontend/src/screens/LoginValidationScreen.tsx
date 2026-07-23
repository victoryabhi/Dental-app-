import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck } from 'lucide-react';

const LoginValidationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isTwoFactorEnabled } = useAuth();
  
  const email = location.state?.email || 'doctor.name@clinic.com';
  const password = location.state?.password || '';
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  useEffect(() => {
    const checkCredentials = async () => {
      if (isTwoFactorEnabled) {
        navigate('/otp_verification', { state: { email, password } });
      } else {
        const success = await login(email, password);
        if (success) {
          setShowSaveDialog(true);
        } else {
          navigate('/login_error', { state: { email, password } });
        }
      }
    };

    const timer = setTimeout(() => {
      checkCredentials();
    }, 1500);

    return () => clearTimeout(timer);
  }, [password, isTwoFactorEnabled, navigate, email, login]);

  const handleSavePassword = () => {
    setShowSaveDialog(false);
    navigate('/login_success');
  };

  const handleDismissDialog = () => {
    setShowSaveDialog(false);
    navigate('/login_success');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#F8F9FA] p-6">
      
      {/* Top Spacer */}
      <div />

      {/* Main Validation Card */}
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-sm border border-gray-100 text-center flex flex-col items-center relative py-12">
        {/* Loading Spinner */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          <div className="absolute w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-[#007AFF]">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-2">
          Verifying credentials...
        </h3>
        <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-xs px-2">
          Securing your clinical session and synchronizing patient records...
        </p>

        {/* Save Password Dialog Modal */}
        {showSaveDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-left shadow-xl animate-scale-up border border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Save Password
              </h3>
              <p className="text-xs text-gray-400 font-semibold mb-6 leading-relaxed">
                Would you like to save your credentials to your secure keychain for quick biometric sign-in?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDismissDialog}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                >
                  Not Now
                </button>
                <button
                  onClick={handleSavePassword}
                  className="px-5 py-2.5 text-xs font-bold text-[#007AFF] bg-[#E3F2FD] rounded-xl hover:bg-blue-100 transition-colors border-none cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-center space-y-1 pb-6">
        <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">
          HIPAA COMPLIANT ENCRYPTION
        </span>
        <span className="text-[9px] text-gray-300 font-bold block">
          © 2026 EndoAI Systems Inc. All Rights Reserved.
        </span>
      </div>

    </div>
  );
};

export default LoginValidationScreen;
