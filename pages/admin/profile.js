import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';
import Layout from '@/components/layout/Dashboard';
import Loading from '@/components/loading/Loading';

const AdminProfiles = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isLoading, setIsLoading] = useState(true);
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
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isEdit, isUpload]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout profile={profile}>
      <BasicInformation profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} isUpload={isUpload} setIsUpload={setIsUpload} />
    </Layout>
  );
};

export default AdminProfiles;

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

  if (role !== 'Admin') {
    if (role === 'Employer') {
      return {
        redirect: {
          destination: '/employer/profile',
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
