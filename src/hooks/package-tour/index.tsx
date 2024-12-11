import {
  useCreateTourPackageMutation,
  useUpdateTourPackageMutation,
  uploadImagesTourPackage,
  useDeleteImageTourPackageMutation,
  useUpdateStatusTourPackageMutation,
  useDeleteTourPackageMutation,
} from "../../_service/package-tour";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import {
  CreateTourPackageReqI,
  TourPackage,
  TourPackageResI,
  UploadTourPackageReqI,
  DeleteImageReqI,
  UpdateStatusTourPackageReqI,
} from "../../__interface/tourpackage.interface";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useCreateUpadeTourPackageForm = (
  defaultValues?: CreateTourPackageReqI,
  data?: TourPackage | null
) => {
  const [createTourPackage, { isLoading }] = useCreateTourPackageMutation();
  const [updateTourPackage] = useUpdateTourPackageMutation();

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
      max_group_size: yup
        .number()
        .min(1, "Minimal 1 person in a group")
        .required("Max Group Size is required"),
      children_price: yup
        .number()
        .min(1, "Minimal 1 USD")
        .required("Children Price is required"),
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
      pickup_areas: yup
        .array()
        .of(yup.string().required())
        .required("Pickup Areas is required"),
      terms_conditions: yup
        .array()
        .of(yup.string().required())
        .required("Terms Conditions is required"),
    })
    .required();

  const onSubmit = async (
    formData: CreateTourPackageReqI,
    selectedPickUpAreas: string[],
    selectedTermsConditions: string[],
    setIsCreated: (value: boolean) => void,
    setId: (value: string) => void
  ) => {
    if (selectedPickUpAreas.length === 0) {
      return;
    }
    if (selectedTermsConditions.length === 0) {
      return;
    }
    const payload = {
      ...formData,
      pickup_areas: selectedPickUpAreas,
      terms_conditions: selectedTermsConditions,
    };

    if (data?.id) {
      console.log("payload", {
        ...payload,
        id: data.id,
      });

      const response = await updateTourPackage({
        ...payload,
        id: data.id,
      }).unwrap();
      toast.success(response.message);
    } else {
      try {
        const response = await createTourPackage(payload).unwrap();
        toast.success(response.message);
        setIsCreated(true);
        setId(response.data.id);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.data.message[0]);
      }
    }
  };

  const { register, handleSubmit, formState, setValue } =
    useForm<CreateTourPackageReqI>({
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

export const useDeleteTourPackageForm = (refetch: () => void) => {
  const [deleteImageTourPackage, { isLoading }] =
    useDeleteImageTourPackageMutation();
  const onDelete = async (formData: DeleteImageReqI) => {
    try {
      await deleteImageTourPackage(formData).unwrap();
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

export const useUploadImagesTourPackageForm = (refetch: () => void) => {
  const navigate = useNavigate();

  const onSubmit = async (data: UploadTourPackageReqI) => {
    try {
      const response: TourPackageResI = await uploadImagesTourPackage(data);
      toast.success(response.message);
      navigate("/admin/tour-package/");
      refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return {
    onSubmit,
  };
};

export const useUpdateStatusTourPackage = (refetch: () => void) => {
  const [updateStatusTourPackage] = useUpdateStatusTourPackageMutation();
  const onUpdate = async (data: UpdateStatusTourPackageReqI) => {
    try {
      await updateStatusTourPackage(data).unwrap();
      refetch();
      toast.success("Status updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return {
    onUpdate,
  };
};

export const useDeleteTourPackage = (refetch: () => void) => {
  const [deleteTourPackage] = useDeleteTourPackageMutation();
  const onDelete = async (id: string) => {
    try {
      await deleteTourPackage({ id }).unwrap();
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
