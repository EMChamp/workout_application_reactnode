import { useEffect, useState } from 'react';
import { fetchWorkouts } from '../utils/api';
import Navbar from '../components/Navbar';
import isBrowser from '../utils/isBrowser';

const Home = () => {
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    const getExercises = async () => {
      if (isBrowser()) {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const workouts = await fetchWorkouts(token);
            const workoutList: any[] = workouts.flatMap((workout: any) => workout.exercises);
            setExercises(workoutList);
          }
        } catch (error) {
          console.error('Error fetching exercises:', error);
        }
      }
    };

    getExercises();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Exercises List</h1>
          <ul className="list-disc pl-5">
            {exercises.map((exercise: any) => (
              <li key={exercise._id} className="mb-2">
                {exercise.exerciseName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
