import {Alert} from "react-bootstrap";

export const ErrorPage = (props: { message: string }) => {
    return (
        <Alert variant="danger">
            <Alert.Heading>Ошибка</Alert.Heading>
            {props.message}
        </Alert>
    )
}