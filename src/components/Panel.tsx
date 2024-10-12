import { Card, Drawer, Text } from "@mantine/core";
import { memo } from "react";
import type { OLLayerInterface } from "../interface/layerInterface";

type Props = {
  layers: OLLayerInterface[];
  opened: boolean;
  close: () => void;
};
export const Panel = memo((props: Props) => {
  return (
    <Drawer p={"md"} opened={props.opened} onClose={props.close}>
      {props.layers.map((layer) => (
        <Card key={layer.getID()} shadow="xs" padding="xs" m="lg">
          <Text>{layer.getID()}</Text>
          <Text>{layer.getName()}</Text>
        </Card>
      ))}
    </Drawer>
  );
});
