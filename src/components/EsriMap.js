import { loadModules } from "esri-loader";
import React, { useEffect, useRef, useState } from "react";
import { Card, Segment, Header } from "semantic-ui-react";

const styles = {
  mapDiv: {
    height: "400px",
    width: "100",
    position: "relative"
  }
};

const options = {
  url: "https://js.arcgis.com/4.10/",
  dojoConfig: {
    has: {
      "esri-featurelayer-webgl": 1
    }
  }
};

export default function EsriMap({ center, updateXY }) {
  const viewdivRef = useRef();
  const { x, y } = center;

  const [view, setView] = useState(null);

  useEffect(() => {
    createMap();
  }, []);

  useEffect(
    () => {
      addPoint();
    },
    [center, view]
  );

  async function createMap() {
    const [MapView, Map] = await loadModules(
      ["esri/views/MapView", "esri/Map"],
      options
    );
    const webmap = new Map({
      basemap: "streets-navigation-vector"
    });
    const mapview = new MapView({
      map: webmap,
      container: viewdivRef.current,
      zoom: 16,
      center: [x, y]
    });
    setView(mapview);
    mapview.when(() => this.addPoint());
    mapview.on("click", e =>
      updateXY(e.mapPoint.longitude, e.mapPoint.latitude)
    );
    // prevents panning with the mouse drag event
    mapview.on("drag", e => e.stopPropagation());
  }

  async function addPoint() {
    const [Graphic, geometryEngine] = await loadModules(
      ["esri/Graphic", "esri/geometry/geometryEngine"],
      options
    );
    //await view.when();
    if (view) {
      view.graphics.removeAll();
      const marker = {
        type: "simple-marker",
        style: "circle",
        size: 12,
        color: [51, 176, 255],
        outline: {
          color: [0, 0, 0],
          width: 1
        }
      };
      const pointGraphic = new Graphic({
        geometry: {
          type: "point",
          x,
          y
        },
        symbol: marker
      });
      const pointBuffer = geometryEngine.geodesicBuffer(
        pointGraphic.geometry,
        200,
        "feet",
        true
      );
      const bufferGraphic = new Graphic({
        geometry: pointBuffer,
        symbol: {
          type: "simple-fill",
          outline: {
            width: 1.5,
            color: [0, 0, 0, 0.5]
          },
          style: "none"
        }
      });
      view.graphics.addMany([bufferGraphic, pointGraphic]);
      view.goTo([x, y]);
    }
  }
  return (
    <Segment>
      <Card fluid>
        <div style={styles.mapDiv} ref={viewdivRef} />
      </Card>
      <Header as="h5">Search Distance : 200ft</Header>
    </Segment>
  );
}
