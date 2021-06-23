import React from 'react';
import '../main/main-styles.scss';
import Card from 'react-bootstrap/Card';
import {Bar, Line, Doughnut} from 'react-chartjs-2';
import { DATA_KEYS } from '../../constants/constants';

const DefaultChart = ({title, masterData, chartData, chartOptions, chartFlag}) => {
    return (
        <Card className="dashboard-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>{title}</h2>
            </Card.Header>
            <Card.Body>
                {
                    masterData && masterData.length > 0 && 
                    <div className="dashboard-chart-wrapper">
                        { chartFlag === DATA_KEYS.BAR && <Bar data={chartData} options={chartOptions} /> }
                        { chartFlag === DATA_KEYS.LINE && <Line data={chartData} options={chartOptions} />}
                        { chartFlag === DATA_KEYS.DOUGHNUT && <Doughnut data={chartData} options={chartOptions} />}
                    </div>
                }
                {masterData.length === 0 && <p>No data to display</p>}
            </Card.Body>
        </Card>
    )
}
export default DefaultChart;