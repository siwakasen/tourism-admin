import * as yup from "yup";
import { useLoginMutation } from "../../_service/auth";
import { LoginReqI } from "../../__interface/auth.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../store";
import { saveTokenAuth } from "../../store/auth";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const _login = async (data: LoginReqI) => {
    try {
      const res = await login(data).unwrap();
      dispatch(saveTokenAuth(res));
      toast.success("Login Success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (e: any) {
      toast.error("Email or Password is wrong");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginReqI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleLogin = handleSubmit(_login);
  return {
    register,
    errors,
    watch,
    handleLogin,
    isLoading,
  };
};

export default useLogin;
