import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MoreHorizontal } from "lucide-react";

import { database } from "../lib/firebase";
import { ref, child, get } from "firebase/database";

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(child(ref(database), "users/user123")); 
        if (snapshot.exists()) {
          const data = snapshot.val();

          const baseUser = {
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            posts: data.images.map((img, idx) => ({
              id: idx,
              image: img.imageUrl,
              description: img.caption,
              likes: Number(img.likes),
            })),
          };

          
          const mockUsers = [
            {
              ...baseUser,
              name: "Emma Watson",
              username: "emmawatson",
              followers: 1234,
              following: 567,
              bio: "Actress | UN Women Goodwill Ambassador | Book lover 📚",
            },
            {
              ...baseUser,
              name: "Chris Evans",
              username: "chrisevans",
              followers: 4321,
              following: 876,
              bio: "Captain America 🛡️ | Dog dad 🐶",
            },
            {
              ...baseUser,
              name: "Zendaya",
              username: "zendaya",
              followers: 9999,
              following: 120,
              bio: "Actress | Fashion Icon | Singer 🎤",
            },
            {
              ...baseUser,
              name: "Robert Downey Jr.",
              username: "rdj",
              followers: 8888,
              following: 300,
              bio: "Iron Man | Genius Billionaire | Philanthropist",
            },
            {
              ...baseUser,
              name: "Millie Bobby Brown",
              username: "milliebrown",
              followers: 5500,
              following: 410,
              bio: "Stranger Things | Actress | Entrepreneur",
            },
          ];

          setUsers(mockUsers);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!users.length) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#111", color: "#fff" }}>
      {/* Sidebar */}
      <aside style={{ width: "200px", padding: "20px", backgroundColor: "#222" }}>
        <nav>
          <p><Link href="/">Home</Link></p>
          <p><Link href="/explore">Explore</Link></p>
          <p><Link href="/notifications">Notifications</Link></p>
          <p><Link href="/profile">Profile</Link></p>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {users.map((user, index) => (
          <div key={index} style={{ marginBottom: "40px", borderBottom: "1px solid #333", paddingBottom: "40px" }}>
            <UserProfile user={user} router={router} />
          </div>
        ))}
      </main>
    </div>
  );
}


function UserProfile({ user, router }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <img
          src={user.avatar}
          alt="avatar"
          width={120}
          height={120}
          style={{ borderRadius: "50%", border: "4px solid purple", objectFit: "cover" }}
        />
        <div>
  <Link href={`/profile/${user.username}`}>
    <h2 style={{ cursor: "pointer", color: "lightblue" }}>@{user.username}</h2>
  </Link>
  <p>{user.name}</p>
  <p>{user.bio}</p>
  <p>Posts: {user.posts.length}</p>
  <p>Followers: {user.followers}</p>
  <p>Following: {user.following}</p>
  <button onClick={() => setIsFollowing(!isFollowing)}>
    {isFollowing ? "Following" : "Follow"}
  </button>
  <button onClick={() => router.push("/messages")}>Message</button>
  <button onClick={() => setShowOptions(!showOptions)}>⋮</button>
  {showOptions && (
    <div style={{ backgroundColor: "#333", padding: "10px", marginTop: "5px" }}>
      <p>Share Profile</p>
      <p>Mute</p>
      <p style={{ color: "red" }}>Block</p>
      <p style={{ color: "red" }}>Report</p>
    </div>
  )}
</div>

      </div>

      {/* Post Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {user.posts.map((post) => (
          <div key={post.id} style={{ width: "300px", border: "1px solid #444" }}>
            <div style={{ position: "relative", width: "100%", height: "300px" }}>
              <Image
                src={post.image}
                alt="Post"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div style={{ padding: "10px" }}>
              <p>{post.description}</p>
              <p>{post.likes} likes</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
