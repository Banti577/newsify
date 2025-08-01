import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("https://newsify-backend-fugz.onrender.com/user/logout", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setUser(null);
          navigate("/user/login");
        } else {
          console.error("Logout failed");
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    };

    logout();
  }, []);

  return <p>Logging out...</p>;
}

export default Logout;
