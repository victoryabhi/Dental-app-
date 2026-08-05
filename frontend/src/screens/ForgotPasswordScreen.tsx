import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendEmail = async () => {
    if (!email.includes('@')) {
      setError('Invalid email format');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Firebase Password Reset Error", err);
      if (err.code === 'auth/user-not-found') {
        setError('Account not found with this email');
      } else {
        setError(err.message || 'Failed to send password reset email');
      }
    } finally {
      setLoading(false);
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
        {success ? (
          <div className="flex flex-col items-center text-center mt-8 space-y-6">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Email Sent!</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              We have sent a secure password reset link to <strong className="text-gray-900">{email}</strong>. Please check your inbox and follow the instructions to update your password.
            </p>
            <AppButton fullWidth onClick={() => navigate('/login')} className="py-4 font-bold text-sm">
              Back to Login
            </AppButton>
          </div>
        ) : (
          <>
            {/* Banner Box */}
            <div className="w-full h-48 bg-[#E3F2FD] rounded-3xl flex items-center justify-center mb-8">
              <Mail className="w-16 h-16 text-[#007AFF]" />
            </div>

            <h2 className="text-2xl font-black text-gray-900">
              Reset Password
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-2 leading-relaxed">
              Enter your email address to receive a secure link to reset your password.
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

              <AppButton fullWidth onClick={handleSendEmail} disabled={loading} className="py-4 font-bold text-sm">
                {loading ? 'Sending Link...' : 'Send Reset Link'}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;

