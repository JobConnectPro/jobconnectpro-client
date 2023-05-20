import React from 'react';
import Logo from '../Logo';
import { userForgotPassword } from '@/modules/fetchForgotPassword';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Cookies from 'js-cookie';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const { email } = data;

      const res = await userForgotPassword(email);

      toast.success('Please check your email!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      router.push('/signin');
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
            <h1 className="mb-6 text-2xl text-center text-gray-900">Forgot Password</h1>
            <p className="text-justify mb-2 text-gray-500">Type your email below and we'll help you reset it.</p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div>
                <div>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="email"
                    {...register('email', { required: true })}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
