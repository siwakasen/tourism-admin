import { useState } from "react";
import {
  CreateTourPackageReqI,
  TourPackage,
} from "../../../../__interface/tourpackage.interface";
import ItemsMultipleInput from "../../../input/items-multiple-input";
import CheckboxMultipleInput from "../../../input/checkbox-multiple-input";
import { useCreateUpadeTourPackageForm } from "../../../../hooks/package-tour";

interface InitialFormProps {
  data: TourPackage | null;
  handleNextToImages: (index: number) => void;
  setIsCreated: (value: boolean) => void;
  isCreated: boolean;
  setId: (value: string) => void;
}

import {
  pickupAreasDummy,
  termsConditionsDummy,
} from "../../../../data/dummy/tour-package.dummy";

const InitialForm: React.FC<InitialFormProps> = ({
  data,
  handleNextToImages,
  setIsCreated,
  isCreated,
  setId,
}: InitialFormProps) => {
  const [itineraries, setItineraries] = useState<string[]>(
    data?.itineraries || []
  );
  const [includes, setIncludes] = useState<string[]>(data?.includes || []);
  const [pickUpAreas, setPickUpAreas] = useState<string[]>(
    data?.pickup_areas || pickupAreasDummy
  );
  const [termsConditions, setTermsConditions] = useState<string[]>(
    data?.terms_conditions || termsConditionsDummy
  );
  const [selectedPickUpAreas, setSelectedPickUpAreas] = useState<string[]>(
    data?.pickup_areas || pickupAreasDummy
  );
  const [selectedTermsConditions, setSelectedTermsConditions] = useState<
    string[]
  >(data?.terms_conditions || termsConditionsDummy);

  const {
    onSubmit,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    isLoading,
  } = useCreateUpadeTourPackageForm(
    {
      package_name: data?.package_name || "",
      description: data?.description || "",
      package_price: data?.package_price || 0,
      duration: data?.duration || 0,
      max_group_size: data?.max_group_size || 0,
      children_price: data?.children_price || 0,
      itineraries: data?.itineraries || [],
      includes: data?.includes || [],
      pickup_areas: data?.pickup_areas || [],
      terms_conditions: data?.terms_conditions || [],
    },
    data
  );

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit((formData: CreateTourPackageReqI) =>
        onSubmit(
          formData,
          selectedPickUpAreas,
          selectedTermsConditions,
          setIsCreated,
          setId
        )
      )}
      className="grid grid-cols-2 gap-4 rounded-lg bg-white pt-4 px-4 pb-8"
    >
      {/* Package Name */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Package Name</span>
          </div>
          <input
            {...register("package_name")}
            type="text"
            placeholder="Enter the package name"
            className={`input input-bordered w-full ${
              errors.package_name ? "input-error" : ""
            }`}
          />
          {errors.package_name && (
            <span className="text-red-500 text-sm">
              {errors.package_name.message}
            </span>
          )}
        </label>
      </div>
      {/* Description */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Description</span>
          </div>
          <textarea
            {...register("description")}
            placeholder="Type the package description"
            className={`textarea textarea-bordered w-full ${
              errors.description ? "textarea-error" : ""
            }`}
            rows={3}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </label>
      </div>
      {/* Package Price */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Package Price (USD)
            </span>
          </div>
          <input
            {...register("package_price")}
            type="number"
            placeholder="Enter package price"
            className={`input input-bordered w-full ${
              errors.package_price ? "input-error" : ""
            }`}
          />
          {errors.package_price && (
            <span className="text-red-500 text-sm">
              {errors.package_price.message}
            </span>
          )}
        </label>
      </div>
      {/* Duration */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Duration (hours)</span>
          </div>
          <input
            {...register("duration")}
            type="number"
            placeholder="Enter duration"
            className={`input input-bordered w-full ${
              errors.duration ? "input-error" : ""
            }`}
          />
          {errors.duration && (
            <span className="text-red-500 text-sm">
              {errors.duration.message}
            </span>
          )}
        </label>
      </div>
      {/* Max Group Size */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Maximum Group Size (person)
            </span>
          </div>
          <input
            {...register("max_group_size")}
            type="number"
            placeholder="Enter max group size"
            className={`input input-bordered w-full ${
              errors.max_group_size ? "input-error" : ""
            }`}
          />
          {errors.max_group_size && (
            <span className="text-red-500 text-sm">
              {errors.max_group_size.message}
            </span>
          )}
        </label>
      </div>
      {/* Children Price */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Children Price (USD)
            </span>
          </div>
          <input
            {...register("children_price")}
            type="number"
            placeholder="Enter children price"
            className={`input input-bordered w-full ${
              errors.children_price ? "input-error" : ""
            }`}
          />
          {errors.children_price && (
            <span className="text-red-500 text-sm">
              {errors.children_price.message}
            </span>
          )}
        </label>
      </div>
      {/* Itineraries */}
      <ItemsMultipleInput
        items={itineraries}
        setItems={(value) => {
          setItineraries(value);
          setValue("itineraries", value);
        }}
        label={"Itineraries"}
        placeholder="Enter itinerary item"
        errors={errors.itineraries}
      />
      {/* Includes */}
      <ItemsMultipleInput
        items={includes}
        setItems={(value) => {
          setIncludes(value);
          setValue("includes", value);
        }}
        label={"Includes"}
        placeholder="Enter included items"
        errors={errors.includes}
      />
      {/* Pickup Areas */}
      <div className="col-span-2">
        <CheckboxMultipleInput
          label={"Pickup Areas"}
          placeholder={"Add new pickup areas"}
          items={pickUpAreas}
          setItems={setPickUpAreas}
          selectedItems={selectedPickUpAreas}
          setSelectedItems={setSelectedPickUpAreas}
          errors={
            selectedPickUpAreas.length === 0
              ? "Pickup Areas must have at least 1 item"
              : ""
          }
        />
      </div>
      {/* Terms & Conditions */}
      <div className="col-span-2">
        <CheckboxMultipleInput
          label={"Terms & Conditions"}
          placeholder={"Add new terms & conditions"}
          items={termsConditions}
          setItems={setTermsConditions}
          selectedItems={selectedTermsConditions}
          setSelectedItems={setSelectedTermsConditions}
          errors={
            selectedTermsConditions.length === 0
              ? "Terms &  Conditions must have at least 1 item"
              : ""
          }
        />
      </div>
      {/* Submit Buttons */}
      <div className="col-span-2 flex justify-end gap-4 mt-10 text-right">
        <button
          type="submit"
          disabled={data?.id ? false : isCreated ? true : false}
          className={`btn text-white btn-success`}
        >
          {data?.id ? "Update" : "Create"}
        </button>
        <button
          type="button"
          disabled={!isCreated || isLoading}
          onClick={() => handleNextToImages(1)}
          className="btn bg-sky-600 hover:bg-sky-700 text-white"
        >
          Next: Images
        </button>
      </div>
    </form>
  );
};

export default InitialForm;
