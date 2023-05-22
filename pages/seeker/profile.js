import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import SalaryExpectation from '@/components/profile/salaryExpectation/SalaryExpectation';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';
import WorkExperience from '@/components/profile/workExperience/WorkExperience';
import Organization from '@/components/profile/organization/Organization';
import Achievement from '@/components/profile/achievement/Achievement';
import Education from '@/components/profile/education/Education';
import Summary from '@/components/profile/summary/Summary';
import Project from '@/components/profile/project/Project';
import UserSkill from '@/components/profile/skill/Skill';
import Resume from '@/components/profile/resume/Resume';
import Layout from '@/components/layout/Dashboard';
import Loading from '@/components/loading/Loading';
import Training from '@/components/profile/training/Training';

const SeekerProfiles = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdd, setIsAdd] = useState({
    workExperience: false,
    education: false,
    skill: false,
    achievement: false,
    organization: false,
    project: false,
    training: false,
  });
  const [isEdit, setIsEdit] = useState({
    basicInformation: false,
    salary: false,
    workExperience: false,
    education: false,
    summary: false,
    achievement: false,
    organization: false,
    project: false,
    training: false,
    resume: false,
  });
  const [isDelete, setIsDelete] = useState({
    workExperience: false,
    education: false,
    skill: false,
    achievement: false,
    organization: false,
    project: false,
    training: false,
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
  }, [isAdd, isEdit, isDelete, isUpload]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout profile={profile}>
      <BasicInformation profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} isUpload={isUpload} setIsUpload={setIsUpload} />
      <SalaryExpectation profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} />
      <WorkExperience profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
      <Education profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
      <UserSkill profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isDelete={isDelete} setIsDelete={setIsDelete} />
      <Summary profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} />
      <Achievement profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
      <Organization profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
      <Project profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
      <Training profile={profile} isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
      <Resume profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} />
    </Layout>
  );
};

export default SeekerProfiles;

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

  if (role !== 'Seeker') {
    if (role === 'Admin') {
      return {
        redirect: {
          destination: '/admin/profile',
          permanent: false,
        },
      };
    } else if (role === 'Employer') {
      return {
        redirect: {
          destination: '/employer/profile',
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
