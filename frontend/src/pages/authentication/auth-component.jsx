import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (signupPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    try {
      const response = await axios.post('http://localhost:5555/api/users/signup', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      toast.success('Sign up successful! Please check your email for verification.');
      console.log('Sign up successful:', response.data);
    } catch (error) {
      setErrors({ signup: error.response?.data?.message || 'Sign up failed' });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Example login logic
    try {
      const response = await axios.post('http://localhost:5555/api/users/login', {
        email: signupEmail,
        password: signupPassword,
      });
      toast.success('Login successful!'); // Show success message on successful login
      console.log('Login successful:', response.data);
    } catch (error) {
      setErrors({ login: error.response?.data?.message || 'Login failed' });
    }
  };

  const handleForgotPassword = async () => {
    setIsForgotPassword(true);
    // Logic for sending OTP can be added here
    toast.success('OTP sent! Please check your email.');
  };

  const handleChangePassword = () => {
    // Alert user to login and autofill credentials
    toast.warning('Please log in to change your password.');
    setIsLogin(true);
    setSignupUsername(signupEmail); // Assuming username is the email for login
    setSignupPassword(''); // Clear the password for security
    setOtp(''); // Clear OTP for security
    setNewPassword(''); // Clear new password for security
    setConfirmNewPassword(''); // Clear confirm password for security
  };

  const handleKeepLoggedInChange = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
      {!isForgotPassword ? (
        <>
          {!isLogin ? (
            <form onSubmit={handleSignup} className="border p-4 rounded shadow">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                />
                {errors.signupUsername && <p className="text-danger">{errors.signupUsername}</p>}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                {errors.signupEmail && <p className="text-danger">{errors.signupEmail}</p>}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              {errors.signup && <p className="text-danger">{errors.signup}</p>}
            </form>
          ) : (
            <form onSubmit={handleLogin} className="border p-4 rounded shadow">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={keepLoggedIn}
                  onChange={handleKeepLoggedInChange}
                  id="keepLoggedIn"
                />
                <label className="form-check-label" htmlFor="keepLoggedIn">Keep Me Logged In</label>
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
              {errors.login && <p className="text-danger">{errors.login}</p>}
            </form>
          )}

          <div className="text-center mt-3">
            <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
              {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
            <button onClick={handleForgotPassword} className="btn btn-link">Forgot Password?</button>
          </div>
        </>
      ) : (
        <div className="border p-4 rounded shadow mt-4">
          <h3 className="text-center">Change Password</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {errors.confirmNewPassword && <p className="text-danger">{errors.confirmNewPassword}</p>}
          <button onClick={handleChangePassword} className="btn btn-primary w-100">Change Password</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
