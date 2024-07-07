import { useRouter } from 'next/router';
import isBrowser from '../utils/isBrowser';

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = isBrowser() && localStorage.getItem('token');

  const handleLogout = () => {
    if (isBrowser()) {
      localStorage.removeItem('token');
    }
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Workout App</div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => router.push('/login')} className="mr-4 text-white">
                Login
              </button>
              <button onClick={() => router.push('/register')} className="text-white">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
