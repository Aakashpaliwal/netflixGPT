import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Authentication from "@/Screens/Authentication/Authentication";
import { Toaster } from "sonner";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "@/Screens/Home/Home";
import AllMovies from "@/Screens/Movies/AllMovies";
import PrivateRoute from "@/PrivateRoute";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "@/Screens/Header/Header";
import GenreContent from "@/Screens/GenreContent/GenreContent";
import AllTvShows from "@/Screens/TvShows/AllTvShows";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      {user && <Header />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Authentication />}
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <AllMovies />
            </PrivateRoute>
          }
        />
        <Route
          path="/tvshows"
          element={
            <PrivateRoute>
              <AllTvShows />
            </PrivateRoute>
          }
        />
        <Route
          path="/genre/:type/:genreId"
          element={
            <PrivateRoute>
              <GenreContent />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <Authentication /> */}
    </>
  );
}

export default App;
