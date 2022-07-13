import {devices} from '../config';
import {Device} from "./device";

export const models = devices.map(device => new Device(device.id, device.type, device.title, device.topic));

export const modelById = (id: string) => models.find(model => model.id === id);

export const modelsByType = (type: string) => models.filter(model => model.type === type);
