import type BaseLayer from "ol/layer/Base";

export interface OLLayerInterface extends BaseLayer {
  getID(): number;
  getName(): string;
}
