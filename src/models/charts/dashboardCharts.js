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

/*********Chart Options Configs *************/

export class ChartConfigBase {
    constructor(precision){
        this.responsive = true;
        this.scales = {
            y: { ticks: {beginAtZero: 0, precision: precision} },
            x: { grid: { display: false}}
        }
        this.plugins = {legend: {display: false}, tooltip: {}}
    }
}

export class ChartBarConfig extends ChartConfigBase {
    constructor(precision, tickCallBack = null, toolTipCallBack = null){
        super(precision);
        if (tickCallBack){
            this.scales.y.ticks.callback = tickCallBack
        }
        if (toolTipCallBack){
            this.plugins.tooltip.callbacks = {}
            this.plugins.tooltip.callbacks.label = toolTipCallBack
        }
    }
}