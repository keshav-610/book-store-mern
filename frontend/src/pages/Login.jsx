import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const handlegoogle =()=> console.log("you click google")
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-slate-50 max-w-sm w-full p-8 rounded-lg shadow-lg ">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold text-gray-800 text-center tracking-tight">Please Login</h3>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-base tracking-normal text-gray-700">Email</h3>
                <input
                  {...register("email",{required:true})}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-base tracking-normal text-gray-700">Password</h3>
                <input
                  {...register("password",{required:true})}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="Login"
                className="bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-700 transition duration-200 tracking-wide shadow hover:shadow-lg cursor-pointer"
              />
            </div>
          </form>
          <div className=" text-center text-gray-600">
            <h3>
              Haven't an Account? <Link to="/register" className="text-blue-500 hover:underline cursor-pointer">Register</Link>
            </h3>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-950 px-4 py-2 rounded-lg text-white hover:bg-blue-800 transition duration-200 shadow hover:shadow-lg" onClick={handlegoogle}>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
