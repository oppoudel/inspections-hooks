import React, { useState, useEffect } from "react";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import buffer from "@turf/buffer";
import { geoQueries } from "../../config.js";
import Box from "./Box";
import { Button, Grid } from "semantic-ui-react";

function CadCalls({ center, handleClick, activeIndex, index }) {
  const [allCalls, setAllCalls] = useState([]);
  useEffect(() => {
    fetch(geoQueries.callsForService.url)
      .then(res => res.json())
      .then(data => {
        setAllCalls(data.features.filter(item => item.geometry));
      });
  }, []);

  const [days, setdays] = useState(30);
  const [filteredCalls, setfilteredCalls] = useState([]);

  useEffect(
    () => {
      const today = new Date();
      const newDate = new Date(today.setDate(today.getDate() - days));
      const trimDate = newDate
        .toISOString()
        .substr(0, newDate.toISOString().indexOf("."));
      const { x, y } = center;
      const polygon = buffer(point([x, y]), 200, {
        units: "feet"
      });
      const features = allCalls
        .filter(feature => booleanPointInPolygon(feature, polygon))
        .filter(call => call.properties.calldatetime > trimDate);

      setfilteredCalls(features);
    },
    [days, center]
  );

  return (
    <Box
      title="Cad Calls"
      featuresInside={filteredCalls}
      attributes={geoQueries.callsForService.attributes}
      handleClick={handleClick}
      index={index}
      activeIndex={activeIndex}
    >
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column>
            <Button
              basic
              primary
              size="mini"
              style={{ marginLeft: "10px" }}
              onClick={() => setdays(30)}
              disabled={days === 30}
            >
              30 Days
            </Button>
            <Button
              basic
              primary
              size="mini"
              style={{ marginLeft: "10px" }}
              onClick={() => setdays(7)}
              disabled={days === 7}
            >
              7 Days
            </Button>
            <Button
              basic
              primary
              size="mini"
              style={{ marginLeft: "10px" }}
              onClick={() => setdays(3)}
              disabled={days === 3}
            >
              3 Days
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Box>
  );
}

export default CadCalls;
