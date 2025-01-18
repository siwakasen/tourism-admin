import * as yup from "yup";
import { useRequestResetPasswordMutation } from "../../_service/auth";
import { HttpStatusCode } from "axios";
import { RequestResetPasswordReqI } from "../../__interface/auth.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useState } from "react";

const useReqResetPasswordForm = () => {
  const [reqResetPassword, { isLoading }] = useRequestResetPasswordMutation();
  const [isAgreed, setIsAgreed] = useState(false);
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  const _requestResetPassword = async (data: RequestResetPasswordReqI) => {
    try {
      const res = await reqResetPassword(data).unwrap();

      toast.success(res.message);
    } catch (e) {
      if ((e as { status: number }).status === HttpStatusCode.Unauthorized) {
        toast.error("Cannot find email");
      } else {
        toast.error("Failed Send Email Reset Password");
      }
      throw e;
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequestResetPasswordReqI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleRequestResetPassword = handleSubmit(_requestResetPassword);
  return {
    register,
    errors,
    watch,
    handleRequestResetPassword,
    isLoading,
    isAgreed,
    setIsAgreed,
  };
};

export default useReqResetPasswordForm;
