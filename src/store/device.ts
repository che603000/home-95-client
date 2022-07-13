import {makeAutoObservable} from "mobx";
import {clientMQTT} from './mqtt';
// @ts-ignore
import dateFormat from 'dateformat';
import axios from "axios";

export class Device {
    //Data
    active: boolean = false;
    disable: boolean = false;
    startTime: string = dateFormat(new Date(), 'HH:MM')
    waitTime: number = 30; // minutes

    // UI
    loading = false;
    error?: Error;

    constructor(public id: string, public type: string, public title: string, private topic: string) {
        this.id = id;
        clientMQTT.on('message', (topic: string, data: Buffer) => this.onMessage(topic, data.toString()));
        makeAutoObservable(this)
    }

    setError(err?: Error) {
        this.error = err;
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
        Object.keys(values).forEach(key=>{
            // @ts-ignore
            if(this[key])
            { // @ts-ignore
                this[key] = values[key];
            }
        })
        // const {active, disable, startTime, waitTime} = values;
        // this.active = active;
        // this.disable = disable;
        // this.startTime = startTime;
        // this.waitTime = waitTime;
    }

    toJSON() {
        return {
            active: this.active,
            disable: this.disable,
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

    fetchCron() {
        this.setError();
        return axios.get(`/task/${this.id}`)
            .then(res => res.data)
            .then(values => this.setValues(values))
            .catch(err => this.setError(err))
    }

    saveCron() {
        this.setError();
        return axios.post('/task', this.toJSON())
            .then(res => res.data)
            .then(values => this.setValues(values))
            .catch(err => this.setError(err))
    }
}

