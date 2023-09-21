import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = ({setUser}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one small letter.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one capital letter.');
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Password must contain at least one special character.');
    }

    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    const passwordErrors = validatePassword(password);

    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(' '));
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up successful");

      // Update the user state to the authenticated user
      const user = auth.currentUser;
      setUser(user);

      // Navigate to the appropriate page
      navigate('/home'); // or navigate('/')
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup failed. Please try again.", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSignup} className="flex flex-col items-center">
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
          className="w-64 p-2 mb-2 border border-gray-300 rounded"
        />
        {password && (
          <div className="text-red-500 mb-2">
            {validatePassword(password).map((errorMsg, index) => (
              <p key={index}>{errorMsg}</p>
            ))}
          </div>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-64 p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-64 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <span>Already have an account? </span>
      <button
        className="text-blue-500 underline mb-2"
        onClick={() => {
          navigate('/');
        }}
      >
        Click here to login
      </button>
    </div>
  );
};

export default SignUp;
