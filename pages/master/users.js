import Layout from "@/components/layout/Dashboard";
import UserList from "@/components/profile/user/user";

const Profile = ({ profile }) => {
  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default Profile;