import {
  CreateTestimonial,
  UpdateTestimonial,
  useDeleteTestimonialMutation,
} from "../../_service/testimonials";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CreateTestimonialReqI,
  Testimonial,
  BodyTestimonialReqI,
} from "../../__interface/testi.interface";

import { testimonialsRoute } from "../../pages/testimonials";

export const useCreateUpdateTesimonialsForm = (
  defaultValues?: BodyTestimonialReqI,
  data?: Testimonial | null
) => {
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Name is required"),
      message: yup.string().required("Message is required"),
      country: yup.string().required("Country is required"),
    })
    .required();

  const onSubmit = async (formData: CreateTestimonialReqI) => {
    try {
      if (!data?.id) {
        const res = await CreateTestimonial(formData);
        toast.success(res.message);
      } else {
        const res = await UpdateTestimonial({ id: data?.id, ...formData });
        toast.success(res.message);
      }
      navigate(testimonialsRoute);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error);
    }
  };

  const { register, handleSubmit, formState, setValue } =
    useForm<BodyTestimonialReqI>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    onSubmit,
  };
};

export const useDeleteTestimonialForm = (refetch: () => void) => {
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const onDelete = async (id: string) => {
    try {
      await deleteTestimonial({ id }).unwrap();
      refetch();
      toast.success("Testimonial deleted successfully");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error(error.error);
      }
      toast.error(error.data.message[0]);
    }
  };
  return { onDelete };
};
