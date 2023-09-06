import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";

export const updateTopicLayer = (config, topicLayer) => {
    const params = topicLayer.getSource().getParams();
    params.LAYERS = config.layers;
    params.time = config.time;
    params.version = "1.3.0";
    topicLayer.getSource().setUrl(config.url);
    topicLayer.getSource().updateParams(params);
}
export const initTopicLayer = () => {
    return new TileLayer({
        properties: {
            name: "topicLayer",
        },
        source: new TileWMS(),
        visible: false,
    });
};
