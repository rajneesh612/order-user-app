import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");



  const loginUser = async () => {

    try {


      // Use deployed backend URL in production, localhost in development
      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://backend-xi1g.onrender.com/api/login"
          : "http://localhost:5000/api/login";

      const response = await fetch(
        backendUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (
        data.message ===
        "Login successful"
      ) {

        navigate("/dashboard");
      }

    } catch (err) {

      console.error(err);
    }
  };



  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>

    </div>
  );
}

export default Login;