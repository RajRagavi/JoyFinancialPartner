import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase/firebaseConfig";

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Loans from "./pages/Loans";

import Login from "./AdminUserUI/Login";
import Signup from "./AdminUserUI/Signup";
import Dashboard from "./AdminUserUI/Dashboard";
import Loanprocess from "./AdminUserUI/Loanprocess";
import Entry from "./AdminUserUI/Entry";
import PendingLists from "./AdminUserUI/PendingLists";
import Accounts from "./AdminUserUI/Accounts";
import NoticePrints from "./AdminUserUI/NoticePrints";
import Sidebar from "./AdminUserUI/Sidebar";

import ProtectedRoute from "./Components/ProtectedRoute";
import CreateUserForm from "./Components/CreateUserForm";

import Kyc from "./Loantypes/Kyc"
function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <MainApp user={user} />
    </Router>
  );
}

function MainApp({ user }) {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/dashboard",
    "/loan-process",
    "/entry",
    "/pending-lists",
    "/accounts",
    "/notice-prints",
  "/kyc-vehicle",
  ];

  // Routes where Sidebar should be hidden
  const hideSidebarRoutes = [
    "/",
    "/about",
    "/loans",
    "/contact",
    "/login",
    "/signup",
  ];

  return (
   <div className="flex">
      {/* Sidebar */}
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


            {/*Loanprocess submenu */}
          


          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/loan-process" element={<ProtectedRoute><Loanprocess /></ProtectedRoute>} />
          <Route path="/entry" element={<ProtectedRoute><Entry /></ProtectedRoute>} />
          <Route path="/pending-lists" element={<ProtectedRoute><PendingLists /></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/notice-prints" element={<ProtectedRoute><NoticePrints /></ProtectedRoute>} />
          <Route path="/kyc-vehicle" element={<ProtectedRoute><Kyc /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/create-user" element={<ProtectedRoute allowedRoles={["admin"]}><CreateUserForm /></ProtectedRoute>} />
        </Routes>

        {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
      </div>
    </div>
  );
}

export default App;
