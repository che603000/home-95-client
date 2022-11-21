import React from "react";
import {Navbar, Container, Button} from 'react-bootstrap';
import {
    Link
} from "react-router-dom";

import {observer} from "mobx-react-lite";
export const Home = () => <div>HOME !!!</div>

export const TopIndex = observer(() => {
    const titleStyle={textDecoration: "none", display: "block"}
    return (
        <div>
            <Link to="/temperature" style={titleStyle}>
                <Button variant="danger" className="main-button">Температура</Button>
            </Link>
            <Link to="/lights" style={titleStyle}>
                <Button variant="warning" className="main-button">
                    Подсветка дома
                </Button>
            </Link>
            <Link to="/waters" style={titleStyle}>
                <Button variant="info" className="main-button">Авто полив</Button>
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