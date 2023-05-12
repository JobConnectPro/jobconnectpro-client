import { instance } from './axios';

const getCompanies = async (company_name, page) => {
    try {
        if (company_name) {
            const response = await instance.get(`/companies?company_name=${company_name}`)
            return(response.data)
        } else {
            const response = await instance.get(`/companies?page=${page}`)
            return(response.data)
        }
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}

const getCompanyDetail = async (id, context) => {
    try {
        const { token } = context.req.cookies;

        const result = await fetch(`http://localhost:8000/companies/${id}`, {
            headers: { Authorization: 'Bearer ' + token },
        });
        const data = await result.json();

        return data
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  };

export {getCompanies, getCompanyDetail}