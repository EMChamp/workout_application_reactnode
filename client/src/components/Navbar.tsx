import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link href="/" className="mr-4">
            Home
          </Link>
          <Link href="/login" className="mr-4">
          Login
          </Link>
          <Link href="/register" className="mr-4">
          Register
          </Link>
          <a href="/logout" className="mr-4">Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;