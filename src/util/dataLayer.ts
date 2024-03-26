import OlVectorLayer from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";
import Circle from "ol/style/Circle";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import GeoJSON from "ol/format/GeoJSON";

const styleCache = [];

export const updateDataLayer = (config, dataLayer) => {
    dataLayer.getSource().getSource().setUrl(config.dataLayer.url);
}
export const initDataLayer = () => {
    const vectorSource = new OlVectorSource({
        format: new GeoJSON()
    });

    const clusterSource = new Cluster({
        distance: 50,
        minDistance: 50,
        source: vectorSource,
    });

    const styleFunction = feature => {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new Circle({
              radius: 30,
              stroke: new Stroke({
                color: '#e59812',
                width: 2
              }),
              fill: new Fill({
                color: '#fff',
              }),
            }),
            text: new Text({
              text: size.toString(),
              font: '25px Rosario,sans-serif',
              fill: new Fill({
                color: '#e59812',
              }),
            }),
          });
          styleCache[size] = style;
        }
        return style;
    };

    return new OlVectorLayer({
        source: clusterSource,
        style: styleFunction,
        visible: false,
        properties: {
            name: "dataLayer"
        },
    });
};
