type WMTSProps = {
  layerID: number;
};

export class OLWMTS extends WMTS implements OLLayerInterface {
  private readonly layerID: number;
  private readonly name: string;
  constructor(props: WMTSProps) {
    super({
      layer: props.layer,
      matrixSet: props.matrixSet,
      format: props.format,
      projection: props.projection,
      tileGrid: props.tileGrid,
      style: props.style,
      wrapX: props.wrapX,
      crossOrigin: props.crossOrigin,
      urls: props.urls,
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
