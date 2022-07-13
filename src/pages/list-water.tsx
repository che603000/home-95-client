import {Device} from "../store/device";
import {Badge} from "react-bootstrap";
import {TitlePage} from "../componetns/title-page";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";


const ItemDevice = observer((props: { model: Device }) => {
    const {id, title, active, disable, startTime, waitTime} = props.model;
    const navigate = useNavigate();
    useEffect(() => {
        props.model.fetchCron()
            .catch(err=>{
                console.log(err);
            })
    }, [props.model])
    return (
        <div className={"item-water"} onClick={() => navigate(`${id}`)}>
            <h5>{title} {active ? '[ON]' : ''}</h5>
            {!disable && startTime.split(',').map((time:string, index: number) => <span key={index}><Badge bg="info">{time}</Badge> </span>)}
            {disable && <Badge bg="secondary">Не активен</Badge>}
            <br/>
            <small>Время полива <strong>{waitTime}</strong> мин</small>
        </div>
    )
})

export const ListWater = (props: { items: Device[] }) => {

    return (
        <div className="page-content">
            <TitlePage title={"Авто полив"}/>
            {props.items.map(item => <ItemDevice key={item.id} model={item}/>)}
        </div>
    )
}