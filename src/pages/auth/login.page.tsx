import login_img from "../../../public/images/login_img.jpg";
import logo_tour2 from "../../../public/images/logo_tour2.png";
import CInputText from "../../components/input/c-Input";
import UseLoginForm from "../../hooks/auth/useLoginForm";
import { Button } from "react-daisyui";

const Login = () => {
  const { handleLogin, errors, isLoading, register } = UseLoginForm();

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
              onSubmit={handleLogin}
              className="mt-8 grid grid-cols-6 gap-6 w-full"
            >
              <div className="col-span-6">
                <CInputText
                  label="Email"
                  register={register("email")}
                  errors={errors.email?.message?.toString()}
                ></CInputText>
              </div>

              <div className="col-span-6">
                <CInputText
                  label="Password"
                  register={register("password")}
                  errors={errors.password?.message?.toString()}
                ></CInputText>
              </div>
              <div className="flex flex-col col-span-6 items-center justify-center w-full ">
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-center">
                  <p className="text-sm text-gray-500 text-center">
                    Forgot Password?
                    <a href="#" className="text-primary underline ml-2">
                      Reset Password
                    </a>
                  </p>
                </div>

                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full bg-primary mt-8 text-red-50 font-bold text-lg"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
