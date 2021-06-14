import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";
import Card from 'react-bootstrap/Card';

const RevenueChart = ({data}) => {
    const yLabel = { value: 'Revenue', angle: -90, position: 'insideLeft' };
    const xLabel = { value: 'Date', offset: 0, postition: 'bottom'}
    return (
        <Card className="profile-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>My Revenue</h2>
            </Card.Header>
            <Card.Body>
                <div className="dashboard-chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            className="dashboard-chart-centered"
                        >
                            <XAxis dataKey="date">
                                <Label value={xLabel.value} offset={xLabel.offset} position={xLabel.position} className="pt-4" />
                            </XAxis>
                            <YAxis label={yLabel} />
                            <Tooltip formatter={(val) => `$${val}`} />
                            <Bar dataKey="Revenue" fill="#17a2b8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    )
}
export default RevenueChart;