import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("it is working");

  const fetchReddit = async () => {
    try {
      const response = await fetch("https://www.reddit.com/r/popular.json");
      console.log(response);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setStatus(jsonResponse.data.children[0].data.title);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newStatus = fetchReddit();
  }, []);

  return <div>{status}</div>;
}

export default App;
