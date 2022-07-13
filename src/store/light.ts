import {makeAutoObservable} from "mobx";
import {clientMQTT} from './mqtt';
// @ts-ignore
import dateFormat from 'dateformat';

export class Light {
    active: boolean = false;
    startTime: string = dateFormat(new Date(), 'HH:MM');
    waitTime: number = 1;
    loading = false;

    topic = '/devices/wb-gpio/controls/A2_OUT';

    constructor() {
        clientMQTT.on('message', (topic: string, data: Buffer) => this.onMessage(topic, data.toString()));
        makeAutoObservable(this)
    }

    setActive(value: boolean) {
        this.active = value;
    }

    setLoading(value: boolean) {
        this.loading = value;
    }

    setStartTime(value: string) {
        this.startTime = value;
    }

    setWaitTime(value: number) {
        this.waitTime = value;
    }

    setValues(values: any) {
        const {active, startTime, waitTime} = values;
        this.active = active;
        this.startTime = startTime;
        this.waitTime = waitTime;
    }

    toJSON() {
        return {
            active: this.active,
            startTime: this.startTime,
            waitTime: this.waitTime
        }
    }

    onMessage(topic: string, data: string) {
        if (this.topic !== topic)
            return;
        console.log(topic, data);
        const value = data === '1';
        this.setActive(value);
        this.setLoading(false);
    }

    doActive(value: boolean) {
        this.setLoading(true);
        clientMQTT.publish(`${this.topic}/on`, value ? '1' : '0');
    }
}

export const storeLight = new Light();
