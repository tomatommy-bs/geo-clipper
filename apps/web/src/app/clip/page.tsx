"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ReactCrop } from "../../lib/svg-crop";
import { Crop } from "../../lib/svg-crop/types";

export default function Page(): JSX.Element {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div>
      <input accept="image/*" onChange={onSelectFile} type="file" />
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
      >
        <img src={imgSrc} />
      </ReactCrop>
    </div>
  );
}
