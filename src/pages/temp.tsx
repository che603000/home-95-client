import {Row, Col, Container} from 'react-bootstrap';
import {TempChart} from '../componetns/chart-temp'
import {SENSOR_TEMP_OUTDOOR, SENSOR_TEMP_HOT, SENSOR_TEMP_HOT_BACK, BOARD_TEMP, CPU_TEMP} from "../const";
import {useEffect, useState} from "react";
import {loadTemp, loadTemps, createDataset} from "../componetns/utils";


export const Temp = () => {

    const [tempItems, setTempItems] = useState<any>(undefined);
    const [tempOutDoor, setTempOutDoor] = useState<any>(undefined);

    useEffect(() => {
        loadTemp(SENSOR_TEMP_OUTDOOR, 3)
            .then(items => setTempOutDoor(items));

        loadTemps(1)
            .then(items => setTempItems(items));
    }, [])

    if (tempItems && tempOutDoor) {

        const outDoorTemp = tempItems[SENSOR_TEMP_OUTDOOR];
        const tempCPU = tempItems[CPU_TEMP];

        return (
            <Container fluid={true}>
                <Row>
                    <Col>
                        <TempChart datasets={[
                            createDataset(outDoorTemp, 'blue', `Темп возд: ${outDoorTemp[outDoorTemp.length - 1].y.toFixed(1)} ℃`, 'yAxesTempOutDoor'),
                            createDataset(tempItems[SENSOR_TEMP_HOT], 'red', 'Подача котла', 'yAxesTempHot'),
                            createDataset(tempItems[SENSOR_TEMP_HOT_BACK], '#F99', 'Обратка котла', 'yAxesTempHot'),
                        ]}/>
                    </Col>
                    <Col>
                        <TempChart datasets={[
                            createDataset(tempItems[BOARD_TEMP], '#F90', 'Темп в шкафу автоматике', 'yAxesTempHot'),
                            createDataset(tempCPU, '#F09', 'Темп процессора', 'yAxesTempHot'),
                        ]}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TempChart datasets={[
                            createDataset(tempOutDoor, 'blue', `Темп возд: ${tempOutDoor[tempOutDoor.length - 1].y.toFixed(1)} ℃`, 'yAxesTempOutDoorDays'),
                        ]}/>
                    </Col>

                </Row>
            </Container>
            // <div style={{width: '40%', border: '1px solid gray', margin: "0.5rem"}}>
            // <Line options={options} data={data}/>
            // </div>

        )
    } else
        return null;
}
