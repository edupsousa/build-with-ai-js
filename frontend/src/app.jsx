import { auth } from "./firebase";
import SignInScreen from "./signin-screen";
import ChatScreen from "./chat-screen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function useAuthState() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [setUser]);
  return user;
}

function App() {
  const user = useAuthState();

  return (
    <>
      {user ? <ChatScreen /> : <SignInScreen />}
    </>
  );
}

export default App;
