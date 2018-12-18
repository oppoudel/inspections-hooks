import { useGeoPosition } from "the-platform";
import { useEffect } from "react";

export default function LocationTracker({ updateXY }) {
  const {
    coords: { latitude, longitude }
  } = useGeoPosition();
  useEffect(() => {
    updateXY(longitude, latitude);
  }, []);
  return null;
}
