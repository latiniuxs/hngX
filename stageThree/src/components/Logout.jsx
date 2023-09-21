import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await auth.signOut();
        navigate('/');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    handleSignOut();
  }, [navigate]);

  return null;
};

export default Logout;
