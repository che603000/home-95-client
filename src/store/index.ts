import axios from "axios";
import {ListActiveTask} from "./active-task";
import {ITask} from "./intarface";

/*

export const models: Promise<ActiveTask[]> = axios.get('/task')
    .then(res => res.data)
    .then(items => items.map((item: ITask) => new ActiveTask(item)))

export const modelById = (id: string) => models.then((items: ActiveTask[]) => items.find(model => model.id === id));

export const modelsByType = (type: string) => models.then(items => items.filter(model => model.type === type));

*/

export const listActiveTask = new ListActiveTask();

