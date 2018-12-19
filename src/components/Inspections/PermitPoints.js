import React, { useState, useEffect } from "react";
import useFilteredLocations from "./useFilteredLocations";
import { geoQueries } from "../../config.js";
import Box from "./Box";

function PermitPoints({ center, handleClick, activeIndex, index }) {
  const [allPermits, setAllPermits] = useState([]);
  useEffect(() => {
    fetch(geoQueries.permitPoints.url)
      .then(res => res.json())
      .then(data => {
        setAllPermits(data.features.filter(item => item.geometry));
      });
  }, []);

  const filteredFeatures = useFilteredLocations(allPermits, center);

  return (
    <Box
      title="Housing Permits"
      featuresInside={filteredFeatures}
      attributes={geoQueries.permitPoints.attributes}
      handleClick={handleClick}
      index={index}
      activeIndex={activeIndex}
    />
  );
}

export default PermitPoints;
