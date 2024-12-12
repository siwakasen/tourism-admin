import { useState } from "react";
import login_img from "../../images/login_img.jpg";
import logo_tour2 from "../../images/logo_tour2.png";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Simulate API request
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={login_img}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Bali Admin Tour🦑
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Kelola data tour package anda disini
            </p>
          </div>
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-3/4 flex flex-col items-center justify-center">
            <img
              alt=""
              src={logo_tour2}
              className="w-48  object-cover opacity-100"
            />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Login to your account
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Welcome back! Please log in to continue.
            </p>

            <form
              onSubmit={handleFormSubmit}
              className="mt-8 grid grid-cols-6 gap-6 w-full"
            >
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="example@example.com"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full bg-emerald-100">
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Forgot Password ?
                    <a href="#" className="text-primary underline ml-1">
                      Reset Password
                    </a>
                    <button className="btn">
                      <span className="loading loading-spinner"></span>
                      loading
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
