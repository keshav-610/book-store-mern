import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const showSuccessAlert = (message) => {
    Swal.fire({
      toast: true,
      position: "top",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      toast: true,
      position: "top",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      showSuccessAlert("Login successful");
      navigate("/");
    } catch (error) {
      showErrorAlert("Login failed. Please try again. " + (error?.message || "Unknown error"));
    }
  };

  const handleGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      console.log(userCredential)
      showSuccessAlert("Google Login successful");
      navigate("/");
    } catch (error) {
      showErrorAlert("Login failed. Please try again. " + (error?.message || "Unknown error"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-50 max-w-sm w-full p-8 rounded-lg shadow-lg">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold text-gray-800 text-center tracking-tight">Please Login</h3>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-base font-semibold tracking-normal text-gray-700">Email</h3>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-base font-semibold tracking-normal text-gray-700">Password</h3>
                <input
                  {...register("password", { required: "Password is required" })}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                  placeholder="Enter your password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="Login"
                className="bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-700 transition duration-200 tracking-wide shadow hover:shadow-lg cursor-pointer mt-4"
              />
            </div>
          </form>
          <div className="text-center text-gray-600">
            <h3>
              Haven't an Account? <Link to="/register" className="text-blue-500 hover:underline cursor-pointer">Register</Link>
            </h3>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-200 shadow hover:shadow-lg flex justify-center items-center gap-5"
              onClick={handleGoogle}
            >
              <FaGoogle />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
