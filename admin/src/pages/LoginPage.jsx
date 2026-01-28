import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (val) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (localError) setLocalError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-500">
      {/* Theme toggle */}
      <div className="absolute top-5 right-7 z-10">
        <ThemeToggle />
      </div>
      {/* Glassmorphism card */}
      <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-8 w-full max-w-sm sm:max-w-md
        flex flex-col items-center transition-colors duration-300"
      >
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-1 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-200 dark:bg-blue-950 flex items-center justify-center shadow-sm">
            <span className="text-2xl font-bold text-blue-800 dark:text-blue-200 select-none">🛡</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-blue-100">Portfolio Admin</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-label="Login form"
          className="w-full space-y-5"
        >
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 border rounded-md bg-slate-50/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 text-sm text-slate-800 dark:text-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
              required
              autoFocus
              aria-invalid={!!localError && !validateEmail(email)}
              aria-describedby={localError ? "login-error" : undefined}
            />
          </div>
          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-md bg-slate-50/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 text-sm text-slate-800 dark:text-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                required
                minLength={6}
              />
              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none z-10"
                style={{ padding: 0, lineHeight: 0 }}
              >
                {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          {/* Error message */}
          {(localError || error) && (
            <div
              id="login-error"
              role="alert"
              className="w-full px-3 py-2 rounded-md border border-red-300 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2 animate-fadeIn shadow-sm"
            >
              <span>{localError || error}</span>
            </div>
          )}
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600/90 dark:bg-blue-500/80 text-white rounded-md font-semibold shadow hover:bg-blue-700/90 dark:hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:pointer-events-none text-sm"
          >
            {loading && (
              <span className="inline-block animate-spin border-2 border-white border-t-blue-600 dark:border-t-blue-500 rounded-full w-4 h-4"></span>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
          
          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-2 left-0 w-full text-center text-xs text-slate-400 dark:text-gray-600">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
