import { useState } from "react";
import {
  CreateTravelPackageReqI,
  TravelPackage,
} from "../../../../__interface/travel_package.interface";
import ItemsMultipleInput from "../../../input/items-multiple-input";
import { useCreateUpdateTravelPackage } from "../../../../_hooks/travel_package";

interface InitialFormProps {
  data: TravelPackage | null;
  handleNextToImages: (index: number) => void;
  setIsCreated: (value: boolean) => void;
  isCreated: boolean;
  setId: (value: number) => void;
}


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

  const {
    onSubmit,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    isLoading,
  } = useCreateUpdateTravelPackage(
    {
      package_name: data?.package_name || "",
      description: data?.description || "",
      package_price: data?.package_price || 0,
      duration: data?.duration || 0,
      max_persons: data?.max_persons || 0,
      itineraries: data?.itineraries || [],
      includes: data?.includes || [],
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
      onSubmit={handleSubmit((formData: CreateTravelPackageReqI) =>
        onSubmit(
          formData,
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
            rows={6}
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
            {...register("max_persons")}
            type="number"
            placeholder="Enter max group size"
            className={`input input-bordered w-full ${
              errors.max_persons ? "input-error" : ""
            }`}
          />
          {errors.max_persons && (
            <span className="text-red-500 text-sm">
              {errors.max_persons.message}
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
