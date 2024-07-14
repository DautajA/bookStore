import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';  // Importo useAuth

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [, setAuthUser] = useAuth();  // Merr setAuthUser

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      role: data.role || 'user', // Default role is 'user'
    };
    try {
      const res = await axios.post('http://localhost:4001/user/signup', userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success('Signup Successfully');
        localStorage.setItem('Users', JSON.stringify(res.data.user));
        setAuthUser(res.data.user);  // Përditëso authUser
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error('Error: ' + err.response.data.message); // Display error message from server
      } else {
        toast.error('Error: ' + err.message);
      }
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-[600px]'>
        <div className='modal-box'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link to='/' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </Link>
            <h3 className='font-bold text-lg text-black'>Signup</h3>
            <div className='mt-5 space-y-2 text-black'>
              <span>Name</span>
              <br />
              <input
                type='text'
                {...register('fullname', { required: true })}
                placeholder='Enter your name'
                className='w-80 px-3 py-2 border rounded-md outline-none text-black'
              />
              <br />
              {errors.fullname && (
                <span className='text-sm text-red-500'>This field is required</span>
              )}
            </div>
            {/* Email */}
            <div className='mt-5 space-y-2 text-black'>
              <span>Email</span>
              <br />
              <input
                type='email'
                {...register('email', { required: true })}
                placeholder='Enter your email'
                className='w-80 px-3 py-2 border rounded-md outline-none text-black'
              />
              <br />
              {errors.email && (
                <span className='text-sm text-red-500'>This field is required</span>
              )}
            </div>
            {/* Password */}
            <div className='mt-5 space-y-2 text-black'>
              <span>Password</span>
              <br />
              <input
                type='password'
                {...register('password', { required: true })}
                placeholder='Enter your password'
                className='w-80 px-3 py-2 border rounded-md outline-none text-black'
              />
              <br />
              {errors.password && (
                <span className='text-sm text-red-500'>This field is required</span>
              )}
            </div>
            {/* Role */}
            <div className='mt-5 space-y-2 text-black'>
              <label>
                <input type='checkbox' {...register('role')} value='admin' className='text-black'/>
                Register as Admin
              </label>
            </div>
            {/* Button */}
            <div className='mt-5 flex justify-around text-black'>
              <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>
                Signup
              </button>
              <p className='text-xl text-black'>
                Already have an account?{' '}
                <button
                  className='underline text-blue-700 cursor-pointer'
                  onClick={() => document.getElementById('my_modal_3').showModal()}
                >
                  Login
                </button>
                <Login />
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
