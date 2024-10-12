import TileLayer from "ol/layer/Tile";
import type TileSource from "ol/source/Tile";
import type { OLLayerInterface } from "../interface/layerInterface";

export type OLTileProps = {
  layerID: number;
  opacity: number;
  source: TileSource;
  name: string;
};
export class OLTile extends TileLayer implements OLLayerInterface {
  private readonly layerID: number;
  private readonly name: string;
  constructor(props: OLTileProps) {
    super({
      source: props.source,
      opacity: props.opacity,
    });
    this.layerID = props.layerID;
    this.name = props.name;
  }
  getID() {
    return this.layerID;
  }
  getName(): string {
    return this.name;
  }
}
