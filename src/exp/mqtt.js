//import {devices} from '../config';

// @ts-ignore
const mqtt = require('mqtt')

const MQQT = {
    connect: 'ws://192.168.1.5:18883/mqtt'
};


const clientMQTT = mqtt.connect(MQQT.connect);


const ping = (sec) => {
    clientMQTT.publish('/devices/server-home95/controls/PING', Date.now().toString());
    setInterval(() => clientMQTT.publish('/devices/server-home95/controls/PING', Date.now().toString()), 1000 * sec);
}

clientMQTT.on('connect', () => {
    console.log("connect success");
    clientMQTT.publish('/devices/server-home95/controls/GUARD/on', '1');
    clientMQTT.subscribe(['/devices/server-home95/controls/#'/*, '/devices/wb-mr6c_159/controls/#'*/], () => 0)
    ping(5);

});

clientMQTT.on('error', (err) => {
    console.log(err);
});

clientMQTT.on('message', (topic, message) => {
    console.log(topic, message.toString());
});

