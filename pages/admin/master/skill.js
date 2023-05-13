import Layout from "@/components/layout/Dashboard";
import SkillsForm from "@/components/admin/skills/SkillsForm";

const Profile = ({ profile }) => {
  return (
    <Layout>
      <SkillsForm />
    </Layout>
  );
};

export default Profile;
