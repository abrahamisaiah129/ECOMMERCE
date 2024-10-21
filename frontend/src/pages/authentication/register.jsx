import { useState, useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [haveAccount, setHaveAccount] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Confirm new password state
  const [errors, setErrors] = useState({});
  const { isDarkTheme, logout } = useContext(ThemeContext);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    let loginErrors = {};

    if (!validateEmail(loginEmail)) {
      loginErrors.loginEmail = "Please enter a valid email.";
    }
    if (loginPassword.trim() === "") {
      loginErrors.loginPassword = "Password is required.";
    }

    setErrors(loginErrors);

    if (Object.keys(loginErrors).length === 0) {
      console.log("Logged in:", { loginEmail, loginPassword });
      toast.success('Login successful!');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let signupErrors = {};

    if (signupUsername.trim() === "") {
      signupErrors.signupUsername = "Username is required.";
    }
    if (!validateEmail(signupEmail)) {
      signupErrors.signupEmail = "Please enter a valid email.";
    }
    if (signupPassword.length < 6) {
      signupErrors.signupPassword = "Password must be at least 6 characters long.";
    }
    if (signupPassword !== confirmPassword) {
      signupErrors.confirmPassword = "Passwords do not match.";
    }
    if (!image) {
      signupErrors.image = "Image is required.";
    }

    setErrors(signupErrors);

    if (Object.keys(signupErrors).length === 0) {
      console.log("Signed up:", {
        signupUsername,
        signupEmail,
        signupPassword,
        image,
      });
      toast.success('Signup successful! Please check your email for the OTP.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (validateEmail(loginEmail)) {
      console.log("OTP sent to:", loginEmail);
      toast.success('OTP sent to your email!');
      setShowOtp(true);
    } else {
      toast.error('Please enter a valid email!');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log("OTP entered:", otp);
    toast.success('OTP verified successfully! Please enter your new password.');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    let passwordErrors = {};

    if (newPassword.length < 6) {
      passwordErrors.newPassword = "Password must be at least 6 characters long.";
    }
    if (newPassword !== confirmNewPassword) {
      passwordErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(passwordErrors);

    if (Object.keys(passwordErrors).length === 0) {
      console.log("Password changed:", newPassword);
      toast.success('Password changed successfully! You can now log in.');
      setHaveAccount(true); // Show login form after password change
      setShowOtp(false); // Hide OTP form
      // Resetting input fields after successful password change
      setLoginEmail(""); 
      setLoginPassword("");
    }
  };

  return (
    <div className={`p-5 ${isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"} my-4`}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`card ${isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"} shadow-lg`}>
            <div className="card-header d-flex justify-content-around">
              <button
                onClick={() => setHaveAccount(false)}
                className={`btn btn-sm ${!haveAccount ? "btn-primary" : "btn-outline-primary"} rounded-pill`}
              >
                Login
              </button>
              <button
                onClick={() => setHaveAccount(true)}
                className={`btn btn-sm ${haveAccount ? "btn-success" : "btn-outline-success"} rounded-pill`}
              >
                Sign Up
              </button>
            </div>

            <div className="card-body">
              {/* Login Form */}
              {!haveAccount && (
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    {errors.loginEmail && <small className="text-danger">{errors.loginEmail}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Password"
                    />
                    {errors.loginPassword && <small className="text-danger">{errors.loginPassword}</small>}
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary w-100 rounded-pill">
                    Login
                  </button>
                  <button type="button" className="btn btn-sm btn-link w-100" onClick={handleForgotPassword}>
                    Forgot Password?
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {haveAccount && (
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                    {errors.signupUsername && <small className="text-danger">{errors.signupUsername}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    {errors.signupEmail && <small className="text-danger">{errors.signupEmail}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Password"
                    />
                    {errors.signupPassword && <small className="text-danger">{errors.signupPassword}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                    {errors.image && <small className="text-danger">{errors.image}</small>}
                    {imagePreview && (
                      <div className="mt-2">
                        <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ width: '100%' }} />
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-sm btn-success w-100 rounded-pill">
                    Sign Up
                  </button>
                </form>
              )}

              {/* OTP Verification */}
              {showOtp && (
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                  </div>
                  <button type="submit" className="btn btn-sm btn-info w-100 rounded-pill">
                    Verify OTP
                  </button>
                </form>
              )}

              {/* Change Password Form after OTP Verification */}
              {showOtp && (
                <form onSubmit={handleChangePassword}>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    {errors.confirmNewPassword && <small className="text-danger">{errors.confirmNewPassword}</small>}
                  </div>
                  <button type="submit" className="btn btn-sm btn-success w-100 rounded-pill">
                    Change Password
                  </button>
                </form>
              )}
            </div>

            {/* Logout Button */}
            <div className="card-footer">
              <button className="btn btn-danger w-100 rounded-pill" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
