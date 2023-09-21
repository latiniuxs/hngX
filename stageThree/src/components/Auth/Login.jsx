import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Attempt Firebase authentication
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
        console.log(userCredential)
      })
      // Authentication successful
      setError(null); 
    } catch (error) {
      console.log("Firebase Authentication Error:", error.message);

      // If Firebase authentication fails, check for predefined login
      if (email === "user@example.com" && password === "1Password") {
        setError(null); // Reset error

      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h2 className="text-2xl font-semibold mb-4">SignIn to Photok</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64 p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-64 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          SignIn
        </button>
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => {
          navigate('/signup')}
          }
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
