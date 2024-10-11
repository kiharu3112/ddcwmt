import { AppShell, Burger, Drawer, Group, Skeleton } from "@mantine/core";
import { Graticule } from "ol";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map from "ol/Map.js";
import View from "ol/View.js";
import { useDisclosure } from "@mantine/hooks";
import type BaseLayer from "ol/layer/Base";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import Stroke from "ol/style/Stroke";
import { memo, useEffect, useRef, useState } from "react";
import { Panel } from "./components/Panel";
import { OLGraticule } from "./layer/OLGraticule";

export const App = memo(() => {
  const [opened, { open, close }] = useDisclosure();
  const [layers, setLayers] = useState<BaseLayer[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    const graticule = new OLGraticule({
      layerID: 1,
      strokeStyle: new Stroke({
        color: "rgba(255,120,0,0.9)",
        width: 2,
        lineDash: [0.5, 4],
      }),
      showLabels: true,
      wrapX: true,
    });
    setLayers([osmLayer, graticule]);
  }, []);

  useEffect(() => {
    if (!mapRef.current || layers.length === 0) return; // mapRef.currentがnullまたはlayersが空の場合は何もしない

    const map = new Map({
      target: mapRef.current,
      layers: layers,
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(undefined);
  }, [layers]);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        padding="md"
        style={{ width: "100vw", height: "100vh" }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={!opened ? open : close}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={opened}
              onClick={!opened ? open : close}
              visibleFrom="sm"
              size="sm"
            />{" "}
            DDCWMT
          </Group>
        </AppShell.Header>
        <Panel layers={layers} opened={opened} close={close} />
        <AppShell.Main style={{ width: "auto", height: "100%" }} p={0}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </AppShell.Main>
      </AppShell>
    </>
  );
});