import { Card, Drawer, Skeleton } from "@mantine/core";
import type BaseLayer from "ol/layer/Base";
import { memo } from "react";

type Props = {
  layers: BaseLayer[];
  opened: boolean;
  close: () => void;
};
export const Panel = memo((props: Props) => {
  return (
    <Drawer p={"md"} opened={props.opened} onClose={props.close}>
      {props.layers.map((layer, index) => (
        <Card key={index} shadow="xs" padding="xs" m="lg">
          <Skeleton key={index} height={100} />
        </Card>
      ))}
    </Drawer>
  );
});