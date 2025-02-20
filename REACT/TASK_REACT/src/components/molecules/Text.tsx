import { useEffect } from "react";

function Text() {
  useEffect(() => {
    fetch("http://localhost:5000/api/users/me")
      .then((res) => res.json())
      .then((data) => console.log("Backend Response:", data))
      .catch((err) => console.error("Connection Error:", err));
  }, []);

  return <h1>Testing Backend Connection</h1>;
}

export default Text;
