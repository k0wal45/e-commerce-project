// mark as client component
"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession();

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div>
        <p>Welcome {session.user?.name}. Signed In As</p>
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  // rendering components for not logged in users
  return (
    <div>
      <p>Not Signed In</p>
      <button onClick={() => signIn("google")}>Sign in with google</button>
      <button onClick={() => signIn("github")}>Sign in with github</button>
    </div>
  );
}
