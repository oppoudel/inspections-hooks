import React, { useState, useEffect, Fragment } from "react";
import useFilteredLocations from "./useFilteredLocations";
import { Accordion, Icon, Grid, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import { geoQueries } from "../../config.js";

function LiquorLicenses({ center, handleClick, activeIndex }) {
  const [allLicenses, setAllLicenses] = useState([]);
  useEffect(() => {
    fetch(geoQueries.liquorLicenses.url)
      .then(res => res.json())
      .then(data => {
        setAllLicenses(data.features.filter(item => item.geometry));
      });
  }, []);

  const filteredFeatures = useFilteredLocations(allLicenses, center);
  const attrByTrade = filteredFeatures.reduce((obj, feature) => {
    const tradeName = feature.properties.tradename;
    return {
      ...obj,
      [tradeName]: [...(obj[tradeName] || []), feature]
    };
  }, {});

  return (
    <Fragment>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Liquor Licenses
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Grid stackable columns={2}>
          {Object.keys(attrByTrade).map((item, i) => (
            <Grid.Column key={i}>
              <Segment.Group>
                <div style={{ padding: 10 }}>
                  <strong>{item}</strong>
                </div>
                {attrByTrade[item].map((person, i) => (
                  <Segment key={i}>
                    <div>
                      Licensee: {person.properties.licenseefirstname}{" "}
                      {person.properties.licenseelastname}
                    </div>
                    <div>
                      License End Date:{" "}
                      {format(person.properties.licenseenddate, "MM/DD/YYYY")}
                    </div>
                    <div>License Class: {person.properties.licenseclass}</div>
                  </Segment>
                ))}
              </Segment.Group>
            </Grid.Column>
          ))}
        </Grid>
      </Accordion.Content>
    </Fragment>
  );
}

export default LiquorLicenses;
