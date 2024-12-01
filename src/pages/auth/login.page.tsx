const Login = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left Section */}
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Background"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="hidden lg:block lg:relative lg:p-12">
              <a className="block text-white" href="#">
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG Path */}
                </svg>
              </a>
              <h2 className="mt-6 text-3xl font-bold text-white">
                Welcome Back!
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Login to your account and continue where you left off.
              </p>
            </div>
          </section>

          {/* Right Section */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="w-full max-w-md lg:max-w-lg">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Login to Your Account
              </h1>
              <p className="mt-4 text-gray-600">
                Enter your credentials to access your account.
              </p>

              <form className="mt-8 space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Login
                  </button>
                </div>

                {/* Register Link */}
                <p className="mt-4 text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Login;
