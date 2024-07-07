import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-200 p-4 rounded">
      <ul>
        <li className="mb-4">
          <Link className="text-blue-600 hover:text-blue-800" href="/">
            Home
          </Link>
        </li>
        <li className="mb-4">
          <Link className="text-blue-600 hover:text-blue-800" href="/newWorkout">
          Log New Workout
          </Link>
        </li>
        {/* Add more sidebar links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
