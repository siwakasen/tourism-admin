import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUploadImageCars } from "../../../../hooks/cars";

interface ImageFormProps {
  image?: string;
  id: string;
  refetch?: () => void;
}
import { carsRentalRoute } from "../../../../pages/cars-rental";
import { useAppSelector } from "../../../../store";

const ImageForm: React.FC<ImageFormProps> = ({
  image,
  id,
  refetch,
}: ImageFormProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState<string>(image || "");
  const [fileData, setFileData] = useState<File | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const { onSubmit } = useUploadImageCars(refetch);

  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileData(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!fileData) {
      navigate(carsRentalRoute);
      toast.success("Changes saved successfully");
    } else {
      onSubmit({ id, image: fileData, access_token: accessToken! });
    }
  };

  return (
    <>
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
            <div className="text-end">
              <button
                className="btn btn-md btn-success text-white"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className="gap-2 flex p-4">
            {filePreview && (
              <div className="preview-container relative">
                <img
                  src={
                    filePreview.startsWith("image")
                      ? `${process.env.REACT_APP_REST_HOST}/public/car-images/${filePreview}`
                      : filePreview
                  }
                  alt="Preview"
                  className="preview-img w-full border-2 border-gray-300 rounded-lg border-dashed p-2 max-h-[78vh] cursor-pointer"
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
                    ? `${process.env.REACT_APP_REST_HOST}/public/car-images/${filePreview}`
                    : filePreview
                }
                alt="Zoomed"
                className="max-w-screen-xl w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageForm;
