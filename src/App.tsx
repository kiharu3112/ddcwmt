import "./App.css";
import { Graticule } from "ol";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map from "ol/Map.js";
import View from "ol/View.js";
import type BaseLayer from "ol/layer/Base";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import Stroke from "ol/style/Stroke";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const layers: BaseLayer[] = [];
    const osmLayer = new TileLayer({
      preload: Number.POSITIVE_INFINITY,
      source: new OSM(),
    });
    layers.push(osmLayer);
    const graticule = new Graticule({
      strokeStyle: new Stroke({
        color: "rgba(255,120,0,0.9)",
        width: 2,
        lineDash: [0.5, 4],
      }),
      showLabels: true,
      wrapX: false,
    });
    layers.push(graticule);
    const map = new Map({
      target: "map",
      layers: layers,
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(undefined);
  });

  return (
    <div
      style={{ height: "1000px", width: "1280px" }}
      id="map"
      className="map-container"
    />
  );
};
