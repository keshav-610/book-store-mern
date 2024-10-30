import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-50 max-w-sm w-full p-8 rounded-lg shadow-lg">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold text-gray-800 text-center tracking-tight">Register</h3>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-base tracking-normal text-gray-700">Email</h3>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-base tracking-normal text-gray-700">Password</h3>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                  placeholder="Enter your password"
                />
                {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
              </div>
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="Register"
                className="bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-700 transition duration-200 tracking-wide shadow hover:shadow-lg cursor-pointer"
              />
            </div>
          </form>
          <div className="text-center text-gray-600">
            <h3>
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline cursor-pointer">Login</Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
