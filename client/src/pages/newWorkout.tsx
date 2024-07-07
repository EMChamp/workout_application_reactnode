// NewWorkout.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use the environment variable

const NewWorkout = () => {
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: [{ reps: '', weight: '' }] }]);

  const router = useRouter();

  const handleExerciseChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [event.target.name]: event.target.value,
    };
    setExercises(updatedExercises);
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      [event.target.name]: event.target.value,
    };
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ reps: '', weight: '' }] }]);
  };

  const addSet = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets.push({ reps: '', weight: '' });
    setExercises(updatedExercises);
  };

  const handleLogWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, exercises }),
      });
      if (response.ok) {
        router.push('/'); // Redirect to home page after successful log
      } else {
        console.error('Failed to log workout');
      }
    } catch (error) {
      console.error('Error logging workout:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Log New Workout</h1>
      <form onSubmit={handleLogWorkout}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>
        {exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="mb-4">
            <label className="block text-sm font-medium mb-1">Exercise Name</label>
            <input
              type="text"
              name="name"
              value={exercise.name}
              onChange={(e) => handleExerciseChange(exerciseIndex, e)}
              className="input mb-2"
              required
            />
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="flex space-x-4 mb-2">
                <input
                  type="number"
                  name="reps"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)}
                  className="input"
                  required
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  value={set.weight}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)}
                  className="input"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={() => addSet(exerciseIndex)} className="button mb-4">
              Add Set
            </button>
          </div>
        ))}
        <button type="button" onClick={addExercise} className="button mb-4">
          Add Exercise
        </button>
        <button type="submit" className="button">
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default NewWorkout;
