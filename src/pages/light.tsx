import axios from 'axios';
import {FormEvent, useEffect, useState} from "react"
import {Form, Button, Spinner} from 'react-bootstrap';
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";

import {TitlePage} from "../componetns/title-page";
import {ErrorPage} from "../componetns/error-page";
import {ButtonsPage} from "../componetns/buttons-page";

import {Light as TLight} from '../store/light'

const ComponentLight = (props: { model: TLight }) => {
    const {model} = props;

    const navigate = useNavigate();
    const [error, setError] = useState<any>(null);
    const [prevData, setPrevData] = useState<any>(model.toJSON())

    const onSubmit = (e: FormEvent) => {
        setError(null);
        e.preventDefault();
        axios.post('/light', model)
            .then(response => {
                console.log(response.data);
                setPrevData(() => undefined);
            })
            .then(() => navigate(`/`))
            .catch(error => {
                setError(error.message);
            });
    }
    const onEsc = () => navigate('/');

    useEffect(() => {
        return () => prevData && model.setValues(prevData);
    }, [model, prevData]);

    return (
        <div className="page-content">
            <TitlePage title="Подсветка дома"/>
            <hr/>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">

                    <Form.Check type="switch"
                                label={<span>Вкл/выкл свет {model.loading &&
                                <Spinner animation="border" size="sm"/>}</span>}
                                checked={model.active}
                                disabled={model.loading}
                                onChange={(e) => model.doActive(e.target.checked)}/>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Включить по времени</Form.Label>
                    <Form.Control type="time" value={model.startTime} disabled={model.active}
                                  onChange={e => model.setStartTime(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <small>Отложенное включение подсветки</small>
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Выключить через <b>{model.waitTime}</b> часов</Form.Label>
                    <Form.Range
                        min={0.5}
                        max={6}
                        step={0.5}
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

export const Light = observer(ComponentLight);

