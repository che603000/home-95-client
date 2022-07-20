import {action, makeObservable, observable} from "mobx";
import {ITask} from "./intarface";
import {clientMQTT} from './mqtt';
import axios from "axios";

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
        clientMQTT.on('connect', () => {
            //console.log("success");
            clientMQTT.subscribe(task.topic, () => {
            })

            clientMQTT.on('message', (topic: string, data: Buffer) => this.onMessage(topic, data.toString()));
        });
        makeObservable(this, {
            active: observable,
            loading: observable,
            error: observable,
            setActive: action,
            setLoading: action,
            setError: action,
        })
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

    onMessage(topic: string, data: string) {
        if (this.task.topic !== topic)
            return;
        console.log(topic, data);
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

    constructor() {
        makeObservable(this, {
            items: observable.ref,
            loading: observable,
            error: observable,
            setItems: action,
            setLoading: action,
            setError: action,
            add: action
        })
        this.fetch().catch(err => this.setError(err))

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

    add(data: ITask) {
        this.items.push(new ActiveTask(data))
    }

    fetch() {
        this.setLoading(true)
        return axios.get('/task')
            .then(res => res.data as ITask[])
            .then(items => this.setItems(items))
            .finally(() => this.setLoading(false))
    }

    remove(id: string) {
        this.setLoading(true)
        axios.delete(`/task/${id}`)
            .then(() => this.items = this.items.filter(item => item.id !== id))
            .catch(err => this.setError(err))
            .finally(() => this.setLoading(false))
    }

    create(data: ITask) {
        this.setError();
        return axios.post('/task', data)
            .then(res => res.data)
            .then(data => this.items.push(new ActiveTask(data)))
            .catch(err => this.setError(err))
            .finally(() => this.setLoading(false))
    }

    update(data: ITask) {
        this.setError();
        return axios.put('/task', data)
            .then(res => res.data)
            .then(data => {
                const item = this.getById(data.id);
                if (item)
                    item.task = data;
            })
            .catch(err => this.setError(err))
            .finally(() => this.setLoading(false))
    }
}

