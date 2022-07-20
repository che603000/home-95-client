import {Alert} from "react-bootstrap";

export const ErrorPage = (props: { message?: string, error?: Error }) => {
    const mes = props.message || (props.error && props.error.message);
    return (
        <Alert variant="danger">
            <Alert.Heading>Ошибка</Alert.Heading>
            {mes}
        </Alert>
    )
}