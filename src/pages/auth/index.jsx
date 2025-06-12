import { Button} from "react-bootstrap"
import {auth, provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate, Navigate } from "react-router";
import  useGetUserInfo from "../../hooks/useGetUserInfo";
import Container from 'react-bootstrap/Container';
import Login from "./login"

function Auth(){
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <Container>
      <div className="login-page d-grid gap-2">
      <h1 style={styles}>Log in to Expense Tracker</h1>
      <Login />
      <h2 style={styles}>OR </h2>
      <Button variant="primary"  size="lg" onClick={signInWithGoogle}>
        {" "}
        Sign In With Google
      </Button>
    </div>
    </Container>
    
  );
};

export default Auth

const styles = {
  "textAlign":"center",
  "color":"#0ff007"
}