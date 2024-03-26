export const echartOption = {
    title: {
        text: "ChartTitle",
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
    xAxis: [],
    yAxis: [
        {
            type: "value",
        },
    ],
    series: []
};
