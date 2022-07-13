
export const TYPE_GRIO = 'grio';
export const TYPE_MR6C = 'mr6c';

export const devices = [
    {
        id: 'light-A1',
        type: TYPE_GRIO,
        title: 'Подсветка дома',
        topic: '/devices/wb-gpio/controls/A2_OUT',
    },
    {
        id: 'water-K1',
        type: TYPE_MR6C,
        title: 'Газон за забором',
        topic: '/devices/wb-mr6c_159/controls/K3',
    }

]