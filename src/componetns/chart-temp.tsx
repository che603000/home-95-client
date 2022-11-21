import {useEffect, useState} from "react";
import Spinner from 'react-bootstrap/Spinner';
import * as axis from "./const";

import {
    Chart as ChartJS,
    TimeScale, //Import timescale instead of category for X axis
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
} from "chart.js";

import {Line} from 'react-chartjs-2';
import "chartjs-adapter-date-fns";
import * as faker from "faker";

ChartJS.register(
    TimeScale, //Register timescale instead of category for X axis
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options22: any = {
    scales: {
        xAxis: {
            // The axis for this scale is determined from the first letter of the id as `'x'`
            // It is recommended to specify `position` and / or `axis` explicitly.
            type: 'time',
            time: {
                unit: 'hour',
                stepSize: 2,
                timezone: 3,
                displayFormats: {
                    hour: 'HH:mm'
                }
            }
        },
        yAxesTempHot: {
            ticks: {
                color: 'red',
            },
            fontColor: 'red',
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
        },
        yAxesTemp: {
            grid: {
                color: '#99F',
                display: false,
                borderDash: [1, 5]
            },
            ticks: {
                color: 'blue',
            },
            fontColor: 'blue',
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
        }
        //     {
        //         ticks: {
        //             fontColor: 'red',
        //         },
        //         type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        //         display: true,
        //         position: 'right',
        //         id: 'y-axis-2',
        //     }
        // ]
    },
};

const createOptions = (nameAxis: string[]) => {
    const scales: Record<string, any> = {xAxis: axis.xAxis};
    const ax = axis as Record<string, any>;

    nameAxis.forEach(name => {
        scales[name] = ax[name];
    });
    return {
        scales
    }
}

type TPropsTemp = {
    sensorId: string;
    // end: Date;
    // end: Date;
    // period: number;
    colorLine?: string;
    yAxisName?: string;
}

export const TempChart = (props: { datasets: any }) => {

    const {datasets} = props;

    if (datasets.length > 0) {
        const options = createOptions(datasets.map((d: any) => d.yAxisID));
        return (
            <div className={"temp-chart"}>
                <Line options={options} data={{datasets}}/>
            </div>
        )
    } else
        return (
            <div className={"temp-chart temp-chart-wait"}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <br/>
                <span>Ждем загрузку...</span>
            </div>
        )
}


