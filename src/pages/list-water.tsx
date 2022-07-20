import {Badge, Button, Form, Spinner} from "react-bootstrap";
import {TitlePage} from "../componetns/title-page";
import {useNavigate} from "react-router-dom";
import {FaTrash, FaList as IconEdit} from "react-icons/fa";
import {observer} from "mobx-react-lite";
import {ActiveTask, ListActiveTask} from "../store/active-task";
import {ErrorPage} from "../componetns/error-page";


const ItemDevice = observer((props: { model: ActiveTask, onRemove: (id: string) => void }) => {
    const {model} = props;
    const {id, title, disable, startTime, waitTime,} = props.model.task;
    const navigate = useNavigate();

    return (
        <div className={"item-water"}>
            <div style={{textAlign: 'center', height: '2.2rem'}}>
                <Button size="sm" variant="light" onClick={() => props.onRemove(id)} style={{float: 'left'}}><FaTrash/></Button>
                <Button size="sm" variant="light" onClick={() => navigate(`${id}`)} style={{float: 'right'}}><IconEdit/></Button>
            </div>

            <h5>{title}</h5>
            <Form noValidate validated={false} >
                <Form.Group className="mb-3" controlId={`activeId-${id}`}>
                    <Form.Check
                        type="switch"
                        label={"Вкл/Выкл"}
                        checked={model.active}
                        disabled={model.loading}
                        feedback="нет связи с контролером"
                        feedbackType="invalid"
                        isInvalid={!!model.error}
                        onChange={(e) => model.doActive(e.target.checked)}/>
                </Form.Group>
            </Form>
            {!disable && startTime.map((time: string, index: number) => <span key={index}><Badge
                bg="info">{time}</Badge> </span>)}
            {disable && <Badge bg="secondary">Не активен</Badge>}
            <br/>
            <small>Время полива <strong>{waitTime}</strong> мин</small>

        </div>
    )
})

export const ListWater = observer((props: { type: string, listActiveTask: ListActiveTask }) => {

    const navigate = useNavigate();

    const onClick = () => navigate(`add`);
    const onRemove = (id: string) => props.listActiveTask.remove(id);

    return (
        <div className="page-content">
            <TitlePage title={"Авто полив"}/>

            {props.listActiveTask.error && <ErrorPage error={props.listActiveTask.error}/>}

            {props.listActiveTask.items.map(item => <ItemDevice key={item.id} model={item} onRemove={onRemove}/>)}
            <Button onClick={onClick}>+</Button>
        </div>
    )
})