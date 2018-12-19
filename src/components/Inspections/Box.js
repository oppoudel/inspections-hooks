import React, { Fragment } from "react";
import { Accordion, Icon, Grid, Segment } from "semantic-ui-react";
import { format } from "date-fns";

const entity = (key, value, properties) => {
  return (
    <div key={value}>
      {key.includes("Time")
        ? `${key}: ${format(properties[value], "MM/DD/YYYY HH:MM")}`
        : key.includes("Date")
        ? `${key}: ${format(properties[value], "MM/DD/YYYY")}`
        : `${key}: ${properties[value]}`}
    </div>
  );
};

export default props => {
  return (
    <Fragment>
      <Accordion.Title
        active={props.activeIndex === props.index}
        index={props.index}
        onClick={props.handleClick}
      >
        <Icon name="dropdown" />
        {props.title}
      </Accordion.Title>
      <Accordion.Content active={props.activeIndex === props.index}>
        {props.children}
        <Grid stackable columns={2}>
          {props.featuresInside.map(({ properties }, i) => (
            <Grid.Column key={i}>
              <Segment>
                {Object.entries(props.attributes).map(([key, value]) =>
                  entity(key, value, properties)
                )}
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </Accordion.Content>
    </Fragment>
  );
};
