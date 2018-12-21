import React, { useState, Suspense, lazy } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Loader } from "semantic-ui-react";
import Geocoder from "./components/Geocoder/Geocoder";
import TopMenu from "./components/TopMenu";
import Inspections from "./components/Inspections/Inspections";
import LocationTracker from "./components/LocationTracker";
const EsriMap = lazy(() => import("./components/EsriMap"));

function App() {
  const [mapCenter, setMapCenter] = useState({ x: -76.6, y: 39.3 });
  const onXYupdate = (x, y) => {
    setMapCenter({ x, y });
  };
  return (
    <div>
      <TopMenu />
      <Container style={{ marginTop: "6em" }}>
        <Geocoder updateXY={onXYupdate} />
        <Suspense fallback={<Loader />}>
          <EsriMap center={mapCenter} updateXY={onXYupdate} />
        </Suspense>
        <Inspections center={mapCenter} />
      </Container>
      <Suspense fallback={<Loader />}>
        <LocationTracker updateXY={onXYupdate} />
      </Suspense>
    </div>
  );
}

export default App;
