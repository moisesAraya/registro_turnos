import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto';

function GraphBarra({chartData}) {
    return <Bar data={chartData}/>
}

export default GraphBarra;