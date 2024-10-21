<script lang="ts">
    import * as echarts from "echarts/core";
    import {
        TooltipComponent,
        GridComponent,
        LegendComponent,
        MarkLineComponent,
        TitleComponent,
    } from "echarts/components";
    import { BarChart } from "echarts/charts";
    import { CanvasRenderer } from "echarts/renderers";
    import { echartOption } from "../constants/chartConfig";
    // import type { EChartsOption } from "echarts"; // For typing ECharts options

    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        MarkLineComponent,
        BarChart,
        CanvasRenderer,
    ]);

    // Define type for the config prop
    interface Config {
        title: string;
        xAxisData: Array<any>;  // Define a more specific type if you know the structure
        series: Array<any>;     // Define a more specific type if you know the structure
    }

    export let config: Config;

    let option: any = { ...echartOption }; // Use EChartsOption to type the option

    let chartId: string = "";

    $: {
        if (config) {
            chartId = `chart-${config.title.split(" ")[0]}`;
        }
    }

    const setupChart = (node: HTMLElement) => {
        if (config) {
            // create chart config
            option = { ...echartOption };  // Ensure a new instance is created
            option.title = { text: config.title }; // Ensure the title is typed correctly
            option.xAxis = [];  // Ensure the xAxis is reset before pushing data

            config.xAxisData.forEach(data => {
                option.xAxis?.push(data);
            });

            option.series = [];  // Reset the series before adding data
            config.series.forEach((serie) => {
                option.series?.push({
                    ...serie,
                    type: "bar",
                    emphasis: {
                        focus: "series",
                    },
                });
            });

            // init chart
            const echart = echarts.init(node);
            // apply chart option
            echart && option && echart.setOption(option);
        }
    };
</script>

<div id={chartId} class="chart" use:setupChart>chart</div>

<style>
    .chart {
        width: 28vw;
        height: 800px;
    }
</style>
