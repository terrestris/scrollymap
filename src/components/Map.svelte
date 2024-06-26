<script lang="ts">
    // svelte
    import { step } from "../store/step";
    // OpenLayers
    import Map from "ol/Map";
    import View from "ol/View";
    // Utils
    import { initTopicLayer, updateTopicLayer } from "../util/topicLayer";
    import {
        initHighlightLayer,
        updateHighlightLayer,
    } from "../util/highlightLayer";
    import { updateView } from "../util/mapViewUtil";
    import { initDataLayer, updateDataLayer } from "../util/dataLayer";
    import Attribution from "ol/control/Attribution";
    import type { StepConfigList } from "../types";
    import { getBaseLayerByName } from "../util/baseLayer";

    // Exports
    let mapId: string = "scrollymap-1";
    export let steps: StepConfigList;

    // Local state
    let map = null;
    let baseLayer;
    let topicLayer;
    let highlightLayer;
    let dataLayer;

    // Functions
    const setupMap = (node: HTMLElement) => {
        baseLayer = getBaseLayerByName("osm");
        map = new Map({
            controls: [
                new Attribution({
                    collapsed: false,
                }),
            ],
            interactions: [],
            target: node.id,
            layers: [baseLayer],
            view: new View({
                center: [0, 0],
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

    // init map layers
    $: {
        if (map && steps) {
            // set view from first step config
            updateView(steps[0], map.getView());
            // initialize layers
            if (steps.some((s) => s.topicLayer)) {
                topicLayer = initTopicLayer();
                map.addLayer(topicLayer);
            }
            if (steps.some((s) => s.highlight)) {
                highlightLayer = initHighlightLayer();
                map.addLayer(highlightLayer);
            }
            if (steps.some((s) => s.dataLayer)) {
                dataLayer = initDataLayer();
                map.addLayer(dataLayer);
            }
        }
    }
    // apply and render step config
    step.subscribe((stepValue) => {
        if (stepValue >= 0 && map && steps) {
            const currentConfig = steps[stepValue];
            if (!currentConfig) {
                return;
            }
            // apply baselayer
            if (
                currentConfig.baseLayer &&
                currentConfig.baseLayer !== baseLayer.get("name")
            ) {
                const newSource = getBaseLayerByName(
                    currentConfig.baseLayer,
                )?.getSource();
                const mapLayer = map
                    .getAllLayers()
                    .filter((l) => l.get("id") === "baseLayer")[0];
                mapLayer?.setSource(newSource);
                mapLayer.set("name", currentConfig.baseLayer);
            }
            // apply topicLayer
            if (currentConfig.topicLayer) {
                updateTopicLayer(currentConfig.topicLayer, topicLayer);
                topicLayer.setVisible(true);
            } else {
                topicLayer.setVisible(false);
            }
            // apply dataLayer
            if (currentConfig.dataLayer) {
                updateDataLayer(currentConfig, dataLayer);
                dataLayer.setVisible(true);
            } else if (dataLayer) {
                dataLayer.setVisible(false);
            }
            // apply highlighting
            if (currentConfig.highlight) {
                updateHighlightLayer(currentConfig.highlight, highlightLayer);
                highlightLayer.setVisible(true);
            } else if (highlightLayer) {
                highlightLayer.setVisible(false);
            }
            // apply view config
            updateView(currentConfig, map.getView());
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
