import {FormEvent} from "react"
import {Form, Button} from 'react-bootstrap';
import {observer} from "mobx-react-lite"
import {useNavigate, useParams} from "react-router-dom";

import {TitlePage} from "../componetns/title-page";
import {ErrorPage} from "../componetns/error-page";
import {ButtonsPage} from "../componetns/buttons-page";

import {Task} from "../store/task";
import {ITask} from "../store/intarface";
import {listActiveTask} from "../store";


const ComponentWater = (props: { model: Task, type: string, onUpdate?: (data?: ITask) => void }) => {
    const {model, onUpdate} = props;

    const navigate = useNavigate();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        model.setType(props.type);
        model.save()
            .then(data => onUpdate && onUpdate(data))
            .then(() => navigate(-1));
    }
    const onEsc = () => navigate(-1);

    return (
        <div className="page-content">
            <TitlePage title="Новая задача"/>
            <hr/>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="titleId">
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        type="text"
                        value={model.title}
                        disabled={model.loading}
                        onChange={e => model.setTitle(e.target.value)}/>

                </Form.Group>
                <Form.Group className="mb-3" controlId="topicId">
                    <Form.Label>Топик MQQT</Form.Label>
                    <Form.Control
                        type="text"
                        value={model.topic}
                        disabled={model.loading}
                        onChange={e => model.setTopic(e.target.value)}/>

                </Form.Group>
                <Form.Group className="mb-3" controlId="timesId">
                    <Form.Label>Включить в</Form.Label>
                    <Form.Control
                        type="text"
                        value={model.startTime}
                        disabled={model.loading}
                        onChange={e => model.setStartTime(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <small>время через запятую. 06:00,20:30,...</small>
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="waitTimeId">
                    <Form.Label>Выключить через
                        <b> {model.waitTime / 60 | 0}:{model.waitTime % 60 | 0}</b> Ч:М</Form.Label>
                    <Form.Range
                        min={10}
                        max={180}
                        step={10}
                        disabled={model.loading}
                        value={model.waitTime}
                        onChange={e => model.setWaitTime(+e.target.value)}
                    />
                </Form.Group>

                {model.error && <ErrorPage error={model.error}/>}

                <hr/>
                <ButtonsPage>
                    <Button variant="primary" type="submit" disabled={model.loading}>
                        Применить
                    </Button>
                    <span> </span>
                    <Button variant="secondary" type="button" onClick={onEsc} disabled={model.loading}>
                        Отменить
                    </Button>
                </ButtonsPage>
            </Form>
        </div>
    )
}

export const Water = observer(ComponentWater);

export const WrapUpdate = (props: { type: string }) => {
    let {id} = useParams();
    const activeModel = listActiveTask.getById(id as string);
    const data = activeModel ? activeModel.task : undefined;
    const model = new Task(data);
    const onUpdate = (data?: ITask) => {
        if (activeModel && data)
            activeModel.task = data;
    }
    return <Water model={model} type={props.type} onUpdate={onUpdate}/>

}

export const WrapCreate = (props: { type: string }) => {
    const model = new Task();
    const onUpdate = (data?: ITask) => {
        if (listActiveTask && data)
            listActiveTask.add(data);
    }
    return <Water model={model} type={props.type} onUpdate={onUpdate}/>

}