import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface MultipleImageFormProps {
  images: string[];
  desc: string;
}

const MultipleImageForm: React.FC<MultipleImageFormProps> = ({
  images,
  desc,
}: MultipleImageFormProps) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // Initialize with an empty array
  const [dataImages, setDataImages] = useState<string[]>(images); // Start with the passed images
  const [fileData, setFileData] = useState<File[]>([]); // Initialize with an empty array

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    fileData.forEach((file) => {
      formData.append("images[]", file);
    });
    formData.append("description", desc);

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully!");
      } else {
        console.error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <h2>Image Previews</h2>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select images</p>
      </div>

      {filePreviews.length > 0 && (
        <div className="image-previews">
          {filePreviews.map((preview, index) => (
            <div key={index} className="preview-container">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="preview-img"
              />
            </div>
          ))}
        </div>
      )}

      {dataImages.length > 0 && (
        <div className="existing-images">
          <h3>Existing Images</h3>
          {dataImages.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image}
                alt={`Existing Image ${index}`}
                className="existing-image"
              />
            </div>
          ))}
        </div>
      )}

      <div className="description">
        <h3>Description</h3>
        <p>{desc}</p>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MultipleImageForm;
