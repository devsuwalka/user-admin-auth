import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (For example, check if the user is logged in)
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      router.push('/user/signin'); // Redirect if user is not logged in
    } else {
      setUser(userData); // Set user data if authenticated
    }
  }, [router]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Roll: {user.roll}</p>
          <p>Branch: {user.branch}</p>
          <button onClick={() => router.push('/user/signin')}>Sign Out</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
