// src/App.js
import { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import ImageGallery from './components/ImageGallery';
import SignUp from './components/Auth/SignUp';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  return (
    <div className="container mx-auto p-8">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <ImageGallery onSignOut={() => setUser(null)} />
      ) : showSignup ? (
        <SignUp />
      ) : (
        <Login setShowSignup={handleShowSignup} /> 
      )}
    </div>
  );
}

export default App;
