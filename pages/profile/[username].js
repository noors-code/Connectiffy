// pages/profile/[username].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { query } = useRouter();
  const { username } = query;

  useEffect(() => {
    if (username) {
      // Simulate fetching user data by username
      const dummyData = {
        username: username,
        fullName: 'John Doe',
        bio: 'Web Developer passionate about JavaScript and React.',
        profilePicture: 'https://www.w3schools.com/w3images/avatar2.png',
        followers: 150,
        following: 200,
        posts: 30
      };

      setUser(dummyData);
    }
  }, [username]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{user.fullName}'s Profile</h1>
      <img src={user.profilePicture} alt="Profile Picture" width={150} height={150} />
      <p><strong>@{user.username}</strong></p>
      <p>{user.bio}</p>
      <p>Followers: {user.followers} | Following: {user.following}</p>
      <p>Posts: {user.posts}</p>
    </div>
  );
};

export default ProfilePage;
