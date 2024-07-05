import type { NextPage } from 'next';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className="p-4">
      <Header />
      <main className="max-w-4xl mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Workout Tracker</h1>
        <p className="text-lg">
          Start tracking your workouts today!
        </p>
      </main>
    </div>
  );
};

export default Home;