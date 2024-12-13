import { useState } from "react";
// import { useParams } from "react-router-dom";
import login_img from "../../../public/images/login_img.jpg";
import logo_tour2 from "../../../public/images/logo_tour2.png";

const ResetPassword = () => {
  //   const { token } = useParams(); // Capture token from URL params
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      // Simulate API request with token
      setIsLoading(false);
      alert("Password reset successful!");
    }, 2000);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section (Form) */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-3/4 flex flex-col items-center justify-center">
            <img
              alt=""
              src={logo_tour2}
              className="w-48 object-cover opacity-100 mb-6"
            />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Set Your New Password
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Enter your new password below to reset it.
            </p>

            <form
              onSubmit={handleFormSubmit}
              className="mt-8 grid grid-cols-6 gap-6 w-full"
            >
              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="ConfirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="ConfirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input input-bordered w-full mt-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6 flex justify-center">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${
                    isLoading ? "btn-disabled" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Right Section (Image) */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={login_img}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Reset Password Assistance
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Create a new password to secure your account.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ResetPassword;
