
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingHome from "./pages/Landingpage/Home/LandingHome";
import LandingAboutus from "./pages/Landingpage/Aboutus/LandingAboutus";
import LandingServices from "./pages/Landingpage/Services/LandingServices";
import LandingGateway from "./pages/Landingpage/Gateway/LandingGateway";
import LandingBlog from "./pages/Landingpage/Blog/LandingBlog";
import LandingCareer from "./pages/Landingpage/Careers/LandingCareer";
import LandingContact from "./pages/Landingpage/ContactUs/LandingContact";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Login from "./pages/signin/Login";
import Navbar from "./pages/dashboard/Navbar";
// dashboard
import Banner from './pages/dashboard/Banner/Banner'

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/login" />;
};

// Wrapper to access `useLocation`
function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = ["/login", "/navbar","/content/banners"].includes(location.pathname); // 👈 Add more paths if needed

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/about" element={<LandingAboutus />} />
        <Route path="/services" element={<LandingServices />} />
        <Route path="/gateway" element={<LandingGateway />} />
        <Route path="/blog" element={<LandingBlog />} />
        <Route path="/careers" element={<LandingCareer />} />
        <Route path="/contact" element={<LandingContact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<ProtectedRoute element={<Navbar />} />} />
        <Route path="/content/banners" element={<ProtectedRoute element={<Banner />} />} />

      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;

