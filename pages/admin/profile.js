import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import SalaryExpectation from '@/components/profile/salaryExpectation/SalaryExpectation';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';
import Layout from '@/components/layout/Dashboard';

const Profile = ({ data }) => {
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

export default Profile;

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  const result = await fetch('http://localhost:8000/users/profile', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const data = await result.json();

  return {
    props: {
      data,
    },
  };
};
