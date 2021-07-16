export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const DASHBOARD_CHART_COLORS = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

// key into order and chart info here 
export const DATA_KEYS = Object.freeze({
    "FOOD": "food",
    "DRINK": "drink",
    "BAR": "bar",
    "LINE": "line",
    "DOUGHNUT": "doughnut"
});

export const REVENUE_KEY = "Revenue";
export const ORDER_KEY = "Orders";
export const WEEKLY_KEY = "Weekly"
export const MONTHLY_KEY = "Monthly";
export const YEARLY_KEY = "Yearly";

export const GOAL_TYPES = Object.freeze({
    SUBJECTS: [REVENUE_KEY, ORDER_KEY],
    TIMEABLES: [WEEKLY_KEY, MONTHLY_KEY, YEARLY_KEY]
})