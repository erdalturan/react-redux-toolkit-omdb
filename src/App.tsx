import React from "react";
import { Navbar, Layout } from "./components";
import { Login,Register, Users, Movies } from "./views";
import { useAppSelector } from "./store";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
function App() {
  //<Route element={<ProtectedRoute propval={user} />}>
  const user = useAppSelector((state) => state?.userData?.user);
  const ProtectedRoute = ({ redirectPath = "/landing" }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };
  return (
    <>
      <Routes>
        <Route path="login" element={!user && <Login />} />
        <Route path="users" element={!user && <Users />} />
        <Route path="register" element={!user && <Register />} />
        <Route path="landing" element={<Landing />} />
        <Route>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="movies" element={<Movies />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <div className="bg-gray-100 h-full">
        <Navbar />
      </div>
    </>
  );
}
const Landing = () => {
  return <h2>Landing (Public: anyone can access this page)</h2>;
};

const Home = () => {
  return <h2>Home (Protected: authenticated user required)</h2>;
};

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>;
};

const Analytics = () => {
  return (
    <h2>
      Analytics (Protected: authenticated user with permission 'analyze'
      required)
    </h2>
  );
};

const Admin = () => {
  return (
    <h2>Admin (Protected: authenticated user with role 'admin' required)</h2>
  );
};
export default App;
/*
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="invoices">Invoices</Link>{" "}
        <Link to="team">Team</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Team() {
  return <h1>Team</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  );
}

export default App;
*/