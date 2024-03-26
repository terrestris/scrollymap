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

    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        MarkLineComponent,
        BarChart,
        CanvasRenderer,
    ]);

    export let config;

    let option;

    let chartId: string;

    $: {
        if (config) {
            chartId = `chart-${config.title.split(" ")[0]}`;
        }
    }

    const setupChart = (node: HTMLElement) => {
        if (config) {
            // create chart config
            option = echartOption;
            option.title.text = config.title;
            config.xAxisData.forEach(data => {
                option.xAxis.push(data);
            });
            config.series.forEach((serie) => {
                option.series.push({
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
    }
</script>

<div id={chartId} class="chart" use:setupChart >chart</div>

<style>
    .chart {
        width: 28vw;
        height: 800px;
    }
</style>
