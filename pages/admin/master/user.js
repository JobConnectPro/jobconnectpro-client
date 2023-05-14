import UserList from '@/components/admin/UserData';
import Layout from '@/components/layout/Dashboard';

const users = () => {
  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default users;