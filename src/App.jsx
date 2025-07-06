import React, { useState, useEffect, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Authentication from "@/Screens/Authentication/Authentication";
import { Toaster } from "sonner";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "@/PrivateRoute";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "@/Screens/Header/Header";
import ThemeToggle from "@/components/ThemeToggle";
import Loading from "@/Loading";

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
    return <Loading />;
  }

  // Lazy load all route components
  const Home = React.lazy(() => import("@/Screens/Home/Home"));
  const AllMovies = React.lazy(() => import("@/Screens/Movies/AllMovies"));
  const GenreComponent = React.lazy(() => import("@/Screens/GenreContent/GenreContent"));
  const AllTvShows = React.lazy(() => import("@/Screens/TvShows/AllTvShows"));
  const SearchList = React.lazy(() => import("@/Screens/SearchList/SearchList"));
  const Recommendation = React.lazy(() => import("@/Screens/Recommendation/Recommendation"));

  return (
    <>
      <Toaster richColors position="top-center" />
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
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <AllMovies />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/tvshows"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <AllTvShows />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/genre/:type/:genreId"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <GenreComponent />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/search/:searchTerm"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <SearchList />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <Recommendation />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <Authentication /> */}
    </>
  );
}

export default App;
