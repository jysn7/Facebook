import React, { useState } from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvide';
import { actionTypes } from './reducer';

const LoadingDots = () => (
  <div className="flex space-x-2 justify-center items-center">
    {[...Array(3)].map((_, i) => (
      <span
        key={i}
        className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
);

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-gray-900/85 backdrop-blur-sm bg-opacity-80 flex flex-col justify-center items-center z-50">
    <div className="text-white text-xl font-semibold mb-6">Signing In</div>
    <LoadingDots />
  </div>
);

const Login = () => {
  const [state, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch(error => {
        alert(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="grid place-items-center h-[100vh] relative">
      {loading && <LoadingOverlay />}

      <div className="flex flex-col items-center space-y-6">
        <img 
          className="object-contain h-[150px]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/800px-2023_Facebook_icon.svg.png" 
          alt="facebook-logo" 
        />
        <img 
          className="object-contain h-[150px]"
          src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" 
          alt="facebook-wine" 
        />
        <button
          className="w-64 py-3 rounded hover:border-1 hover:shadow hover:border-blue-500 transition-colors cursor-pointer bg-[#2e81f4] text-[#eff2f5] font-semibold hover:bg-white hover:text-[#2e81f4] disabled:opacity-60 disabled:cursor-not-allowed"
          type="button"
          onClick={signIn}
          disabled={loading}
        >
          Sign In
        </button>
        
      </div>
    </div>
  );
}

export default Login;
