import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/signup";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import AddBlog from "./components/addBlog";
import BlogDetail from "./components/BlogDetail";

function App() {
const [user, setUser] = useState(null);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const res = await fetch("https://newsify-backend-fugz.onrender.com/user/me", {
          credentials: "include",
        })
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          setUser(null);


        }} catch (err) {
          console.error("Error fetching user:", err);
          setUser(null);
        }
      }
    fetchUser();

    }, []);
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login setUser={setUser} />} />
        <Route path="/user/logout" element={<Logout setUser={setUser} />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/blog/addBlog" element={<AddBlog />} />
        <Route path="/blog/:BlogId" element={<BlogDetail />} />
       
      </Routes>
    </BrowserRouter>
  );
}
export default App
