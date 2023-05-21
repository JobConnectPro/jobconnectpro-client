import Logo from '../Logo';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-40 h-screen w-screen flex flex-row space-x-4 items-center justify-center bg-white">
      <Logo />
      <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-700"></div>
    </div>
  );
};

export default Loading;
