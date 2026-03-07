import React from 'react';
import { createHashRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Tasks from './pages/Tasks';
import Share from './pages/Share';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import StudyLayout from './layouts/StudyLayout';
import Nature from './pages/study/Nature';
import FamousPeople from './pages/study/FamousPeople';
import FamousPeopleDetail from './pages/study/FamousPeopleDetail';
import Map3D from './pages/study/Map3D';
import Festivals from './pages/study/Festivals';
import FestivalDetail from './pages/study/FestivalDetail';
import Chatbot from './components/Chatbot';
import VisitorCounter from './components/VisitorCounter';
import Cuisine from './pages/study/Cuisine';
import { Heritage, Environment } from './pages/study/Placeholders';
import Doremon from './pages/study/Doremon';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './index.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
};

// Layout component to wrap pages with Header and Footer
const Layout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <VisitorCounter />
    </div>
  );
};

// Define routes using the Data Router API
const router = createHashRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    errorElement: <NotFound />, // Handle 404s and errors
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "study",
        element: <StudyLayout />,
        children: [
          { index: true, element: <Navigate to="/study/nature" replace /> }, // Default redirect
          { path: "nature", element: <Nature /> },
          { path: "map3d", element: <Map3D /> },
          { path: "festivals", element: <Festivals /> },
          { path: "festivals/:id", element: <FestivalDetail /> },
          { path: "cuisine", element: <Cuisine /> },
          { path: "famous-people", element: <FamousPeople /> },
          { path: "famous-people/:id", element: <FamousPeopleDetail /> },
          { path: "heritage", element: <Heritage /> },
          { path: "environment", element: <Environment /> },
          { path: "doremon", element: <Doremon /> }
        ]
      },
      {
        path: "tasks",
        element: <Tasks />
      },
      {
        path: "quiz",
        element: <Quiz />
      },
      {
        path: "share",
        element: <Share />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
