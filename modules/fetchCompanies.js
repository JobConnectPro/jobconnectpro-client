import { instance } from './axios';
import Cookies from 'js-cookie';

const getCompanies = async (company_name, page) => {
  try {
    if (company_name) {
      const response = await instance.get(`/companies?company_name=${company_name}`);
      return response.data;
    } else {
      const response = await instance.get(`/companies?page=${page}`);
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getCompanyDetail = async (id, context) => {
  try {
    const { token } = context.req.cookies;

    const result = await fetch(`http://localhost:8000/companies/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await result.json();

    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getCompaniesEmployer = async (company_name) => {
  try {
    const userId = await Cookies.get('user_id');
    if (company_name) {
      const response = await instance.get(`/companies/user/${userId}?company_name=${company_name}`);
      return response.data;
    } else {
      const response = await instance.get(`/companies/user/${userId}`);
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const getSectors = async () => {
  try {
    const response = await instance.get(`/sectors`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const addCompany = async (data) => {
  const { sector_id, company_name, address, description, website, logo } = data;
  try {
    if (!logo || !logo[0]) {
      throw new Error('Please select a logo');
    }

    const formData = new FormData();
    formData.append('sector_id', sector_id);
    formData.append('company_name', company_name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('website', website);
    formData.append('logo', logo[0]);

    const response = await instance.post('/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const deleteCompany = async (id) => {
  try {
    const response = await instance.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const updateCompany = async (data, id) => {
  const { sector_id, company_name, address, description, website } = data;
  try {
    const response = await instance.put(`/companies/${id}`, {
      sector_id,
      company_name,
      address,
      description,
      website,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

const updateLogo = async (data, id) => {
  const { logo } = data;
  try {
    if (!logo || !logo[0]) {
      throw new Error('Please select a logo');
    }

    const formData = new FormData();
    formData.append('logo', logo[0]);

    const response = await instance.put(`/companies/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export { getCompanies, getCompanyDetail, getCompaniesEmployer, getSectors, addCompany, deleteCompany, updateCompany, updateLogo };
