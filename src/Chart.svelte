<script lang="ts">
    import { step } from "./store/step";
    import * as echarts from "echarts/core";
    import {
        TooltipComponent,
        GridComponent,
        LegendComponent,
        MarkLineComponent,
        TitleComponent
    } from "echarts/components";
    import { BarChart } from "echarts/charts";
    import { CanvasRenderer } from "echarts/renderers";

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

    // TODO get data from config
    option = {
        title: {
            text: "Bestände von Seehunden und Kegelrobben \n (LKN-NPV 1989-2022)",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            bottom: 0,
            right: 0
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "10%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: [
                    1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
                    1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
                    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
                    2019, 2020, 2021,
                ],
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "Erwachsene Tiere",
                type: "bar",
                stack: "Robben",
                emphasis: {
                    focus: "series",
                },
                data: [
                    1630, 16315, 17994, 16249, 16049, 18479, 18073, 17848,
                    24298, 14656, 22052, 21657, 28117, 33110, 19024, 20991,
                    28381, 26979, 34201, 28855, 37156, 41277, 38757, 42089,
                    44441, 49840, 49185, 23831, 26429, 16468, 24825, 26696,
                    24440,
                ],
            },
            {
                name: "Jungtiere",
                type: "bar",
                stack: "Robben",
                emphasis: {
                    focus: "series",
                },
                data: [
                    56, 1083, 881, 1723, 1071, 1516, 1621, 989, 3517, 1173,
                    3084, 2110, 5021, 4467, 3565, 4682, 5805, 3855, 3348, 5180,
                    4716, 6757, 7772, 5848, 8100, 7503, 9115, 10134, 11736,
                    7470, 10691, 12517, 11138,
                ],
            },
        ],
    };
    step.subscribe((stepValue) => {
        if (stepValue >= 0) {
            const currentConfig = config.steps[stepValue];
            if (!currentConfig || !currentConfig.chart) {
                return;
            }
            // todo use unique id instead of class
            const chartDom: HTMLElement = document.querySelector(".chart");
            const myChart = echarts.init(chartDom);

            myChart && option && myChart.setOption(option);
        }
    });
</script>

<!-- todo use unique id -->
<div class="chart">chart</div>

<style>
    .chart {
        width: 500px;
        height: 800px;
        background: rgba(255, 255, 255, 0.9);
    }
</style>
