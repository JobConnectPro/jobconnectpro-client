import { instance } from './axios';

// ==========
const registerUser = async (data, role) => {
  try {
    const { name, email, phone, password, gender, birthday, address } = data;
    const response = await instance.post('/register', {
      name,
      email,
      phone,
      password,
      role,
      gender,
      birthday,
      address,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await instance.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

// ==========
const getJobsList = async (searchQuery = '', page = 1, perPage = 10, locationFilter = '', typeFilter = '', experienceFilter = '') => {
  try {
    const response = await instance.get(`/jobs`, {
      params: {
        title: searchQuery,
        page,
        limit: perPage,
        location: locationFilter,
        type: typeFilter,
        minimum_experience: experienceFilter,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getJobDetails = async (id) => {
  try {
    const response = await instance.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getCategoryList = async () => {
  try {
    const response = await instance.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getJobsPosts = async () => {
  try {
    const response = await instance.get(`/users/job-post`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getJobsPost = async (jobId) => {
  try {
    const response = await instance.get(`/users/job-post/${jobId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getApplicant = async (applicantId, jobId) => {
  try {
    const response = await instance.get(`/users/${applicantId}/job/${jobId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export { registerUser, loginUser, getJobsList, getCategoryList, getJobDetails, getJobsPosts, getJobsPost, getApplicant };
