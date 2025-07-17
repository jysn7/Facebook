import React from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvide';
import { actionTypes } from './reducer';

const Login = () => {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
            console.log(result.user)
        }).catch(error => alert(error.message));
    }
  return (
    <div className='grid place-items-center h-[100vh]'>
      <div className='flex flex-col'>
        <img 
         className='object-contain h-[150px]'
         src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/800px-2023_Facebook_icon.svg.png" 
         alt="facebook-logo" 
        />
        <img 
         className='object-contain h-[150px]'
         src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" 
         alt="facebook-wine" 
         />
      </div>
      <button 
       className='w-75 py-1 rounded transition-colors cursor-pointer bg-[#2e81f4] text-[#eff2f5] font-semibold hover:bg-white hover:text-[#2e81f4]'
       type='submit' 
       onClick={signIn}
      >
        Sign In
      </button>
    </div>
  )
}

export default Login
