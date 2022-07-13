import React from "react";
import {Navbar, Container, Button} from 'react-bootstrap';
import {
    Link
} from "react-router-dom";

import { Light} from '../store/light'
import {observer} from "mobx-react-lite";

export const Home = () => <div>HOME !!!</div>

export const TopIndex = observer((props: { light: Light }) => {
    return (
        <div>
            <Link to="/home">
                <Button variant="secondary" className="main-button">Home</Button>
            </Link>
            <Link to="/light">
                <Button variant="secondary" className="main-button" style={{color: props.light.active ? "yellow" : ''}}>
                    Подсветка дома
                </Button>
            </Link>
            <Link to="/waters">
                <Button variant="secondary" className="main-button">Авто полив</Button>
            </Link>
        </div>
    )
})

export const TopNav = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src="/home.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Терраски дом № 95
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}