import { useEffect, useState } from 'react';
import { fetchWorkouts } from '../utils/api';
import Navbar from '../components/Navbar';
import isBrowser from '../utils/isBrowser';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasWorkouts, setHasWorkouts] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      if (isBrowser()) {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
          try {
            const fetchedWorkouts = await fetchWorkouts(token);
            if (fetchedWorkouts.length === 0) {
              setHasWorkouts(false);
            } else {
              setHasWorkouts(true);
              setWorkouts(fetchedWorkouts.map((workout: any) => ({
                ...workout,
                date: new Date(workout.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              })));
              console.log('Formatted Workout Data:', fetchedWorkouts);
            }
          } catch (error) {
            console.error('Error fetching workouts:', error);
          }
        } else {
          setIsLoggedIn(false);
        }
      }
    };

    getWorkouts();
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
                  workouts.map((workout) => (
                    <div key={workout._id} className="mb-6">
                      <h2 className="text-xl font-bold mb-2">Date: {workout.date}</h2>
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">Exercise</th>
                            <th className="py-3 px-6">Reps</th>
                            <th className="py-3 px-6">Weight (kg)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workout.exercises.map((exercise: any, exerciseIndex: number) => (
                            exercise.sets.map((set: any, setIndex: number) => (
                              <tr key={`${exercise._id}-${setIndex}`} className="text-gray-700">
                                {setIndex === 0 && <td rowSpan={exercise.sets.length} className="py-3 px-6">{exercise.name}</td>}
                                <td className="py-3 px-6">{set.reps}</td>
                                <td className="py-3 px-6">{set.weight} kg</td>
                              </tr>
                            ))
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
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
