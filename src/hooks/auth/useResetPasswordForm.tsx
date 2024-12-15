import * as yup from "yup";
import { useResetPasswordMutation } from "../../_service/auth";
import { HttpStatusCode } from "axios";
import { ResetPasswordReqI } from "../../__interface/auth.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useResetPasswordForm = (token: string) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const schema = yup
    .object({
      token: yup.string().required(),
      password: yup.string().required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
    })
    .required();

  const _resetPassword = async (data: ResetPasswordReqI) => {
    try {
      const res = await resetPassword(data).unwrap();
      console.log("isi res : ", res);
      toast.success("Success Reset Password");
      navigate("/login");
    } catch (e) {
      if ((e as { status: number }).status === HttpStatusCode.Unauthorized) {
        toast.error("Token is wrong");
      } else {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        toast.error((e as any).data.message[0]);
      }
      throw e;
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordReqI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      token: token,
    },
  });

  const handleResetPassword = handleSubmit(_resetPassword);
  return {
    register,
    errors,
    watch,
    handleResetPassword,
    isLoading,
  };
};

export default useResetPasswordForm;
