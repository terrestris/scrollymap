<script lang="ts">
    import { step } from "./store/step";
    // OpenLayers
    import Map from "ol/Map";
    import TileLayer from "ol/layer/Tile";
    import View from "ol/View";
    import TileWMS from "ol/source/TileWMS";
    // Utils
    import { initTopicLayer, updateTopicLayer } from "./util/topicLayer";
    import {
        initHighlightLayer,
        updateHighlightLayer,
    } from "./util/highlightLayer";
    import { updateView } from "./util/mapViewUtil";
    import { initDataLayer, updateDataLayer } from "./util/dataLayer";
    import Attribution from "ol/control/Attribution";

    // Exports
    let mapId: string = "20";
    export let config;

    // Local state
    let map = null;
    let topicLayer;
    let highlightLayer;
    let dataLayer;

    // functions
    const setupMap = (node) => {
        // const baseLayer = new TileLayer({
        //     source: new TileWMS({
        //         url: "https://ows.terrestris.de/osm/service",
        //         params: {
        //             LAYERS: "Dark",
        //             version: "1.3.0",
        //         },
        //     }),
        // });
        const baseLayer = new TileLayer({
            source: new TileWMS({
                url: "http://localhost:8080/service",
                params: {
                    LAYERS: "sentinel",
                    version: "1.3.0",
                },
                attributions: "mundialis - Contains modified Copernicus Sentinel data (2015-2017)/ESA"
            }),
        });
        map = new Map({
            controls: [new Attribution({
                collapsed: false
            })],
            interactions: [],
            target: node.id,
            layers: [baseLayer],
            view: new View({
                center: [948776,7300390],
                zoom: 9,
            }),
        });
        return {
            destroy() {
                if (map) {
                    map.setTarget(null);
                    map = null;
                }
            },
        };
    };

    $: {
        if (map && config && config.steps) {
            if (config.steps.some((s) => s.topicLayer)) {
                topicLayer = initTopicLayer();
                map.addLayer(topicLayer);
            }
            if (config.steps.some((s) => s.highlight)) {
                highlightLayer = initHighlightLayer();
                map.addLayer(highlightLayer);
            }
            if (config.steps.some((s) => s.dataLayer)) {
                dataLayer = initDataLayer();
                map.addLayer(dataLayer);
            }
        }
    }
    step.subscribe((stepValue) => {
        if (stepValue >= 0 && map) {
            const currentConfig = config.steps[stepValue];
            if (!currentConfig) {
                return;
            }
            updateView(currentConfig, map.getView());

            if (currentConfig.topicLayer) {
                updateTopicLayer(currentConfig.topicLayer, topicLayer);
                topicLayer.setVisible(true);
            } else {
                topicLayer.setVisible(false);
            }
            if (currentConfig.highlight) {
                updateHighlightLayer(currentConfig.highlight, highlightLayer);
                highlightLayer.setVisible(true);
			} else {
				if (highlightLayer) {
					highlightLayer.setVisible(false);
				}
			}
            if (currentConfig.dataLayer) {
                updateDataLayer(currentConfig, dataLayer);
                dataLayer.setVisible(true);
            } else {
				if (dataLayer) {
					dataLayer.setVisible(false);
				}
			}
        }
    });
</script>

<div id={mapId} class="map" use:setupMap />

<style>
    .map {
        width: 100%;
        height: 100%;
    }
</style>
