import { useCallback, useState } from "react";
import ChatScreen from "./chat-screen";
import SignInScreen from "./signin-screen";

function App() {
  const [apiKey, setApiKey] = useState(sessionStorage.getItem("apiKey") || "");
  const updateApiKey = useCallback((newApiKey) => {
    sessionStorage.setItem("apiKey", newApiKey);
    setApiKey(newApiKey);
  }, []);
  const hasKey = apiKey.length !== 0;

  return <>{hasKey ? <ChatScreen apiKey={apiKey} updateApiKey={updateApiKey}  /> : <SignInScreen updateApiKey={updateApiKey} />}</>;
}

export default App;
