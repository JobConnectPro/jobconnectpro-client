import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import SeekerRegister from '@/components/auth/register/SeekerRegister';

const SeekerSignUp = () => {
  return (
    <>
      <Header />
      <SeekerRegister />
      <Footer />
    </>
  );
};

export default SeekerSignUp;

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
