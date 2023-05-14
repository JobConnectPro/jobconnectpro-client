import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';
import Layout from '@/components/layout/Dashboard';

const EmployerProfiles = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isEdit, setIsEdit] = useState({
    basicInformation: false,
  });
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/profile', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setProfile({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isEdit, isUpload]);

  return (
    <Layout profile={profile}>
      <BasicInformation profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} isUpload={isUpload} setIsUpload={setIsUpload} />
    </Layout>
  );
};

export default EmployerProfiles;

export const getServerSideProps = async (context) => {
  const { role, token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/profile', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const data = await result.json();

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  if (role !== 'Employer') {
    if (role === 'Admin') {
      return {
        redirect: {
          destination: '/admin/profile',
          permanent: false,
        },
      };
    } else if (role === 'Seeker') {
      return {
        redirect: {
          destination: '/seeker/profile',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      data,
    },
  };
};
