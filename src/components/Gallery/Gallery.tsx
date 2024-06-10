"use client";
import { CircleX } from "lucide-react";
import { useRef, useState } from "react";

import Photo from "./Photo";
import { useTranslations } from "next-intl";
import ThumbnailCarousel from "../ThumbnailCarousel/ThumbnailCarousel";
import { ImageType } from "~/lib/types";

export function Gallery({ images }: { images: ImageType[] }) {
  const t = useTranslations("gallery");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null|undefined>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onSelect = (index:number) => {
    setSelectedImageIndex(index);
    dialogRef.current && dialogRef.current.showModal();
    document.body.classList.add("prevent-scroll");
  };

  const onClose = () => {
    setSelectedImageIndex(null);
    dialogRef.current && dialogRef.current.close();
    document.body.classList.remove("prevent-scroll");
  };

  const thumbnails = images.map((image) => ({
    id: image.id,
    image: image.image,
    title: image.description,
    alt: image.description,
  }));

  return (
    <section className="my-4 content-container bg-white">
      <h2 className="heading spcae-y-2">{t("heading")}</h2>
      <hr />
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {images.map((image,index) => (
          <Photo
            key={image.id}
            url={image.image}
            alt={image.description}
            callback={() => onSelect(index)}
          />
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="w-[100%] h-[100%] md:w-[90%] p-2 md:p-15 bg-gray-100 rounded-xl eventdialog overflow-hidden"
        onClick={onClose}
      >
        <div className="w-full h-full mt-12 md:mt-1" onClick={(e) => e.stopPropagation()}>
          {selectedImageIndex!=null && (
            <ThumbnailCarousel
              thumbnails={thumbnails}
              initialIndex={selectedImageIndex}
              onThumbnailClick={onSelect}
            />
          )}
          <form method="dialog" className="absolute top-0 right-0 z-10">
            <button className="m-4" onClick={onClose}>
              <CircleX className="text-black" size={32} />
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
}

