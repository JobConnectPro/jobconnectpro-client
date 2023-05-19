import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import EmployerRegister from '@/components/auth/register/EmployerRegister';

const EmployerSignUp = () => {
  return (
    <>
      <Header />
      <EmployerRegister />
      <Footer />
    </>
  );
};

export default EmployerSignUp;

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
