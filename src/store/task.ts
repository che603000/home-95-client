import {makeAutoObservable, toJS} from "mobx";
import {clientMQTT} from './mqtt';
// @ts-ignore
import dateFormat from 'dateformat';
import axios from "axios";
import {ITask} from "./intarface";

export class Task {
    //Data
    id?: string;
    title = 'Новая задача'
    topic = '???'
    type = 'NONE'
    disable: boolean = false;
    startTime: string = dateFormat(new Date(), 'HH:MM')
    waitTime: number = 30; // minutes

    // UI
    loading = false;
    error?: Error;

    constructor(task?: ITask) {
        if (task) {
            const {id, type, title, topic, waitTime, startTime, disable} = task;
            this.id = id;
            this.type = type;
            this.title = title;
            this.topic = topic;
            this.waitTime = waitTime;
            this.startTime = startTime.join(',');
            this.disable = disable;
        }
        makeAutoObservable(this)
    }

    setError(err?: Error) {
        this.error = err;
        return err;
    }

    setLoading(value: boolean) {
        this.loading = value;
    }

    setTitle(value: string) {
        this.title = value;
    }

    setType(value: string) {
        this.type = value;
    }

    setTopic(value: string) {
        this.topic = value;
    }

    setStartTime(value: string) {
        this.startTime = value;
    }

    setWaitTime(value: number) {
        this.waitTime = value;
    }

    setDisable(value: boolean) {
        this.disable = value;
    }

    toJSON() {
        const {id, type, title, topic, startTime, waitTime, disable} = this;
        return {
            id,
            type,
            title,
            topic,
            startTime: startTime.split(',').map(s => s.trim()),
            waitTime,
            disable,
        } as ITask;
    }

    save(): Promise<ITask> {
        this.setError();
        const data = this.toJSON();
        const req = data.id ? axios.put : axios.post;
        return req('/task', data)
            .then(res => res.data)
            .catch(err => this.setError(err))
            .finally(() => this.setLoading(false))
    }
}

