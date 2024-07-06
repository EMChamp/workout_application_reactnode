const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5040';

export const fetchWorkouts = async (token: string) => {
  try {
    const response = await fetch(`${backendUrl}/api/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${backendUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${backendUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
