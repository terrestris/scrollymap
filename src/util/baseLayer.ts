import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { defaultBaseLayers } from "../constants/baseLayers";
import OSM from "ol/source/OSM";

export const getBaseLayerByName = (name: string) => {
    if (name === "osm") {
        const osmLayer = new TileLayer({
            source: new OSM()
        });
        osmLayer.set("id", "baseLayer");
        osmLayer.set("name", name);
        return osmLayer;
    };
    const layerObject = defaultBaseLayers.filter(l => l.name === name)[0];
    const olLayerObject = new TileLayer({
        source: new TileWMS({
            url: layerObject.url,
            params: {
                LAYERS: layerObject.layers,
                version: layerObject.version,
            },
            attributions: layerObject.attributions
        })
    });
    olLayerObject.set("id", "baseLayer");
    olLayerObject.set("name", name);
    return olLayerObject;
};
