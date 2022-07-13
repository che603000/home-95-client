import {FormEvent, useEffect, useState} from "react"
import {Form, Button} from 'react-bootstrap';
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";

import {TitlePage} from "../componetns/title-page";
import {ErrorPage} from "../componetns/error-page";
import {ButtonsPage} from "../componetns/buttons-page";

import {Device as TDevice} from '../store/device'

const ComponentWater = (props: { model: TDevice }) => {
    const {model} = props;

    const navigate = useNavigate();
    const [error, setError] = useState<any>(null);
    const [prevData] = useState<any>(model.toJSON())

    const onSubmit = (e: FormEvent) => {
        setError(null);
        e.preventDefault();
        model.saveCron().catch(() => {
        })

    }
    const onEsc = () => navigate('/');

    useEffect(() => {
        return () => prevData && model.setValues(prevData);
    }, [model, prevData]);

    return (
        <div className="page-content">
            <TitlePage title={model.title}/>
            <hr/>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="switch"
                                label="Вкл/выкл"
                                checked={model.active}
                                onChange={(e) => model.setActive(e.target.checked)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Включить по времени</Form.Label>
                    <Form.Control type="time" value={model.startTime} disabled={model.active}
                                  onChange={e => model.setStartTime(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <small>Включить в </small>
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Выключить через <b>{model.waitTime}</b> часов</Form.Label>
                    <Form.Range
                        min={10}
                        max={360}
                        step={10}
                        value={model.waitTime}
                        onChange={e => model.setWaitTime(+e.target.value)}
                    />
                </Form.Group>

                {error && <ErrorPage message={error}/>}

                <hr/>
                <ButtonsPage>
                    <Button variant="primary" type="submit">
                        Применить
                    </Button>
                    <span> </span>
                    <Button variant="secondary" type="button" onClick={onEsc}>
                        Отменить
                    </Button>
                </ButtonsPage>
            </Form>
        </div>

    )
}

export const Water = observer(ComponentWater);

