
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
import BlogPage from './pages/dashboard/Blog/Blogcms'
import Newscms from './pages/dashboard/News/Newscms'
import Policiescms from './pages/dashboard/Policies/Policiescms'
import Homepage from './pages/dashboard/Home/Homepage'
import Aboutus from './pages/dashboard/About/Aboutus'
import Teamtype from './pages/dashboard/TeamType/Teamtype'
import Teams from './pages/dashboard/Team/Teams'
import ProductList from './pages/dashboard/Product/ProductList'

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/login" />;
};

// Wrapper to access `useLocation`
function LayoutWrapper() {
  const location = useLocation();
  // Hide Header/Footer on login and any dashboard routes (mounted under /navbar)
  const hideLayout = location.pathname === '/login' || location.pathname.startsWith('/navbar');

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
        <Route path="/navbar/*" element={<ProtectedRoute element={<Navbar />} />}>
          {/* child routes render inside Navbar's Outlet */}
          <Route path="content/banners" element={<Banner />} />
           <Route path="content/blog" element={<BlogPage />} />
          <Route path="content/news" element={<Newscms />} />
          <Route path="content/cms" element={<Policiescms />} />
          <Route path="home" element={<Homepage />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="team-type" element={<Teamtype />} />
          <Route path="teams" element={<Teams />} />
          <Route path="content/products" element={<ProductList />} />

        </Route>

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

