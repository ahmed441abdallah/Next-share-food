"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const ImagePicker = () => {
  const imageInputRef = useRef();
  const [image, setImage] = useState("");
  const handleImagePick = () => {
    imageInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div>
      <div className=" hidden">
        <label htmlFor="image">Image </label>
        <input
          type="file"
          id="image"
          name="image"
          required
          accept="image/png , image/jpeg"
          ref={imageInputRef}
          onChange={handleImageChange}
        />
      </div>
      <button
        className="  m-2 px-4 py-2 bg-gray-800"
        type="button"
        onClick={handleImagePick}
      >
        Pick An image
      </button>
      {image ? (
        <Image
          src={image}
          width={200}
          height={200}
          className=" rounded-md"
        ></Image>
      ) : (
        <p>No image picked</p>
      )}{" "}
    </div>
  );
};

export default ImagePicker;
