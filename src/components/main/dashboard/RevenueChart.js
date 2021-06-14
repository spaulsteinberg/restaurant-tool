import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = ({data}) => {
    return (
        <div className="dashboard-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    className="dashboard-chart-centered"
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalCost" fill="#17a2b8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default RevenueChart;