import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import UserLogin from '@/components/auth/UserLogin';

const UserSignIn = () => {
  return (
    <>
      <Header />
      <UserLogin />
      <Footer />
    </>
  );
};

export default UserSignIn;

export const getServerSideProps = async (context) => {
  let { token } = context.req.cookies;

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    token = '';
  }

  return {
    props: {
      token,
    },
  };
};
