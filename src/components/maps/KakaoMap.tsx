"use client";

import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export const KakaoMapContext = createContext<kakao.maps.Map>(
  undefined as unknown as kakao.maps.Map
);

const KakaoMap = ({
  center,
  children,
}: {
  center: {
    lat: number;
    lng: number;
  };
  children?: ReactNode;
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isKakaoScriptLoadedRef = useRef(false);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    const mapElement = mapContainerRef.current;
    const isKakaoScriptLoaded = isKakaoScriptLoadedRef.current;

    if (!window.kakao) {
      console.error("Kakao Map SDK is not loaded.");
      return;
    }

    const createMap = () => {
      const lat = center.lat;
      const lng = center.lng;

      if (!mapElement) {
        console.error("mapElement is not valid");
        return;
      }

      if (!lat || !lng) {
        console.error("lat or lng is not valid");
        mapElement.style.display = "none";
        return;
      }

      const mapOptions: kakao.maps.MapOptions = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
        disableDoubleClick: true,
        disableDoubleClickZoom: true,
        draggable: false,
        scrollwheel: false,
      };
      const map = new window.kakao.maps.Map(mapElement, mapOptions);
      setKakaoMap(map);
    };

    window.kakao.maps.load(() => {
      isKakaoScriptLoadedRef.current = true;
      createMap();
    });

    if (isKakaoScriptLoaded) {
      createMap();
    }
  }, [center]);

  return (
    <>
      <div
        ref={mapContainerRef}
        id="map"
        className="w-full aspect-video rounded-lg overflow-hidden"
      />
      {kakaoMap && (
        <KakaoMapContext.Provider value={kakaoMap}>
          {children}
        </KakaoMapContext.Provider>
      )}
    </>
  );
};

export default KakaoMap;
