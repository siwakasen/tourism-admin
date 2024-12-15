import login_img from "../../images/login_img.jpg";
import logo_tour2 from "../../images/logo_tour2.png";
import useReqResetPasswordForm from "../../hooks/auth/useReqResetPasswordForm";
import CInputText from "../../components/input/c-Input";

export const ResetPasswordRouteRequest = "/reset-password-request";
const ResetPasswordRequest = () => {
  const {
    errors,
    isLoading,
    handleRequestResetPassword,
    register,
    isAgreed,
    setIsAgreed,
  } = useReqResetPasswordForm();

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 flex justify-center items-center h-[100vh] ">
        {/* Left Section (Form) */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 w-full">
          <div className="w-3/4 flex flex-col items-center justify-center">
            <img
              alt=""
              src={logo_tour2}
              className="w-48 object-cover opacity-100 mb-6"
            />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Reset Your Password
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Enter your email address and agree to proceed.
            </p>

            <form
              onSubmit={handleRequestResetPassword}
              className="mt-8 grid grid-cols-6 gap-6 w-full"
            >
              <div className="col-span-6">
                <CInputText
                  type="email"
                  label="Email"
                  register={register("email")}
                  errors={errors.email?.message}
                  placeholder="type your email"
                />
              </div>

              <div className="col-span-6 flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mr-2"
                />
                <label
                  htmlFor="agree"
                  className="text-sm font-medium text-gray-700"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="col-span-6 flex justify-center">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${
                    isLoading || !isAgreed ? "btn-disabled" : ""
                  }`}
                  disabled={isLoading || !isAgreed}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </div>

              <div className="col-span-6 flex justify-center mt-4">
                <a
                  href="/login"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Remembered your password? Back to Login!
                </a>
              </div>
            </form>
          </div>
        </main>

        {/* Right Section (Image) */}
        <section className="relative lg:flex hidden h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
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
              Enter your email and follow the instructions to reset your
              password.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ResetPasswordRequest;
