import {
  useCreateCarsMutation,
  useUpdateCarsMutation,
  useDeleteCarsMutation,
  uploadCarsImage,
} from "../../_service/cars";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CreateCarsReqI,
  UploadImageCarsReqI,
  Cars,
} from "../../__interface/cars.interface";
import { carsRentalRoute } from "../../pages/cars-rental";
export const useCreateUpdateCarsForm = (
  defaultValues?: CreateCarsReqI,
  data?: Cars | null
) => {
  const [createCars, { isLoading }] = useCreateCarsMutation();
  const [updateCars] = useUpdateCarsMutation();

  const schema = yup
    .object()
    .shape({
      car_name: yup.string().required("Car Name is required"),
      car_color: yup.string().required("Car Color is required"),
      police_number: yup.string().required("Police Number is required"),
      transmission: yup.string().required("Transmission is required"),
      description: yup.string().required("Description is required"),
      max_persons: yup
        .number()
        .min(1, "Minimal 1 person")
        .required("Maximum number of persons is required"),
      price_per_day: yup.number().min(1, "Minimal 1 USD").required(),
      includes: yup
        .array()
        .of(yup.string().required())
        .min(1, "Includes must have at least 1 item")
        .required("Includes is required"),
    })
    .required();

  const onSubmit = async (
    formData: CreateCarsReqI,
    setIsCreated: (value: boolean) => void,
    setId: (value: number) => void
  ) => {
    try {
      if (data?.id) {
        const res = await updateCars({ id: data.id, ...formData }).unwrap();
        toast.success(res.message);
      } else {
        const res = await createCars(formData).unwrap();
        toast.success(res.message);
        setIsCreated(true);
        setId(res.data.id);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message[0]);
    }
  };

  const { register, handleSubmit, formState, setValue } =
    useForm<CreateCarsReqI>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    isLoading,
    onSubmit,
  };
};

export const useUploadImageCars = (refetch?: () => void) => {
  const navigate = useNavigate();
  const onSubmit = async (formData: UploadImageCarsReqI) => {
    try {
      const res = await uploadCarsImage(formData);
      toast.success(res.message);

      navigate(carsRentalRoute);
      if (refetch) {
        refetch();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message[0]);
    }
  };

  return { onSubmit };
};

export const useDeleteCarsForm = (refetch: () => void) => {
  const [deleteCars] = useDeleteCarsMutation();
  const onDelete = async (id: number) => {
    try {
      await deleteCars({ id }).unwrap();
      refetch();
      toast.success("Cars deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error(error.error);
      }
      toast.error(error.data.message[0]);
    }
  };
  return {
    onDelete,
  };
};
