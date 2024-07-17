import React, { useEffect, useState } from "react";
import { LabelText } from "../../../../../components/General/Input";

const ImageUploader = ({ img, dispatch, id, error }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    img?.length > 0 && setImages(img);
  }, [img]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    selectedImages.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages([...images, ...selectedImages]);
          dispatch({
            type: `${id}Val`,
            payload: [...images, ...selectedImages],
          });
        }
      };

      reader.readAsDataURL(file);
    });

    // const selectedImages = Array.from(e.target.files);
    // setImages([...images, ...selectedImages]);
    // dispatch({ type: `${id}Val`, payload: [...images, ...selectedImages] });
  };

  const handleImageClick = (index) => {
    const confirmRemove = window.confirm("Do you want to remove this image?");
    if (confirmRemove) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      dispatch({ type: `${id}Val`, payload: updatedImages });
    }
  };

  return (
    <div>
      {error && <h1 className="text-red-600 p-2 animate-pulse">{error}</h1>}
      <label
        className="mb-4 flex items-center justify-center w-48 h-12 bg-blue-500 text-white font-bold rounded-md cursor-pointer"
        onClick={() => error && dispatch({ type: `${id}Err`, payload: "" })}
      >
        <span>Upload Images</span>
        <input
          id={id}
          name="images"
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </label>
      {images.length > 0 && (
        <p>
          {images.length} {images.length === 1 ? "image" : "images"} selected
        </p>
      )}

      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="w-1/4 p-2">
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`Image ${index}`}
              className="w-full cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
