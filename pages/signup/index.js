import Header from '@/components/Header';
import Footer from '@/components/homepage/Footer';
import LoginForm from '@/components/loginForm';
import Register from '@/components/signupForm';

export default function signup() {
  return (
    <>
      <div>
        <Header />
        <Register />
        <Footer />
      </div>
    </>
  );
}
