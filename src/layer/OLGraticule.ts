import { Graticule } from "ol";
import type Stroke from "ol/style/Stroke";
import type { OLLayerInterface } from "../interface/layerInterface";

type GraticuleProps = {
  layerID: number;
  strokeStyle: Stroke;
  showLabels: boolean;
  wrapX: boolean;
  name: string;
};
export class OLGraticule extends Graticule implements OLLayerInterface {
  private readonly layerID: number;
  private readonly name: string;
  constructor(props: GraticuleProps) {
    super({
      showLabels: props.showLabels,
      wrapX: props.wrapX,
      strokeStyle: props.strokeStyle,
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
