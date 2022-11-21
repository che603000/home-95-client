export const xAxis = {
    type: 'time',
    time: {
        unit: 'hour',
        stepSize: 2,
        timezone: 3,
        displayFormats: {
            hour: 'HH:mm'
        }
    }
};

export const yAxesTempHot = {
    ticks: {
        color: 'red',
    },
    fontColor: 'red',
    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    display: true,
    position: 'left',
};

export const yAxesTempOutDoor = {
    grid: {
        color: '#99F',
        display: false,
        borderDash: [1, 5]
    },
    ticks: {
        color: 'blue',
    },
    fontColor: 'blue',
    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    display: true,
    position: 'right',
};

export const yAxesTempOutDoorDays = {
    grid: {
        color: '#99F',
        display: true,
        borderDash: [1, 5]
    },
    ticks: {
        color: 'blue',
    },
    fontColor: 'blue',
    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    display: true,
    position: 'left',
};
