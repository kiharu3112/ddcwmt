import {
  Button,
  Card,
  Drawer,
  Flex,
  Slider,
  Switch,
  Text,
  NativeSelect,
  Divider,
} from "@mantine/core";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconWriting,
} from "@tabler/icons-react";
import { memo } from "react";
import type { OLLayerInterface } from "../interface/layerInterface";

type Props = {
  layers: OLLayerInterface[];
  opened: boolean;
  close: () => void;
  setLayers: (layers: OLLayerInterface[]) => void;
  drawingMethod: "2D" | "3D";
  setDrawingMethod: (method: "2D" | "3D") => void;
};
export const Panel = memo((props: Props) => {
  const upIcon = <IconArrowNarrowUp size={24} />;
  const downIcon = <IconArrowNarrowDown size={24} />;
  const changeLayerOrder = (index: number, direction: "up" | "down") => {
    const newLayers = [...props.layers];
    if (direction === "up") {
      if (index < 0) return;
      newLayers[index] = props.layers[index - 1];
      newLayers[index - 1] = props.layers[index];
    } else {
      newLayers[index] = props.layers[index + 1];
      newLayers[index + 1] = props.layers[index];
    }
    console.log(newLayers);
    props.setLayers(newLayers);
  };
  const toggleLayerVisibility = (index: number) => {
    const newLayers = [...props.layers];
    const layer = newLayers[index];
    layer.setVisible(!layer.getVisible());
    props.setLayers(newLayers);
  };
  const toggleLayerOpacity = (index: number, opacity: number) => {
    const newLayers = [...props.layers];
    const layer = newLayers[index];
    layer.setOpacity(opacity);
    props.setLayers(newLayers);
  };
  return (
    <Drawer p={"md"} opened={props.opened} onClose={props.close}>
      <Text pl="lg" pr="xs">レイヤー</Text>
      {props.layers.map((layer, index) => (
        <Card key={layer.getID()} shadow="xs" padding="xs" m="lg">
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Switch
                size="sm"
                onLabel="ON"
                offLabel="OFF"
                checked={layer.getVisible()}
                onChange={() => toggleLayerVisibility(index)}
              />
              <Text p={"sm"}>{layer.getID()}</Text>
              <Text>{layer.getName()}</Text>
            </Flex>
            <Flex>
              {index > 0 && (
                <Button
                  leftSection={upIcon}
                  style={{ alignContent: "center" }}
                  variant="outline"
                  p={"xs"}
                  onClick={() => changeLayerOrder(index, "up")}
                >
                  up
                </Button>
              )}
              {index < props.layers.length - 1 && (
                <Button
                  leftSection={downIcon}
                  style={{ alignContent: "center" }}
                  variant="outline"
                  p={"xs"}
                  ml={"sm"}
                  onClick={() => changeLayerOrder(index, "down")}
                >
                  down
                </Button>
              )}
            </Flex>
          </Flex>
          <Flex w={"100%"} align={"center"}>
            <Text w={"4rem"}>透明度</Text>
            <Slider
              color="blue"
              value={layer.getOpacity()}
              onChange={(v) => toggleLayerOpacity(index, v)}
              w={"100%"}
              max={1.0}
              min={0.0}
            />
          </Flex>
        </Card>
      ))}
      <Divider m="md" w="23rem" size="xs"/>
      <NativeSelect
        leftSection={<IconWriting size={24} />}
        leftSectionPointerEvents="none"
        label="描画方法"
        data={["2D", "3D"]}
        value={props.drawingMethod}
        onChange={(e) =>
          props.setDrawingMethod(e.currentTarget.value as "2D" | "3D")
        }
        m={"lg"}
      />
    </Drawer>
  );
});
