// src/components/AuthWrapper.js
import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logout } from './firebase';
import Loading from './Loading';

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Unsubscribe from the listener when component unmounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="auth-overlay">
        <div className="auth-card">
          <div className="auth-header">
            <img src="https://codeharborhub.github.io/img/nav-logo.jpg" alt="CodeharborHub" width="60" />
            <h2>Welcome to CodeharborHub</h2>
            <p>Please sign in to access the documentation and community.</p>
          </div>
          
          <button className="google-btn" onClick={signInWithGoogle}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" />
            <span>Continue with Google</span>
          </button>
          
          <p className="auth-footer">
            By signing in, you agree to our <u>Terms of Service</u>.
          </p>
        </div>
      </div>
    );
  }

  // Passing user context down if needed
  return <>{children}</>;
}