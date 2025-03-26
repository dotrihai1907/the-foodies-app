"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./image-picker.module.css";

type ImagePickerProps = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickImage, setPickImage] = useState<string>("");

  const imageInput = useRef<HTMLInputElement>(null);

  const handlePickClick = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPickImage("");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result as string;
      setPickImage(result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {pickImage ? (
            <Image src={pickImage} alt="The image selected by the user." fill />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>

        <input
          id={name}
          name={name}
          type="file"
          ref={imageInput}
          accept="image/png, image/jpeg"
          className={styles.input}
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className={styles.button}
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
