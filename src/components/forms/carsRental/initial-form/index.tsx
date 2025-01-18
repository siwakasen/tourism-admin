import { useState } from "react";
import { CreateCarsReqI, Cars } from "../../../../__interface/cars.interface";
import ItemsMultipleInput from "../../../input/items-multiple-input";
import { useCreateUpdateCarsForm } from "../../../../_hooks/cars";
import { useListBrandsQuery } from "../../../../_service/brands";

interface InitialFormProps {
  data: Cars | null;
  setIsCreated: (value: boolean) => void;
  isCreated: boolean;
  setId: (value: string) => void;
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
      price: data?.price || 0,
      includes: data?.includes || [],
      brand_id: data?.brand.id || "",
      min_person: data?.min_person || 0,
      max_person: data?.max_person || 0,
    },
    data
  );
  const [includes, setIncludes] = useState<string[]>(data?.includes || []);

  const { data: brands } = useListBrandsQuery({
    limit: 100,
    page: 1,
    search: "",
  });
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
      {/* Brand */}
      <div>
        <label htmlFor="brand_id" className="label">
          <span className="label-text text-slate-800">Brands</span>
        </label>
        <select
          id="brand_id"
          className={`select select-bordered w-full ${
            errors.brand_id ? "select-error" : ""
          }`}
          {...register("brand_id")}
        >
          <option value="">Select brand</option>
          {brands?.data.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.brand_name}
            </option>
          ))}
        </select>
        {errors.brand_id && (
          <span className="text-xs text-red-500">
            {errors.brand_id.message}
          </span>
        )}
      </div>
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
        <label htmlFor="price" className="label">
          <span className="label-text text-slate-800">Price</span>
        </label>
        <input
          type="number"
          id="price"
          className={`input input-bordered w-full ${
            errors.price ? "input-error" : ""
          }`}
          placeholder="Enter price"
          defaultValue={data?.price}
          {...register("price")}
        />
        {errors.price && (
          <span className="text-xs text-red-500">{errors.price.message}</span>
        )}
      </div>
      {/* Min Person */}
      <div>
        <label htmlFor="min_person" className="label">
          <span className="label-text text-slate-800">Min Person</span>
        </label>
        <input
          type="number"
          id="min_person"
          className={`input input-bordered w-full ${
            errors.min_person ? "input-error" : ""
          }`}
          placeholder="Enter min person"
          defaultValue={data?.min_person}
          {...register("min_person")}
        />
        {errors.min_person && (
          <span className="text-xs text-red-500">
            {errors.min_person.message}
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
            errors.max_person ? "input-error" : ""
          }`}
          placeholder="Enter max person"
          defaultValue={data?.max_person}
          {...register("max_person")}
        />
        {errors.max_person && (
          <span className="text-xs text-red-500">
            {errors.max_person.message}
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
