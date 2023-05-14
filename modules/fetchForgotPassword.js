import { instance } from './axios';

const userForgotPassword = async (email) => {
  try {
    const response = await instance.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const userResetPassword = async (password, token) => {
  try {
    const response = await instance.put(`/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export { userForgotPassword, userResetPassword };
