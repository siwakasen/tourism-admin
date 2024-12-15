import * as yup from "yup";
import { useLoginMutation } from "../../_service/auth";
import { HttpStatusCode } from "axios";
import { LoginReqI } from "../../__interface/auth.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../store";
import { saveTokenAuth } from "../../store/auth";

const useLoginForm = () => {
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
      console.log("isi res : ", res);
      dispatch(saveTokenAuth(res));
      toast.success("Login Success");
    } catch (e) {
      if ((e as { status: number }).status === HttpStatusCode.Unauthorized) {
        toast.error("Email or Password is wrong");
      } else {
        toast.error("Login Failed");
      }
      throw e;
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

export default useLoginForm;
