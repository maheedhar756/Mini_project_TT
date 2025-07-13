import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate(); 

  const jwtToken = Cookies.get("jwt_token");
  // If the user is already logged in, redirect to home page
  // This check is done to prevent the user from accessing the login page if they are already logged in
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = error => {
    setShowSubmitError(true);
    if (error === "username and password didn't match") {
      setErrorMsg("Incorrect username or password");
    } else {
      setErrorMsg(error);
    }
  };

  const submitForm = async event => {
    event.preventDefault();
    const userDetails = { username, password };

    const response = await fetch("https://apis.ccbp.in/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8fafc] px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold font-[Caveat] text-[#2f436e] mb-6">
          Travel Trip
        </h1>

        <form onSubmit={submitForm} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className=" mb-1 text-[#2f436e] font-[Inter]">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium mb-1 text-[#2f436e] font-[Inter]">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="border border-gray-300 rounded px-3 py-2 text-sm pr-10 password-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {showSubmitError && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

          {/* Submit button */}
          <button type="submit"
            className="w-full bg-[#2f436e] hover:bg-[#3b5283] text-white font-semibold py-2 rounded"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
