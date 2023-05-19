import Header from '@/components/Header';
import ResetPasswordForm from '@/components/auth/ResetPassword';
import Footer from '@/components/homepage/Footer';

const UserResetPassword = () => {
  return (
    <>
      <Header />
      <ResetPasswordForm />
      <Footer />
    </>
  );
};

export default UserResetPassword;

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
