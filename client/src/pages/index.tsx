import { useEffect, useState } from 'react';
import { fetchWorkouts } from '../utils/api';
import Navbar from '../components/Navbar';
import isBrowser from '../utils/isBrowser';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasWorkouts, setHasWorkouts] = useState(true);

  useEffect(() => {
    const getExercises = async () => {
      if (isBrowser()) {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
          try {
            const workouts = await fetchWorkouts(token);
            if (workouts.length === 0) {
              setHasWorkouts(false);
            } else {
              setHasWorkouts(true);
              const workoutList: any[] = workouts.flatMap((workout: any) => workout.exercises);
              setExercises(workoutList);
            }
          } catch (error) {
            console.error('Error fetching exercises:', error);
          }
        } else {
          setIsLoggedIn(false);
        }
      }
    };

    getExercises();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto flex py-8">
        <Sidebar />
        <div className="flex-1 ml-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            {isLoggedIn ? (
              <>
                <h1 className="text-2xl font-bold mb-4">Workout List</h1>
                {hasWorkouts ? (
                  <ul className="list-disc pl-5">
                    {exercises.map((exercise: any) => (
                      <li key={exercise._id} className="mb-2">
                        {exercise.exerciseName}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You have not added any workouts yet.</p>
                )}
              </>
            ) : (
              <div>
                <h1 className="text-2xl font-bold mb-4">Welcome to the Workout App</h1>
                <p>Track your workouts, monitor your progress, and stay fit! Please log in to see your workout list.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
