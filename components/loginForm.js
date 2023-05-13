import React from 'react';
import Logo from '../components/Logo';
import { loginUser } from '@/modules/fetch';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const { email, password } = data;
      const { token, role, id } = await loginUser(email, password);

      Cookies.set('token', token);
      Cookies.set('role', role);
      Cookies.set('id', id);
      toast.success('Login Successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      router.push('/job-board');
    } catch (err) {
      toast.error(`${err.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  return (
    <>
      <div className=" flex flex-col bg-gray-100">
        <div className="container max-w-md  mx-auto flex flex-col px-2 mt-10 mb-20">
          <div className="bg-white px-6 py-8 rounded shadow-md">
            <h1 class="mb-8 text-xl text-center font-bold text-gray-900 md:text-2xl dark:text-white">Sign In to jobconnect</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="email"
                    {...register('email', { required: true })}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded mb-4"
                    // name="password"
                    {...register('password', { required: true })}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>

              <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
              <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link href="/register" class="font-medium text-blue-500 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
