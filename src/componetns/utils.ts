import {useEffect, useState} from "react";
import axios from "axios";

export const createRangeDate = (countBackDay: number, endDate?: Date) => {
    const end = endDate || new Date();
    end.setSeconds(0, 0);

    const start = new Date();
    start.setDate(end.getDate() - countBackDay);
    start.setSeconds(0, 0);
    return [start.toISOString(), end.toISOString()];
}

export const loadTemps = (countBackDay: number, end?: Date) => {
    const [startDate, endDate] = createRangeDate(countBackDay, end);
    type TDate = { x: number, y: number };
    const url = `/temps/${startDate}/${endDate}`;
    return axios.get(url)
        .then(res => res.data)
        .then<TDate[]>(data => data.reduce((res: Record<string, TDate[]>, d: any) => {
            res[d.device] = res[d.device] || [];
            res[d.device].push({x: new Date(d.createDate).getTime(), y: d.value});
            return res;
        }, {}));
}

export const loadTemp = (type: string, countBackDay: number, end?: Date) => {
    const [startDate, endDate] = createRangeDate(countBackDay, end);
    type TDate = { x: number, y: number };
    const url = `/temp/${type}/${startDate}/${endDate}`;
    return axios.get(url)
        .then(res => res.data)
        .then<TDate[]>(data => data.map((d: any) => {
            return {x: new Date(d.createDate).getTime(), y: d.value}
        }, []));
}

export const createDataset = (items: { x: number, y: number }[], color: string, label: string, yAxisID = 'red') => {
    return {
        data: items,
        borderColor: color,
        //backgroundColor: 'blue',
        borderWidth: 2,
        fill: false,
        //label: `Темп возд: ${items[items.length - 1].y} ℃`,
        label,
        pointRadius: 0,
        yAxisID
    }
}