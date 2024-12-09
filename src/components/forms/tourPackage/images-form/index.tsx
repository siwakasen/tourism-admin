import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface MultipleImageFormProps {
  images: string[];
}

const MultipleImageForm: React.FC<MultipleImageFormProps> = ({
  images,
}: MultipleImageFormProps) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // Initialize with an empty array
  const [dataImages, setDataImages] = useState<string[]>(images); // Start with the passed images
  const [fileData, setFileData] = useState<File[]>([]); // Initialize with an empty array
  const [hovered, setHovered] = useState(false); // State to track hover

  const onDrop = (acceptedFiles: File[]) => {
    // Create preview URLs for the new files
    const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));

    // Add the new previews to the existing ones
    setFilePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);

    // Add the new files to the existing ones
    setFileData((prevFiles) => [...prevFiles, ...acceptedFiles]);

    // Add the new image names to the existing ones
    const newImages = acceptedFiles.map((file) => file.name);
    setDataImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleSubmit = () => {
    console.log(fileData);
    console.log(dataImages);
  };

  return (
    <>
      <div className="pt-4 px-6 pb-8">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Images</span>
          </div>
          <div
            {...getRootProps()}
            className={`w-full h-52 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all
              ${
                isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }
              ${hovered ? "bg-gray-100" : ""}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <input {...getInputProps()} />
            <p>
              {isDragActive
                ? "Drop the image here to input"
                : "Drag & drop images here or click to select images (The first image will be used as thumbnail)"}
            </p>
          </div>
        </label>
        <div className="my-4">
          {filePreviews.length > 0 && (
            <div className="image-previews grid grid-cols-3 gap-2 p-2 bg-gray-100 rounded-lg ">
              {filePreviews.map((preview, index) => (
                <div key={index} className="preview-container ">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="preview-img border-2 border-gray-300 rounded-lg border-dashed p-2 max-h-64"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-end mt-10">
          <button className="btn btn-success text-white" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default MultipleImageForm;
