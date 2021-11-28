import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import {Bar, Line, Doughnut} from 'react-chartjs-2';
import { DATA_KEYS } from '../../constants/constants';

const DefaultChart = ({title, masterData, chartData, chartOptions, chartFlag, ...rest}) => {

    const [zeroData, setZeroData] = useState(false);
    const checkForZeroedData = useCallback(
        () => {
            if (chartFlag === DATA_KEYS.LINE) {
                for (const data of chartData.datasets) {
                    for (const d of data.data) {
                        if (d !== 0) {
                            return setZeroData(false)
                        }
                    }
                }
                return setZeroData(true)
            }
            return setZeroData(false)
        },
        [chartData, chartFlag],
    );

    useEffect(() => {
        checkForZeroedData();
    }, [checkForZeroedData])

    return (
        <Card className="dashboard-card my-4 text-left">
            <Card.Header className="profile-header mb-2">
                <h2>{title}</h2>
            </Card.Header>
            <Card.Body>
                {
                    masterData && masterData.length > 0 && !zeroData &&
                    <div className="dashboard-chart-wrapper">
                        { chartFlag === DATA_KEYS.BAR && <Bar data={chartData} options={chartOptions} /> }
                        { chartFlag === DATA_KEYS.LINE && <Line data={chartData} options={chartOptions} />}
                        { chartFlag === DATA_KEYS.DOUGHNUT && <Doughnut data={chartData} options={chartOptions} />}
                    </div>
                }
                {masterData.length === 0 || zeroData ? <p>No data to display</p> : null}
            </Card.Body>
        </Card>
    )
}
export default DefaultChart;