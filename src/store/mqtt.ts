import {devices} from '../config';

// @ts-ignore
const {connect} = window.mqtt;

const MQQT = {
    connect: 'ws://192.168.1.5:18883/mqtt'
};



export const clientMQTT = connect(MQQT.connect);

// clientMQTT.on('connect', () => {
//     console.log("success");
//     // TOPICS.forEach(topic => client.subscribe(topic, () => {
//     // }));
//     const topics = devices.map(d=>d.topic);
//     //clientMQTT.subscribe(['/devices/wb-gpio/controls/+'], () => {
//     clientMQTT.subscribe(topics, () => {
//     })
//     //client.subscribe(['/devices/wb-gpio/#', '/devices/wb-mr6c_159/controls/#'], () => {})
//     //client.publish('/devices/wb-gpio/controls/A1_OUT/on', '1');
//     // setInterval(()=>{
//     //     client.publish('/devices/wb-gpio/controls/A1_OUT/on', '0');
//     // }, 3000)
//
//     // clientMQTT.subscribe("/devices/wb-gpio/controls/#", () => {
//     // })
// });

clientMQTT.on('error', (err: Error) => {
    console.log(err);
});

// clientMQTT.on('message', (topic: string, message: Buffer) => {
//     console.log(topic, message.toString());
// });

