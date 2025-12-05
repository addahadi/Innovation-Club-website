


// src/components/RequireAdmin.jsx
import { useEffect, useState } from "react";
import { auth } from "../../db/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      if (user.email === "innovationadmin@gmail.com") {
        setAllowed(true);
      } else {
        auth.signOut();
        setAllowed(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p>Checking access...</p>;
  if (!allowed) return (window.location.href = "/login");

  return children;
}
