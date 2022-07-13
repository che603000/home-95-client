import {makeAutoObservable} from "mobx"

interface IWaterData {
    id: string
    title: string
    startTime: string[]
    waitTime: number
    active?: boolean,
    disable?: boolean

}

const config: IWaterData[] = [
    {
        id: '1',
        title: 'Газон у дороги',
        startTime: ['08:00', '20:00'],
        waitTime: 20,
        disable: true
    },
    {
        id: '2',
        title: 'Большой газон',
        startTime: ['08:30', '20:30'],
        waitTime: 40
    }
]

export class Water {
    id: string;
    title: string = 'Без названия';
    active: boolean = false;
    disable: boolean = false;
    startTime: string[] = [];
    waitTime: number = 1;

    constructor(data: IWaterData) {
        this.id = data.id;
        this.title = data.title;
        this.startTime = data.startTime;
        this.waitTime = data.waitTime
        this.active = !!data.active;
        this.disable = !!data.disable;
        makeAutoObservable(this)
    }

    setActive(value: boolean) {
        this.active = value;
    }

    setStartTime(values: string) {
        this.startTime = values
            .split(',')
            .map(s => s.trim())
            .filter(s => !!s);
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
}

export const waters = config.map(data => new Water(data));
