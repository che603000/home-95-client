import {action, makeObservable, observable} from "mobx";
import {ITask} from "./intarface";
import {clientMQTT} from './mqtt';
import axios from "axios";


const DEVICES_TOPIC = ['/devices/wb-mr6c_159/controls/#', '/devices/wb-gpio/controls/#'];


export class ActiveTask {
    private key?: any = null;

    active: boolean = false;
    loading = false;
    error?: Error;

    get id() {
        return this.task.id;
    }

    get type() {
        return this.task.type;
    }

    constructor(public task: ITask) {
        makeObservable(this, {
            active: observable,
            loading: observable,
            error: observable,
            setActive: action,
            setLoading: action,
            setError: action,
        })
    }

    clear() {
        clientMQTT.unsubscribe(this.task.topic, () => {
        });
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

    onMessage(data: string) {
        clearTimeout(this.key);
        const value = data === '1';
        this.setActive(value);
        this.setLoading(false);
    }

    doActive(value: boolean) {
        this.setLoading(true);
        this.setError()
        this.key = setTimeout(() => {
            this.setLoading(false);
            this.setError(new Error('Timeout error'));
        }, 3000);
        clientMQTT.publish(`${this.task.topic}/on`, value ? '1' : '0');
    }
}

export class ListActiveTask {
    items: ActiveTask[] = [];
    loading = false;
    error?: Error;

    mqttReady: Promise<any>

    constructor() {
        this.mqttReady = new Promise<undefined>((res, rej) => {
            clientMQTT.on('connect', () => res(clientMQTT));
            clientMQTT.on('error', (err: Error) => rej(err));
        });

        this.mqttReady
            .then(client => client.on('message', (topic: string, data: Buffer) => this.onMessage(topic, data.toString())))

        makeObservable(this, {
            items: observable.ref,
            loading: observable,
            error: observable,
            setItems: action,
            setLoading: action,
            setError: action,
        })
    }

    onMessage(topic: string, data: string) {
        const item = this.items.find(item => item.task.topic === topic);
        if (!item)
            return;
        item.onMessage(data);
    }

    setError(err?: Error) {
        this.error = err;
    }

    setItems(items: ITask[]) {
        this.items = items.map(item => new ActiveTask(item));
    }

    setLoading(value: boolean) {
        this.loading = value;
        if (value)
            this.error = undefined;
    }

    getById(id: string) {
        return this.items.find(item => item.id === id);
    }

    fetch() {
        this.setLoading(true);
        this.items = [];
        return axios.get('/task')
            .then(res => res.data as ITask[])
            .then(items => this.setItems(items))
            .then(() => this.mqttReady)
            .then(client => client.unsubscribe(DEVICES_TOPIC, () => client.subscribe(DEVICES_TOPIC, () => undefined)))
            .catch(err => this.setError(err))
            .finally(() => this.setLoading(false))
    }
}

