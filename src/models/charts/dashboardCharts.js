import { DASHBOARD_CHART_COLORS } from "../../constants/constants";

export class ChartBase {
    constructor(labels){
        this.labels = labels;
        this.datasets = [];
    }
}

export class DashboardBarChart extends ChartBase {
    constructor(labels, dataSetData, dataSetLabel){
        super(labels);
        this.hydrateDataSet(dataSetData, dataSetLabel);
    }

    hydrateDataSet(data, setLabel){
        this.datasets.push({data: data, label: setLabel, backgroundColor: DASHBOARD_CHART_COLORS, borderColor: DASHBOARD_CHART_COLORS})
    }
}

export class DashboardLineChart extends ChartBase {
    constructor(labels, dataSet, dataSetLabel){
        super(labels);
        this.hydrateDataSet(dataSet, dataSetLabel);
    }

    hydrateDataSet(data, setLabel) {
        this.datasets.push({data: data, label: setLabel, borderColor: DASHBOARD_CHART_COLORS[1], fill: false, tension: 0})
    }
}

export class DashboardDoughnutChart extends ChartBase {
    constructor(labels, dataSet){
        super(labels)
        this.datasets.push({data: dataSet, backgroundColor: DASHBOARD_CHART_COLORS, hoverOffset: 4})
    }
}

/*********Chart Options Configs *************/

export class ChartConfigBase {
    constructor(precision, overrideXGridDisplay){
        this.responsive = true;
        this.scales = {
            y: { ticks: {beginAtZero: true, precision: precision} },
            x: { grid: { display: overrideXGridDisplay}}
        }
        this.plugins = {legend: {display: false}, tooltip: {}}
    }
}


export class ChartConfig extends ChartConfigBase {
    constructor(precision, overrideXGridDisplay, tickCallBack = null, toolTipCallBack = null){
        super(precision, overrideXGridDisplay);
        if (tickCallBack){
            this.scales.y.ticks.callback = tickCallBack
        }
        if (toolTipCallBack){
            this.plugins.tooltip.callbacks = {}
            this.plugins.tooltip.callbacks.label = toolTipCallBack
        }
    }
}

export class ChartDoughnutConfig {
    constructor(toolTipCallBack){
        this.responsive = true;
        this.maintainAspectRatio = true;
        this.aspectRatio = 1.5;
        this.cutout = "70%";
        this.plugins = {
            legend: { 
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: toolTipCallBack
                }
            }
        }
    }
}