import React, { useState, useEffect } from "react";
import useFilteredLocations from "./useFilteredLocations";
import { geoQueries } from "../../config.js";
import Box from "./Box";

function OpenNotices({ center, handleClick, activeIndex, index }) {
  const [allNotices, setAllNotices] = useState([]);
  useEffect(() => {
    fetch(geoQueries.openNotices.url)
      .then(res => res.json())
      .then(data => {
        setAllNotices(data.features.filter(item => item.geometry));
      });
  }, []);

  const filteredFeatures = useFilteredLocations(allNotices, center);

  return (
    <Box
      title="Housing Open Notices"
      featuresInside={filteredFeatures}
      attributes={geoQueries.openNotices.attributes}
      handleClick={handleClick}
      index={index}
      activeIndex={activeIndex}
    />
  );
}

export default OpenNotices;
