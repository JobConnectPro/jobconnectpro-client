import React from 'react';
import Logo from '../Logo';
import { userChangePassword } from '@/modules/fetchForgotPassword';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Cookies from 'js-cookie';

const ChangePasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const { currentPassword, confirmPassword, newPassword } = data;
      if (newPassword === confirmPassword) {
        const res = await userChangePassword(currentPassword, newPassword);
        toast.success('Your Password updated!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        Cookies.remove('token');
        Cookies.remove('role');
        router.push('/');
      } else {
        toast.error('Password is not match. Please try again!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };
  return (
    <>
      <div className=" flex flex-col bg-gray-100">
        <div className="container max-w-md  mx-auto flex flex-col px-2 my-10">
          <div className="bg-white px-6 py-8 rounded shadow-md">
            <h1 className="mb-6 text-2xl text-center text-gray-900">Change Password</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="password"
                    {...register('currentPassword', { required: true })}
                    placeholder=" Current Password"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="password"
                    {...register('newPassword', { required: true })}
                    placeholder=" New Password"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="password"
                    {...register('confirmPassword', { required: true })}
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
              <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
