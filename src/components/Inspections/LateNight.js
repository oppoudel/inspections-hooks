import React, { useState, useEffect } from 'react';
import useFilteredLocations from './useFilteredLocations';
import { geoQueries } from '../../config.js';
import Box from './Box';

function LateNight({ center, handleClick, activeIndex, index }) {
  const [allNotices, setAllNotices] = useState([]);
  useEffect(() => {
    fetch(geoQueries.lateNight.url)
      .then(res => res.json())
      .then(data => {
        setAllNotices(data.features.filter(item => item.geometry));
      });
  }, []);

  const filteredFeatures = useFilteredLocations(allNotices, center);

  return (
    <Box
      title="Late Night Establishments"
      featuresInside={filteredFeatures}
      attributes={geoQueries.lateNight.attributes}
      handleClick={handleClick}
      index={index}
      activeIndex={activeIndex}
    />
  );
}

export default LateNight;
