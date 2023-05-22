import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'tailwind-datepicker-react';
import { registerUser } from '@/modules/fetch';
import { toast } from 'react-toastify';
import Link from 'next/link';

const SeekerRegister = () => {
  // const [startDate, setStartDate] = useState(new Date());

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState('');
  const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    theme: {
      background: '',
      todayBtn: '',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: '',
      input: '',
      inputIcon: '',
      selected: '',
    },
  };
  const handleRegister = async (data) => {
    try {
      const role = 'Seeker';
      const { password, confirm_password } = data;
      if (password === confirm_password) {
        const response = await registerUser(data, role);

        toast.success('We have created your account for you.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        reset();
      } else {
        toast.error('Password is not match. Please try again.', {
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
    } catch (error) {
      toast.error(`${error.message}`, {
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
        <div className="container max-w-xl mx-auto flex flex-col px-2 my-10 justify-center">
          <div className="bg-white px-6 py-8 rounded shadow-md">
            <h1 className="mb-6 text-2xl text-center text-gray-900">Jobseeker Sign Up</h1>
            <form className=" w-full max-w-lg" onSubmit={handleSubmit(handleRegister)}>
              <div className="flex flex-wrap mb-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Full Name</label>
                  <input type="text" className="block border border-grey-light w-full p-2 rounded " {...register('name', { required: true })} placeholder="Full Name" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded "
                    // name="email"
                    {...register('email', { required: true })}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded "
                    // name="password"
                    {...register('password', { required: true })}
                    placeholder="Password"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-2 rounded "
                    // name="confirm_password"
                    {...register('confirm_password', { required: true })}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                  <input
                    type="number"
                    className="block border border-grey-light w-full p-2 rounded"
                    // name="phone"
                    {...register('phone', { required: true })}
                    placeholder="0812xxxxx"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                    {...register('gender', { required: true })}
                  >
                    <option defaultValue>Choose a gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Birthday</label>
                  <Controller
                    control={control}
                    name="birthday"
                    defaultValue={show}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        show={show}
                        onChange={onChange}
                        selected={value}
                        setShow={(state) => setShow(state)}
                        options={options}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-5">
                <div className="w-full px-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded"
                    // name="phone"
                    {...register('address', { required: true })}
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-5">
                <div className="w-full px-3">
                  <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                </div>
              </div>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Already have an account ?{' '}
                <Link href="/signin" className="font-medium text-blue-500 hover:underline dark:text-primary-500">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeekerRegister;
