import { instance } from './axios';

const getUser = async (user, currentPage, perPage) => {
  console.log(currentPage, perPage);
  try {
    const response = await instance.get(`/users`, {
      params: {
        user_name: user,
        page: currentPage,
        limit: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
