import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  useUploadImagesTourPackageForm,
  useDeleteImageTourPackage,
} from "../../../../hooks/package-tour";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../../../store";

interface MultipleImageFormProps {
  images?: string[];
  id: string;
  refetch?: () => void;
}

const MultipleImageForm: React.FC<MultipleImageFormProps> = ({
  id,
  images,
  refetch,
}: MultipleImageFormProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [filePreviews, setFilePreviews] = useState<string[]>(images || []);
  const [fileData, setFileData] = useState<File[]>([]);
  const [hovered, setHovered] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    setFileData((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { onSubmit } = useUploadImagesTourPackageForm(refetch);
  const { onDelete, isLoading } = useDeleteImageTourPackage(refetch!);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const [index, setIndex] = useState<number | null>(null);

  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };

  const handleDelete = (index: number) => {
    setZoomedImage(null);
    const indexPreview = filePreviews.length - 1;
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    if (!filePreviews[index].startsWith("blob")) {
      onDelete({
        id: id,
        imagePath: filePreviews[index],
      });
    } else {
      const newIndex = indexPreview - index;
      setFileData((prev) => prev.filter((_, i) => i !== newIndex));
      toast.success("Image deleted successfully");
    }
  };

  const handleSubmit = () => {
    if (fileData.length === 0) {
      navigate("/admin/tour-package");
      toast.success("Changes saved successfully");
      return;
    }

    const formData = new FormData();
    fileData.forEach((file) => {
      formData.append("images", file);
    });
    onSubmit({
      id: id,
      images: fileData,
      access_token: accessToken!,
    });
  };

  return (
    <>
      <div className="pt-4 px-6 pb-8">
        <div className="image-previews p-2 bg-gray-100 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center">
            {filePreviews.map((preview, index) => (
              <div
                key={index}
                className="preview-container flex flex-col items-center justify-center"
              >
                <img
                  src={
                    preview.startsWith("image")
                      ? `${process.env.REACT_APP_REST_HOST}/public/tour-images/${preview}`
                      : preview
                  }
                  alt={`Preview ${index}`}
                  className="preview-img border-2 border-gray-300 rounded-lg border-dashed p-2 max-h-64 cursor-pointer"
                  onClick={() => {
                    handleZoom(preview);
                    setIndex(index);
                  }}
                />
              </div>
            ))}
            <label className="form-control w-full">
              <div
                {...getRootProps()}
                className={`w-full min-h-64 p-4 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  isDragActive
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                } ${hovered ? "bg-gray-100" : ""}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <input {...getInputProps()} />
                <p className="text-center text-slate-500">
                  {isDragActive
                    ? "Drop the image here to input"
                    : "Drag & drop images here or click to select images (The first image will be used as thumbnail)"}
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="text-end mt-10">
          <button className="btn btn-success text-white" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-transparent p-6 rounded-lg flex flex-col items-center">
            <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            <p className="mt-4 text-blue-700">Processing...</p>
          </div>
        </div>
      )}
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
                  zoomedImage.startsWith("image")
                    ? `${process.env.REACT_APP_REST_HOST}/public/tour-images/${zoomedImage}`
                    : zoomedImage
                }
                alt="Zoomed"
                className="max-w-screen-xl w-full max-h-[80vh] object-contain"
              />

              <div className=" flex justify-center gap-4 items-center w-full h-1">
                <button
                  className="  bottom-1 relative btn btn-sm border-none bg-rose-600 hover:bg-rose-700 text-white mt-2"
                  onClick={() => handleDelete(index!)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MultipleImageForm;
