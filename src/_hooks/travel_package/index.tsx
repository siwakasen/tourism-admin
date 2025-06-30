import {
  useCreateTravelPackageMutation,
  useUpdateTravelPackageMutation,
  uploadImagesTravelPackage,
  useDeleteImageTravelPackageMutation,
  useDeleteTravelPackageMutation,
} from "../../_service/travel_package";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import {
  CreateTravelPackageReqI,
  TravelPackage,
  TravelPackageResI,
  UploadTravelPackageReqI,
  DeleteImageReqI,
} from "../../__interface/travel_package.interface";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useCreateUpdateTravelPackage = (
  defaultValues?: CreateTravelPackageReqI,
  data?: TravelPackage | null
) => {
  const [createTravelPackage, { isLoading }] = useCreateTravelPackageMutation();
  const [updateTravelPackage] = useUpdateTravelPackageMutation();

  const schema = yup
    .object()
    .shape({
      package_name: yup.string().required("Package Name is required"),
      description: yup.string().required("Description is required"),
      package_price: yup
        .number()
        .min(1, "Minimal 1 USD")
        .required("Package Price is required"),
      duration: yup
        .number()
        .min(1, "Minimal 1 Day")
        .required("Duration is required"),
      max_persons: yup
        .number()
        .min(1, "Minimal 1 person in a group")
        .required("Max Persons is required"),
      itineraries: yup
        .array()
        .of(yup.string().required())
        .min(1, "Itineraries must have at least 1 item")
        .required("Itineraries is required"),
      includes: yup
        .array()
        .of(yup.string().required())
        .min(1, "Includes must have at least 1 item")
        .required("Includes is required"),
    })
    .required();

  const onSubmit = async (
    formData: CreateTravelPackageReqI,
    setIsCreated: (value: boolean) => void,
    setId: (value: number) => void
  ) => {
    try {
      if (data?.id) {
        const response = await updateTravelPackage({
          ...formData,
          id: data.id,
        }).unwrap();
        toast.success(response.message);
      } else {
        const response = await createTravelPackage(formData).unwrap();
        toast.success(response.message);
        setIsCreated(true);
        setId(response.data.id);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message[0]);
    }
  };

  const { register, handleSubmit, formState, setValue } =
    useForm<CreateTravelPackageReqI>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    onSubmit,
    isLoading,
  };
};

export const useDeleteImageTravelPackage = (refetch: () => void) => {
  const [deleteImageTravelPackage, { isLoading }] =
    useDeleteImageTravelPackageMutation();
  const onDelete = async (formData: DeleteImageReqI) => {
    try {
      await deleteImageTravelPackage(formData).unwrap();
      refetch();
      toast.success("Image deleted successfully");
      //   eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error(error.error);
      }
      toast.error(error.data.message[0]);
    }
  };
  return {
    onDelete,
    isLoading,
  };
};

export const useUploadImagesTravelPackageForm = (refetch?: () => void) => {
  const navigate = useNavigate();

  const onSubmit = async (data: UploadTravelPackageReqI) => {
    try {
      const response: TravelPackageResI = await uploadImagesTravelPackage(data);
      toast.success(response.message);
      navigate("/admin/tour-package/");
      if (refetch) {
        refetch();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return {
    onSubmit,
  };
};

export const useDeleteTravelPackage = (refetch: () => void) => {
  const [deleteTravelPackage] = useDeleteTravelPackageMutation();
  const onDelete = async (id: number) => {
    try {
      await deleteTravelPackage({ id }).unwrap();
      refetch();
      toast.success("Tour Package deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return {
    onDelete,
  };
};
