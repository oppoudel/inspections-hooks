import React, { useState, Suspense } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Loader } from "semantic-ui-react";
import Geocoder from "./components/Geocoder/Geocoder";
import TopMenu from "./components/TopMenu";
import EsriMap from "./components/EsriMap";
import Inspections from "./components/Inspections/Inspections";
import LocationTracker from "./components/LocationTracker";

function App() {
  const [mapCenter, setMapCenter] = useState({ x: -76.6, y: 39.3 });
  const onXYupdate = (x, y) => {
    setMapCenter({ x, y });
  };
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <LocationTracker updateXY={onXYupdate} />
      </Suspense>
      <TopMenu />
      <Container style={{ marginTop: "6em" }}>
        <Geocoder updateXY={onXYupdate} />
        <EsriMap center={mapCenter} updateXY={onXYupdate} />
        <Inspections center={mapCenter} />
      </Container>
    </div>
  );
}

export default App;
