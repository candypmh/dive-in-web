import { useEffect, useRef, useState } from "react";

const usePhotoSlider = (photos: string[]) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const visibleImageNumber = visibleIndex + 1;

  useEffect(() => {
    const images = imageRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = images.indexOf(entry.target as HTMLDivElement);
            setVisibleIndex(index);
          }
        });
      },
      {
        root: sliderRef.current,
        threshold: 0.5,
      }
    );

    images.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      images.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [photos]);

  return { sliderRef, imageRefs, visibleIndex, visibleImageNumber };
};

export default usePhotoSlider;