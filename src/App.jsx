import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Home,
  About,
  Login,
  Register,
  Profile,
  TermsAndConditions,
  SingleProduct,
  NotFound,
} from "./pages";
import { AppNavbar, Footer, ScrollToTop } from "./components";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  if (!isLoggedIn) {
    // Redirect the user to the login page if not logged in
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
