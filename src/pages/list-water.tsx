import {useEffect} from 'react';
import {Badge, Button, Form, Table, Row, Col} from "react-bootstrap";
import {TitlePage} from "../componetns/title-page";
import {useNavigate} from "react-router-dom";
import {FaList as IconEdit, FaPlus as IconAdd} from "react-icons/fa";
import {observer} from "mobx-react-lite";
import {ActiveTask, ListActiveTask} from "../store/active-task";
import {ErrorPage} from "../componetns/error-page";


const ItemDev = observer((props: { model: ActiveTask }) => {
    const {model} = props;
    const {id, title, disable, startTime, waitTime,} = props.model.task;
    const navigate = useNavigate();

    return (
        <tr>
            {/*<td>*/}
            {/*    <Button size="sm" variant="light" onClick={() => props.onRemove(id)}*/}
            {/*            style={{float: 'left'}}><FaTrash/></Button>*/}
            {/*</td>*/}
            <td>
                <Row>
                    <Col>
                        <Form noValidate validated={false}>
                            <Form.Group className="mb-3" controlId={`activeId-${id}`}>
                                <Form.Check
                                    type="switch"
                                    label={<h5>{title}</h5>}
                                    checked={model.active}
                                    disabled={model.loading}
                                    feedback="нет связи с контролером"
                                    feedbackType="invalid"
                                    isInvalid={!!model.error}
                                    onChange={(e) => model.doActive(e.target.checked)}/>
                            </Form.Group>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {!disable && startTime.map((time: string, index: number) => <span key={index}><Badge
                            bg="info">{time}</Badge> </span>)}
                        {disable && <Badge bg="secondary">Не активна</Badge>}
                        {!disable && <small>Время полива <strong>{waitTime}</strong> мин</small>}
                    </Col>
                </Row>
            </td>
            <td>
                <Button size="sm" variant="light" onClick={() => navigate(`${id}`)}
                        style={{float: 'right'}}><IconEdit/></Button>
            </td>
        </tr>
    )

})

export const ListWater = observer((props: { type: string, title:string, listActiveTask: ListActiveTask }) => {

    useEffect(() => {
        props.listActiveTask.fetch().catch(()=>undefined);
    }, [props.listActiveTask]);

    const navigate = useNavigate();

    const onClick = () => navigate(`add`);

    return (
        <div className="page-content">
            <TitlePage title={props.title}/>
            {props.listActiveTask.error && <ErrorPage error={props.listActiveTask.error}/>}
            <hr/>
            <Table>
                <tbody>
                {
                    props.listActiveTask.items
                    .filter(t => t.type === props.type)
                    .map(item => <ItemDev key={item.id} model={item}/>)
                }
                <tr>
                    <td style={{textAlign: 'right'}}>
                        <sub>
                            Новая задача
                        </sub>

                    </td>
                    <td width="20">
                        <Button size={"sm"} variant="light" onClick={onClick}
                                style={{float: 'right'}}><IconAdd/></Button>
                    </td>
                </tr>
                </tbody>
            </Table>

        </div>
    )
})