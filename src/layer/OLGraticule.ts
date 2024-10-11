import { Graticule } from "ol";
import type Stroke from "ol/style/Stroke";

type GraticuleProps = {
  layerID: number;
  strokeStyle: Stroke;
  showLabels: boolean;
  wrapX: boolean;
};
export class OLGraticule extends Graticule {
  private readonly layerID: number;
  constructor(props: GraticuleProps) {
    super({
      showLabels: props.showLabels,
      wrapX: props.wrapX,
      strokeStyle: props.strokeStyle,
    });
    this.layerID = props.layerID;
  }
  getID() {
    return this.layerID;
  }
}