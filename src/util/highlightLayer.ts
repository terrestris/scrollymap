import OlVectorLayer from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import OlFeature from "ol/Feature";
import OlPoint from "ol/geom/Point";

import { buffer } from "ol/extent";
import { fromExtent } from "ol/geom/Polygon";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";

export const updateHighlightLayer = (config: any, highlightLayer: any) => {
    const geom = new OlPoint(config.coordinates);
    const bufferExtent = buffer(geom.getExtent(), 5000);
    const polygon = fromExtent(bufferExtent);
    const feature = highlightLayer.getSource()?.getFeatures()[0];
    feature.setGeometry(polygon);
    // styling
    const styles = [
        new Style({
            stroke: new Stroke({
                color: config.strokeColor,
                width: config.strokeWidth,
            }),
            fill: new Fill({
                color: "rgba(0, 0, 255, 0.1)",
            }),
            text: new Text({
                text: config.name,
                font: '25px Rosario,sans-serif',
                fill: new Fill({
                  color: '#000',
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 4,
                }),
            })
        }),
    ];
    feature.setStyle(styles);
}
export const initHighlightLayer = () => {
    const feature = new OlFeature();
    return new OlVectorLayer({
        source: new OlVectorSource({
            features: [feature]
        }),
        visible: false,
        properties: {
            name: "highlightLayer",
        },
    });
};
