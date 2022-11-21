import {FormEvent} from "react"
import {Form, Button} from 'react-bootstrap';
import {observer} from "mobx-react-lite"
import {useNavigate, useParams} from "react-router-dom";

import {TitlePage} from "../componetns/title-page";
import {ErrorPage} from "../componetns/error-page";
import {ButtonsPage} from "../componetns/buttons-page";

import {Task} from "../store/task";
import {listActiveTask} from "../store";

const ComponentItem = (props: { model: Task, type: string }) => {
    const {model} = props;

    const navigate = useNavigate();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        model.save(props.type)
            .then(() => navigate(-1));
    }
    const onEsc = () => navigate(-1);

    const onDelete = () => {
        const {id} = model;
        if (!id)
            return;
        model.remove(id)
            .then(() => navigate(-1));
    }

    return (
        <div className="page-content">
            <TitlePage title="Новая задача"/>
            <hr/>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId={`active-task-${model.id}`}>
                    <Form.Check
                        type="switch"
                        label={<span>Активная задача</span>}
                        checked={!model.disable}
                        disabled={model.loading}
                        onChange={(e) => model.setDisable(!e.target.checked)}
                    />
                    <br/>
                </Form.Group>
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
                        list="list-devices-wb"
                        value={model.topic}
                        disabled={model.loading}
                        onChange={e => model.setTopic(e.target.value)}/>

                </Form.Group>
                <Form.Group className="mb-3" controlId="timesId">
                    <Form.Label>Включить в</Form.Label>
                    <Form.Control
                        type="text"
                        value={model.startTime}
                        disabled={model.loading || model.disable}
                        placeholder={"06:00,20:00"}
                        onChange={e => model.setStartTime(e.target.value)}/>
                    <Form.Text className="text-muted">
                        <small>список времени включения через запятую. 06:00,20:30,...</small>
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="waitTimeId">
                    <Form.Label>Выключить через
                        <b> {model.waitTime}</b> мин</Form.Label>
                    <Form.Range
                        min={5}
                        max={180}
                        step={5}
                        disabled={model.loading || model.disable}
                        value={model.waitTime}
                        onChange={e => model.setWaitTime(+e.target.value)}
                    />
                </Form.Group>
                <datalist id="list-devices-wb">
                    <option value="/devices/wb-mr6c_159/controls/"/>
                    <option value="/devices/wb-gpio/controls/"/>
                </datalist>
                {model.error && <ErrorPage error={model.error}/>}

                <hr/>
                <ButtonsPage>
                    <Button variant="secondary" size={"sm"} type="button" onClick={onDelete} disabled={model.loading}>
                        Удалить
                    </Button>
                    <span> </span>
                    <Button variant="secondary" size={"sm"} type="button" onClick={onEsc} disabled={model.loading}>
                        Отменить
                    </Button>
                    <span> </span>
                    <Button variant="primary" size={"sm"} type="submit" disabled={model.loading}>
                        Сохранить
                    </Button>
                </ButtonsPage>
            </Form>
        </div>
    )
}

export const Item = observer(ComponentItem);

export const WrapUpdate = (props: { type: string }) => {
    let {id} = useParams();
    const activeModel = listActiveTask.getById(id as string);
    const data = activeModel ? activeModel.task : undefined;
    const model = new Task(data);
    return <Item model={model} type={props.type}/>
}

export const WrapCreate = (props: { type: string }) => {
    const model = new Task();
    return <Item model={model} type={props.type}/>
}