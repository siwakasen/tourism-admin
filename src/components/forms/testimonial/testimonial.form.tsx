import {
  BodyTestimonialReqI,
  Testimonial,
} from "../../../__interface/testi.interface";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useState } from "react";
import { useCreateUpdateTesimonialsForm } from "../../../_hooks/testimonials";
import { useAppSelector } from "../../../store";
import { VITE_APP_REST_TESTI } from "../../../_constants/constant";

interface TestimonialFormProps {
  data: Testimonial | null;
  title: string;
  route: string;
  refetch?: () => void;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  data,
  title,
  route,
}: TestimonialFormProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  const {
    onSubmit,
    formState: { errors },
    handleSubmit,
    register,
  } = useCreateUpdateTesimonialsForm(
    {
      name: data?.name || "",
      message: data?.message || "",
      country: data?.country || "",
    },
    data
  );
  const [filePreview, setFilePreview] = useState<string>(data?.image || "");
  const [fileData, setFileData] = useState<File | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileData(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };
  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };
  return (
    <>
      <div className=" h-full p-10">
        <h1 className="text-xl font-bold text-slate-700">
          <div className="relative inline-block group">
            <Link to={route} className="inline-block pr-3">
              <IoChevronBack className="inline-block" size={"32px"} />
            </Link>
            <span className="absolute left-8 top-8 transform -translate-y-1/2 text-sm text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Back
            </span>
          </div>
          {title}
        </h1>
        <div>
          <form
            onSubmit={handleSubmit((formData: BodyTestimonialReqI) => {
              onSubmit({
                ...formData,
                image: fileData || undefined,
                access_token: accessToken!,
              });
            })}
            className="grid grid-cols-2 gap-4 rounded-lg bg-white pt-4 px-4 pb-8"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text text-slate-800">Name</span>
              </label>
              <input
                type="text"
                id="name"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Enter Name"
                {...register("name", { required: "Name is required" })}
                defaultValue={data?.name || ""}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="label">
                <span className="label-text text-slate-800">Country</span>
              </label>
              <input
                type="text"
                id="country"
                className={`input input-bordered w-full ${
                  errors.country ? "input-error" : ""
                }`}
                placeholder="Enter Country"
                {...register("country", { required: "Country is required" })}
                defaultValue={data?.country || ""}
              />
              {errors.country && (
                <span className="text-xs text-red-500">
                  {errors.country.message}
                </span>
              )}
            </div>

            <div className="col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">Description</span>
                </div>
                <textarea
                  {...register("message")}
                  placeholder="Put the message"
                  className={`textarea textarea-bordered w-full ${
                    errors.message ? "textarea-error" : ""
                  }`}
                  rows={4}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </label>
            </div>
            <div className="col-span-2">
              <div className="pt-4 px-6 pb-8">
                <div className="image-previews p-2 bg-gray-100 rounded-lg">
                  <div className="grid grid-cols-2 p-4 justify-between">
                    <label className="form-control h-full w-full ">
                      <input
                        type="file"
                        className="file-input max-w-xs"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="gap-2 flex p-4">
                    {filePreview && (
                      <div className="preview-container relative">
                        <img
                          src={
                            filePreview.startsWith("image")
                              ? `${VITE_APP_REST_TESTI}/public/testimonials-images/${filePreview}`
                              : filePreview
                          }
                          alt="Preview"
                          className="preview-img w-full border-2 border-gray-300 rounded-lg border-dashed p-2 max-h-[48vh] cursor-pointer"
                          onClick={() => handleZoom(filePreview)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Zoom Modal */}
              {zoomedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                  <div className="bg-white rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 btn btn-sm bg-slate-700 hover:bg-slate-800 border-none btn-circle text-white z-40"
                      onClick={() => setZoomedImage(null)}
                    >
                      X
                    </button>
                    <div className="flex items-center flex-col justify-center z-10">
                      <img
                        src={
                          filePreview.startsWith("image")
                            ? `${VITE_APP_REST_TESTI}/public/testimonials-images/${filePreview}`
                            : filePreview
                        }
                        alt="Zoomed"
                        className="max-w-screen-xl w-full max-h-[80vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
