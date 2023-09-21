import { useState, useEffect } from "react";
import Login from "./components/Auth/Login";
import ImageGallery from "./components/ImageGallery";
import SignUp from "./components/Auth/SignUp";
import { auth } from "./firebase";
import Logout from "./components/Logout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Loading from "./components/Loading";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="container mx-auto p-8">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/home" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/signup"
              element={<SignUp setUser={setUser} />}
            />
            <Route
              path="/home"
              element={
                user ? (
                  <ImageGallery onSignOut={() => setUser(null)} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />{" "}
            <Route path="/logout" element={<Logout />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
