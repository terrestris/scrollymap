<script lang="ts">
    import { step } from "./store/step";
    // OpenLayers
    import Map from "ol/Map";
    import TileLayer from "ol/layer/Tile";
    import View from "ol/View";
    import TileWMS from "ol/source/TileWMS";
    // Utils
    import { initTopicLayer, updateTopicLayer } from "./util/topicLayer";
    import { initHighlightLayer, updateHighlightLayer } from "./util/highlightLayer";
    import { updateView } from "./util/mapViewUtil";

    // Exports
    let mapId: number = 20;
    export let config;

    // Local state
    let map = null;
    let topicLayer;
    let highlightLayer;

    // functions
    const setupMap = (node) => {
        const baseLayer = new TileLayer({
            source: new TileWMS({
                url: "https://ows.terrestris.de/osm/service",
                params: {
                    LAYERS: "Dark",
                    version: "1.3.0",
                },
            }),
        });
        map = new Map({
            controls: [],
            target: node.id,
            layers: [baseLayer],
            view: new View({
                center: [3668138, -121358],
                zoom: 8,
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
            if (config.steps.some(s => s.topicLayer)) {
                topicLayer = initTopicLayer();
                map.addLayer(topicLayer);
            }
            if (config.steps.some(s => s.highlight)) {
                highlightLayer = initHighlightLayer();
                map.addLayer(highlightLayer);
            }
        }
    }
    step.subscribe((stepValue) => {
        console.log(stepValue);
        if (stepValue && map) {
            const currentConfig = config.steps[stepValue];
            updateView(currentConfig, map.getView());

            if (currentConfig.topicLayer) {
                updateTopicLayer(currentConfig.topicLayer, topicLayer);
                topicLayer.setVisible(true);
            }
            else {
                topicLayer.setVisible(false);
            }
            if (currentConfig.highlight) {
                updateHighlightLayer(currentConfig.highlight, highlightLayer);
                highlightLayer.setVisible(true);
            }
            else {
                highlightLayer.setVisible(false);
            }
        }
        // if (stepValue == 0 && map) {
        //     const currentConfig = config.steps[stepValue];
        //     updateView(currentConfig, map.getView());

        //     highlightLayer?.setVisible(false);
        //     topicLayer?.setVisible(false);
        // }
        // if (stepValue == 1 && map) {
        //     const currentConfig = config.steps[stepValue];
        //     updateView(currentConfig, map.getView());

        //     if (currentConfig.topicLayer) {
        //         updateTopicLayer(currentConfig.topicLayer, topicLayer);
        //         topicLayer.setVisible(true);
        //     }

        //     if (currentConfig && currentConfig.highlight) {
        //         updateHighlightLayer(currentConfig.highlight, highlightLayer);
        //         highlightLayer.setVisible(true);
        //     }
        // }
        // if (stepValue == 2 && map) {
        //     const currentConfig = config.steps[stepValue];
        //     updateView(currentConfig, map.getView());

        //     if (currentConfig.topicLayer && currentConfig.topicLayer.time) {
        //         updateTopicLayer(currentConfig.topicLayer, topicLayer);
        //         topicLayer.setVisible(true);
        //     }

        //     if (currentConfig && currentConfig.highlight) {
        //         updateHighlightLayer(currentConfig.highlight, highlightLayer);
        //         highlightLayer.setVisible(true);
        //     }
        // }
        // if (stepValue == 3 && map) {
        //     const currentConfig = config.steps[stepValue];
        //     updateView(currentConfig, map.getView());

        //     if (currentConfig.topicLayer && currentConfig.topicLayer.time) {
        //         updateTopicLayer(currentConfig.topicLayer, topicLayer);
        //         topicLayer.setVisible(true);
        //     }

        //     if (currentConfig && currentConfig.highlight) {
        //         updateHighlightLayer(currentConfig.highlight, highlightLayer);
        //         highlightLayer.setVisible(true);
        //     }
        // }

    });
</script>

<div id={mapId} class="map" use:setupMap />

<style>
    .map {
        width: 100%;
        height: 800px;
    }
</style>
