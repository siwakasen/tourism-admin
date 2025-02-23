import {
  CreateDrivers,
  UpdateDrivers,
  useDeleteDriversMutation,
} from "../../_service/drivers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CreateDriversReqI,
  Drivers,
  BodyDriversReqI,
} from "../../__interface/drivers.interface";

import { driversRoute } from "../../pages/drivers";

export const useCreateUpdateDriversForm = (
  defaultValues?: BodyDriversReqI,
  data?: Drivers | null
) => {
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Name is required"),
    })
    .required();

  const onSubmit = async (formData: CreateDriversReqI) => {
    try {
      if (!data?.id) {
        const res = await CreateDrivers(formData);
        toast.success(res.message);
      } else {
        const res = await UpdateDrivers({ id: data?.id, ...formData });
        toast.success(res.message);
      }
      navigate(driversRoute);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error);
    }
  };

  const { register, handleSubmit, formState, setValue } =
    useForm<BodyDriversReqI>({
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

export const useDeleteDriverForm = (refetch: () => void) => {
  const [deleteDriver] = useDeleteDriversMutation();
  const onDelete = async (id: string) => {
    try {
      await deleteDriver({ id }).unwrap();
      refetch();
      toast.success("Driver deleted successfully");

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
