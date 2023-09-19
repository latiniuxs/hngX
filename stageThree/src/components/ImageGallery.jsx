import { auth } from '../firebase';

const ImageGallery = (on) => {
  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await auth.signOut(); 
      onSignOut()// Sign out the user
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {/* Gallery content goes here */}
    </div>
  );
};

export default ImageGallery;
