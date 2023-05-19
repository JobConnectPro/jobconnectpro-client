import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import ForgotPasswordForm from '@/components/auth/ForgotPassword';

const UserForgotPassword = () => {
  return (
    <>
      <Header />
      <ForgotPasswordForm />
      <Footer />
    </>
  );
};

export default UserForgotPassword;

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
