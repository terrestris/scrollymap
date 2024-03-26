export const defaultBaseLayers = [
    {
        type: "wms",
        name: "topplus-bkg",
        url: "https://sgx.geodatenzentrum.de/wms_topplus_open",
        layers: "web",
        version: "1.3.0",
        attributions: `© Bundesamt für Kartographie und Geodäsie (${new Date().getFullYear()})`
    },
    {
        type: "wms",
        name: "sen2europe",
        url: "https://sgx.geodatenzentrum.de/wms_sen2europe",
        layers: "rgb",
        version: "1.3.0",
        attributions: `© Europäische Union, enthält veränderte Copernicus Sentinel-Daten (${new Date().getFullYear()})`
    },
    {
        type: "wms",
        name: "sentinel-rgb",
        url: "https://geoserver.mundialis.de/geoserver/wms",
        layers: "sentinelMosaic:art_040302",
        version: "1.3.0",
        attributions: "mundialis - Contains modified Copernicus Sentinel data (2015-2017)/ESA"
    },
    {
        type: "wms",
        name: "sentinel-comp",
        url: "https://geoserver.mundialis.de/geoserver/wms",
        layers: "sentinel-rgbMosaic:art_8A1104",
        version: "1.3.0",
        attributions: "mundialis - Contains modified Copernicus Sentinel data (2015-2017)/ESA"
    }
];
