import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";

const defaultBaseLayers = [
    {
        type: "wms",
        name: "sentinel-rgb",
        url: "http://localhost:8080/service",
        layers: "sentinel",
        version: "1.3.0",
        attributions: "mundialis - Contains modified Copernicus Sentinel data (2015-2017)/ESA"
    },
    {
        type: "wms",
        name: "sentinel-comp",
        url: "http://localhost:8080/service",
        layers: "sentinel_comp",
        version: "1.3.0",
        attributions: "mundialis - Contains modified Copernicus Sentinel data (2015-2017)/ESA"
    }
];

export const getBaseLayerByName = (name) => {
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
