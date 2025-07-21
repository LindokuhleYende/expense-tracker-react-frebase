import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../config/firebase-config"
import React, { useState } from "react";
import { toast } from "react-toastify";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save user info in localStorage for useGetUserInfo
      localStorage.setItem(
        "auth",
        JSON.stringify({
          name: user.displayName || user.email,
          profilePhoto: user.photoURL || "",
          userID: user.uid,
          isAuth: true,
        })
      );
      console.log("User logged in Successfully");
      window.location.href = "/expense-tracker";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (

    <div>

<form onSubmit={handleSubmit}>
      

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
      
    </form>
        
    </div>
    
  );
}

export default Login;