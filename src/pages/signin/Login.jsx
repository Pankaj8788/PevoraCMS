// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
//   InputAdornment,
//   IconButton,
//   Divider,
//   Stack,
// } from "@mui/material";
// import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from "@mui/icons-material";

// const Login = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setError("");
//   };

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (e) => e.preventDefault();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await axios.post(
//         "https://testapicms.pvorasp.com/api/admin/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("✅ Login Response:", response.data);

//       if (response.data.token) {
//         localStorage.setItem("authToken", response.data.token);
//         setSuccess("Login successful! Redirecting...");

//         setTimeout(() => {
//           navigate("/navbar");
//         }, 1500);
//       } else {
//         setError("Unexpected response. Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       const errorMessage =
//         err.response?.data?.message || "Login failed. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         position: "relative",
//         overflow: "hidden",
//         background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
//                        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
//           pointerEvents: "none",
//         },
//       }}
//     >
//       {/* Decorative Elements */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "-10%",
//           right: "-5%",
//           width: "500px",
//           height: "500px",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
//           filter: "blur(60px)",
//           animation: "float 6s ease-in-out infinite",
//           "@keyframes float": {
//             "0%, 100%": { transform: "translateY(0px)" },
//             "50%": { transform: "translateY(-30px)" },
//           },
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: "-10%",
//           left: "-5%",
//           width: "400px",
//           height: "400px",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
//           filter: "blur(60px)",
//           animation: "float 8s ease-in-out infinite",
//         }}
//       />

//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", py: 4 }}>
//         <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             maxWidth: "1100px",
//             mx: "auto",
//             boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
//             borderRadius: 4,
//             overflow: "hidden",
//             background: "rgba(255, 255, 255, 0.02)",
//             backdropFilter: "blur(20px)",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//           }}
//         >
//           {/* Left Panel - Brand Section */}
//           <Box
//             sx={{
//               flex: 1,
//               background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
//               p: 6,
//               display: { xs: "none", md: "flex" },
//               flexDirection: "column",
//               justifyContent: "center",
//               position: "relative",
//               "&::before": {
//                 content: '""',
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                 opacity: 0.4,
//               },
//             }}
//           >
//             <Box sx={{ position: "relative", zIndex: 1 }}>
//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: 800,
//                   color: "#fff",
//                   mb: 2,
//                   letterSpacing: "-0.5px",
//                 }}
//               >
//                 PIVORA
//                 <Box component="span" sx={{ display: "block", fontSize: "1.2rem", fontWeight: 400, mt: 0.5, opacity: 0.95 }}>
//                   Global Pvt Ltd
//                 </Box>
//               </Typography>
//               <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3, width: "80px", height: "3px" }} />
//               <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.95)", mb: 4, fontWeight: 500, lineHeight: 1.6 }}>
//                 Your Trusted Partner in Financial Technology Solutions
//               </Typography>
//               <Stack spacing={2.5}>
//                 {[
//                   { icon: "🔒", text: "Bank-grade Security" },
//                   { icon: "⚡", text: "Lightning-fast Transactions" },
//                   { icon: "🌐", text: "Global Payment Network" },
//                   { icon: "📊", text: "Real-time Analytics" },
//                 ].map((item, idx) => (
//                   <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Box
//                       sx={{
//                         width: 48,
//                         height: 48,
//                         borderRadius: "12px",
//                         background: "rgba(255,255,255,0.15)",
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.5rem",
//                       }}
//                     >
//                       {item.icon}
//                     </Box>
//                     <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", fontWeight: 500 }}>
//                       {item.text}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Stack>
//             </Box>
//           </Box>

//           {/* Right Panel - Login Form */}
//           <Paper
//             elevation={0}
//             sx={{
//               flex: 1,
//               p: { xs: 4, sm: 6 },
//               background: "rgba(255, 255, 255, 0.98)",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Box sx={{ mb: 4 }}>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#0f172a",
//                   mb: 1,
//                   letterSpacing: "-0.5px",
//                 }}
//               >
//                 Welcome Back
//               </Typography>
//               <Typography variant="body1" sx={{ color: "#64748b", fontSize: "0.95rem" }}>
//                 Sign in to access your dashboard
//               </Typography>
//             </Box>

//             <form onSubmit={handleSubmit}>
//               {error && (
//                 <Alert 
//                   severity="error" 
//                   sx={{ 
//                     mb: 3,
//                     borderRadius: 2,
//                     "& .MuiAlert-icon": {
//                       color: "#ef4444"
//                     }
//                   }}
//                 >
//                   {error}
//                 </Alert>
//               )}

//               {success && (
//                 <Alert 
//                   severity="success" 
//                   sx={{ 
//                     mb: 3,
//                     borderRadius: 2,
//                     "& .MuiAlert-icon": {
//                       color: "#22c55e"
//                     }
//                   }}
//                 >
//                   {success}
//                 </Alert>
//               )}

//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 margin="normal"
//                 placeholder="admin@pivora.com"
//                 variant="outlined"
//                 required
//                 disabled={loading}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailOutlined sx={{ color: "#64748b" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   mb: 2,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                     backgroundColor: "#f8fafc",
//                     "&:hover": {
//                       backgroundColor: "#f1f5f9",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#3b82f6",
//                     },
//                     "&.Mui-focused": {
//                       backgroundColor: "#fff",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#3b82f6",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": {
//                     color: "#3b82f6",
//                   },
//                 }}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 disabled={loading}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockOutlined sx={{ color: "#64748b" }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                         disabled={loading}
//                         sx={{ color: "#64748b" }}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   mb: 1,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                     backgroundColor: "#f8fafc",
//                     "&:hover": {
//                       backgroundColor: "#f1f5f9",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#3b82f6",
//                     },
//                     "&.Mui-focused": {
//                       backgroundColor: "#fff",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#3b82f6",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": {
//                     color: "#3b82f6",
//                   },
//                 }}
//               />

//               <Box sx={{ textAlign: "right", mb: 3 }}>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "#3b82f6",
//                     cursor: "pointer",
//                     fontWeight: 500,
//                     "&:hover": {
//                       textDecoration: "underline",
//                     },
//                   }}
//                 >
//                   Forgot Password?
//                 </Typography>
//               </Box>

//               <Button
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   py: 1.8,
//                   fontSize: "1rem",
//                   fontWeight: 600,
//                   background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
//                   borderRadius: 2,
//                   textTransform: "none",
//                   boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
//                     boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
//                   },
//                   "&:disabled": {
//                     background: "#cbd5e1",
//                     color: "#94a3b8",
//                   },
//                 }}
//               >
//                 {loading ? (
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <CircularProgress size={20} sx={{ color: "#fff" }} />
//                     Signing in...
//                   </Box>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>

//               <Box
//                 sx={{
//                   mt: 3,
//                   p: 2,
//                   borderRadius: 2,
//                   background: "#f1f5f9",
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 <Typography variant="caption" sx={{ color: "#475569", display: "block", textAlign: "center", lineHeight: 1.6 }}>
//                   <strong>Demo Credentials:</strong>
//                   <br />
//                   admin@pivora.com / Admin@123
//                 </Typography>
//               </Box>
//             </form>

//             <Typography variant="body2" sx={{ textAlign: "center", mt: 4, color: "#94a3b8", fontSize: "0.875rem" }}>
//               © 2024 Pivora Global Pvt Ltd. All rights reserved.
//             </Typography>
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Login;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optional: Verify token validity with API
      navigate("/navbar");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://testapicms.pvorasp.com/api/admin/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Login Response:", response.data);

      if (response.data.token) {
        // Save token to localStorage
        localStorage.setItem("authToken", response.data.token);
        
        // Optional: Save user info if provided
        if (response.data.user) {
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        }
        
        // Optional: Save token expiry time
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        
        setSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/navbar");
        }, 1500);
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-30px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", py: 4 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "1100px",
            mx: "auto",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Left Panel - Brand Section */}
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              p: 6,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                opacity: 0.4,
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  mb: 2,
                  letterSpacing: "-0.5px",
                }}
              >
                PIVORA
                <Box component="span" sx={{ display: "block", fontSize: "1.2rem", fontWeight: 400, mt: 0.5, opacity: 0.95 }}>
                  Global Pvt Ltd
                </Box>
              </Typography>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3, width: "80px", height: "3px" }} />
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.95)", mb: 4, fontWeight: 500, lineHeight: 1.6 }}>
                Your Trusted Partner in Financial Technology Solutions
              </Typography>
              <Stack spacing={2.5}>
                {[
                  { icon: "🔒", text: "Bank-grade Security" },
                  { icon: "⚡", text: "Lightning-fast Transactions" },
                  { icon: "🌐", text: "Global Payment Network" },
                  { icon: "📊", text: "Real-time Analytics" },
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", fontWeight: 500 }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Right Panel - Login Form */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: { xs: 4, sm: 6 },
              background: "rgba(255, 255, 255, 0.98)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  mb: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                Sign in to access your dashboard
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: "#ef4444"
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: "#22c55e"
                    }
                  }}
                >
                  {success}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                placeholder="admin@pivora.com"
                variant="outlined"
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: "#64748b" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8fafc",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#3b82f6",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "#64748b" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={loading}
                        sx={{ color: "#64748b" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8fafc",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#3b82f6",
                  },
                }}
              />

              <Box sx={{ textAlign: "right", mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#3b82f6",
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.8,
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
                  },
                  "&:disabled": {
                    background: "#cbd5e1",
                    color: "#94a3b8",
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                    Signing in...
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography variant="caption" sx={{ color: "#475569", display: "block", textAlign: "center", lineHeight: 1.6 }}>
                  <strong>Demo Credentials:</strong>
                  <br />
                  admin@pivora.com / Admin@123
                </Typography>
              </Box>
            </form>

            <Typography variant="body2" sx={{ textAlign: "center", mt: 4, color: "#94a3b8", fontSize: "0.875rem" }}>
              © 2024 Pivora Global Pvt Ltd. All rights reserved.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;