import { AppShell, Burger, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map from "ol/Map.js";
import View from "ol/View.js";
import { getTopLeft, getWidth } from "ol/extent.js";
import { get as getProjection } from "ol/proj.js";
import { WMTS } from "ol/source";
import OSM from "ol/source/OSM.js";
import Stroke from "ol/style/Stroke";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { memo, useEffect, useRef, useState } from "react";
import { Panel } from "./components/Panel";
import type { OLLayerInterface } from "./interface/layerInterface";
import { OLGraticule } from "./layer/OLGraticule";
import { OLTile } from "./layer/OLTile";
import { IconBrandGithub } from "@tabler/icons-react";
// @ts-ignore
import OLCesium from "olcs/OLCesium";
export const App = memo(() => {
  const [opened, { open, close }] = useDisclosure();
  const [layers, setLayers] = useState<OLLayerInterface[]>([]);
  const [viewState, setViewState] = useState<View>(
    new View({ center: [0, 0], zoom: 0, projection: "EPSG:3857" })
  );
  const [drawingMethod, setDrawingMethod] = useState<"2D" | "3D">("2D");
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const projection = getProjection("EPSG:3857");
    if (!projection) return;
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);
    for (let z = 0; z < 19; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = size / 2 ** z;
      matrixIds[z] = z;
    }
    const osmLayer = new OLTile({
      layerID: 1,
      opacity: 1,
      source: new OSM({ wrapX: false }),
      name: "OSM",
    });
    const wmts = new OLTile({
      name: "WMTS",
      layerID: 3,
      opacity: 1,
      source: new WMTS({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: "https://mrdata.usgs.gov/mapcache/wmts",
        layer: "sgmc2",
        matrixSet: "GoogleMapsCompatible",
        format: "image/png",
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        style: "default",
        wrapX: false,
      }),
    });
    const graticule = new OLGraticule({
      layerID: 2,
      strokeStyle: new Stroke({
        color: "rgba(255,120,0,0.9)",
        width: 2,
        lineDash: [0.5, 4],
      }),
      showLabels: true,
      wrapX: false,
      name: "Graticule",
    });
    setLayers([osmLayer, wmts, graticule]);
  }, []);
  useEffect(() => {
    if (!mapRef.current || layers.length === 0) return; // mapRef.currentがnullまたはlayersが空の場合は何もしない
    const map = new Map({
      target: mapRef.current,
      layers: layers,
      view: viewState,
    });
    if (drawingMethod === "3D") {
      const ol3d = new OLCesium({ map: map });
      ol3d.setEnabled(true);
    }
    const handleViewChange = () => {
      setViewState(viewState);
    };
    viewState.on("change", handleViewChange);

    return () => {
      map.setTarget(undefined);
      viewState.un("change", handleViewChange);
    };
  }, [layers, viewState, drawingMethod]);
  return (
    <>
      <AppShell
        header={{ height: 50 }}
        padding="md"
        style={{ width: "100vw", height: "100vh" }}
      >
        <AppShell.Header style={{ alignContent: "center" }}>
          <Flex align={"center"} justify={"space-between"}>
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
            <a
              href="https://github.com/kiharu3112/ddcwmt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#000" }}
            >
              <IconBrandGithub size={35} style={{ marginRight: "10px" }} />
            </a>
          </Flex>
        </AppShell.Header>
        <Panel
          layers={layers}
          opened={opened}
          close={close}
          setLayers={setLayers}
          drawingMethod={drawingMethod}
          setDrawingMethod={setDrawingMethod}
        />
        <AppShell.Main style={{ width: "auto", height: "100%" }} p={0}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </AppShell.Main>
      </AppShell>
    </>
  );
});
