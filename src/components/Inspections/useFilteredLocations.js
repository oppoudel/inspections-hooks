import { useState, useEffect } from "react";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import buffer from "@turf/buffer";

export default function useFilteredLocations(allFeatures, center) {
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  useEffect(
    () => {
      const { x, y } = center;
      const polygon = buffer(point([x, y]), 200, {
        units: "feet"
      });
      const features = allFeatures.filter(feature =>
        booleanPointInPolygon(feature, polygon)
      );
      setFilteredFeatures(features);
    },
    [center]
  );
  return filteredFeatures;
}
