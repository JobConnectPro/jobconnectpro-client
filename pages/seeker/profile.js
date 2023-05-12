import Layout from '@/components/layout/Dashboard';
import SalaryExpectation from '@/components/profile/salaryExpectation/SalaryExpectation';
import BasicInformation from '@/components/profile/basicInfomation/BasicInformation';
import Education from '@/components/profile/education/Education';
import Summary from '@/components/profile/summary/Summary';
import Achievement from '@/components/profile/achievement/Achievement';
import Project from '@/components/profile/project/Project';
import UserSkill from '@/components/profile/skill/Skill';
import Organization from '@/components/profile/organization/Organization';
import WorkExperience from '@/components/profile/workExperience/WorkExperience';
import Resume from '@/components/profile/resume/Resume';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = ({ data }) => {
  const [profile, setProfile] = useState({ ...data });
  const [isAdd, setIsAdd] = useState({
    workExperience: false,
    education: false,
    skill: false,
    achievement: false,
    organization: false,
    project: false,
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
    resume: false,
  });
  const [isDelete, setIsDelete] = useState({
    workExperience: false,
    education: false,
    skill: false,
    achievement: false,
    organization: false,
    project: false,
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
  }, [isAdd, isEdit, isDelete, isUpload]);

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
      <Resume profile={profile} isEdit={isEdit} setIsEdit={setIsEdit} />
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
