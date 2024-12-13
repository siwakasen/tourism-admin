import * as yup from "yup";
import { useLoginMutation } from "../../_service/auth";
import { HttpStatusCode } from "axios";
import { LoginReqI } from "../../__interface/auth.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const UseLoginForm = () => {
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
      console.log(res);
    } catch (e) {
      console.log(e);
      throw HttpStatusCode;
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

export default UseLoginForm;
