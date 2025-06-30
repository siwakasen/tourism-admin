import { useState } from "react";
import { CreateCarsReqI, Cars } from "../../../../__interface/cars.interface";
import ItemsMultipleInput from "../../../input/items-multiple-input";
import { useCreateUpdateCarsForm } from "../../../../_hooks/cars";

interface InitialFormProps {
  data: Cars | null;
  setIsCreated: (value: boolean) => void;
  isCreated: boolean;
  setId: (value: number) => void;
  handleNextToImages: (index: number) => void;
}

const InitialForm: React.FC<InitialFormProps> = ({
  data,
  setIsCreated,
  isCreated,
  setId,
  handleNextToImages,
}: InitialFormProps) => {
  const {
    onSubmit,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    isLoading,
  } = useCreateUpdateCarsForm(
    {
      car_name: data?.car_name || "",
      description: data?.description || "",
      price_per_day: data?.price_per_day || 0,
      includes: data?.includes || [],
      car_color: data?.car_color || "",
      police_number: data?.police_number || "",
      transmission: data?.transmission || "",
      max_persons: data?.max_persons || 0,
    },
    data
  );
  const [includes, setIncludes] = useState<string[]>(data?.includes || []);

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onSubmit={handleSubmit((formData: CreateCarsReqI) => {
        onSubmit(formData, setIsCreated, setId);
      })}
      className="grid grid-cols-2 gap-4 rounded-lg bg-white pt-4 px-4 pb-8"
    >
      {/* Car Name */}
      <div>
        <label htmlFor="car_name" className="label">
          <span className="label-text text-slate-800">Car Name</span>
        </label>
        <input
          type="text"
          id="car_name"
          className={`input input-bordered w-full ${
            errors.car_name ? "input-error" : ""
          }`}
          placeholder="Enter car name"
          defaultValue={data?.car_name}
          {...register("car_name")}
        />
        {errors.car_name && (
          <span className="text-xs text-red-500">
            {errors.car_name.message}
          </span>
        )}
      </div>

      {/* Car Color */}
      <div>
        <label htmlFor="car_color" className="label">
          <span className="label-text text-slate-800">Car Color</span>
        </label>
        <input
          type="text"
          id="car_color"
          className={`input input-bordered w-full ${
            errors.car_color ? "input-error" : ""
          }`}
          placeholder="Enter car color"
          defaultValue={data?.car_color}
          {...register("car_color")}
        />
        {errors.car_color && (
          <span className="text-xs text-red-500">
            {errors.car_color.message}
          </span>
        )}
      </div>

      {/* Transmission */}
      <div>
        <label htmlFor="transmission" className="label">
          <span className="label-text text-slate-800">Transmission</span>
        </label>
        <select
          id="transmission"
          className={`select select-bordered w-full ${
            errors.transmission ? "select-error" : ""
          }`}
          {...register("transmission")}
        >
          <option value="">Select transmission</option>
          <option value="MANUAL">MANUAL</option>
          <option value="AUTO">AUTO</option>
        </select>
        {errors.transmission && (
          <span className="text-xs text-red-500">
            {errors.transmission.message}
          </span>
        )}
      </div>

      {/* Police Number */}
      <div>
        <label htmlFor="police_number" className="label">
          <span className="label-text text-slate-800">Police Number</span>
        </label>
        <input
          type="text"
          id="police_number"
          className={`input input-bordered w-full ${
            errors.police_number ? "input-error" : ""
          }`}
          placeholder="Enter police number"
          defaultValue={data?.police_number}
          {...register("police_number")}
        />
        {errors.police_number && (
          <span className="text-xs text-red-500">
            {errors.police_number.message}
          </span>
        )}
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
            rows={4}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </label>
      </div>

      {/* Price */}
      <div className="col-span-2">
        <label htmlFor="price_per_day" className="label">
          <span className="label-text text-slate-800">Price</span>
        </label>
        <input
          type="number"
          id="price_per_day"
          className={`input input-bordered w-full ${
            errors.price_per_day ? "input-error" : ""
          }`}
          placeholder="Enter price per day"
          defaultValue={data?.price_per_day}
          {...register("price_per_day")}
        />
        {errors.price_per_day && (
          <span className="text-xs text-red-500">
            {errors.price_per_day.message}
          </span>
        )}
      </div>

      {/* Max Person */}
      <div>
        <label htmlFor="max_person" className="label">
          <span className="label-text text-slate-800">Max Person</span>
        </label>
        <input
          type="number"
          id="max_person"
          className={`input input-bordered w-full ${
            errors.max_persons ? "input-error" : ""
          }`}
          placeholder="Enter max person"
          defaultValue={data?.max_persons}
          {...register("max_persons")}
        />
        {errors.max_persons && (
          <span className="text-xs text-red-500">
            {errors.max_persons.message}
          </span>
        )}
      </div>

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
