import Button from "react-bootstrap/Button";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const provideer = new GoogleAuthProvider();

function doSignInWithGoogle() {
  signInWithRedirect(auth, provideer);
}

function SignInScreen() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Button variant="primary" onClick={doSignInWithGoogle}>Fazer Login com o Google</Button>
    </div>
  )
}

export default SignInScreen;