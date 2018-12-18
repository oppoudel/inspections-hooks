import React, { useState, useEffect } from "react";
import useFilteredLocations from "./useFilteredLocations";
import { geoQueries } from "../../config.js";
import Box from "./Box";

function CadCalls({ center, handleClick, activeIndex }) {
  const [allCalls, setAllCalls] = useState([]);
  useEffect(() => {
    fetch(geoQueries.callsForService.url)
      .then(res => res.json())
      .then(data => {
        setAllCalls(data.features.filter(item => item.geometry));
      });
  }, []);

  const filteredFeatures = useFilteredLocations(allCalls, center);

  return (
    <Box
      title="Cad Calls"
      featuresInside={filteredFeatures}
      attributes={geoQueries.callsForService.attributes}
      handleClick={handleClick}
      index={1}
      activeIndex={activeIndex}
    />
  );
}

export default CadCalls;
