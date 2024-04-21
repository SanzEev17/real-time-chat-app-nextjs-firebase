"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormImageData } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageUp } from "lucide-react";
import Image from "next/image";

const FormImage = ({
  control,
  name,
  className,
  photoURL,
  ...props
}: FormImageData) => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`space-y-0 cursor-pointer ${className}`}>
            <div
              className={`border-2 w-36 h-auto rounded-xl overflow-hidden relative`}
            >
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={imagePreview ? imagePreview : photoURL ? photoURL : ""}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (min-width: 768px) 40%"
                  quality={40}
                />
              </AspectRatio>
            </div>
          </FormLabel>
          <FormControl className="w-full">
            <Input
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              className="hidden"
              onChange={(e) => {
                const image = e.target.files;
                field.onChange(image ? image[0] : null);
                setSelectedImage(image ? image[0] : undefined);
              }}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormImage;
