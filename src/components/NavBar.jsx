import Button from 'react-bootstrap/Button';
import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MyContext from "./contexts/MyContext";
import { Link } from "react-router-dom";

export default function NavBar() {

    const {isLoading} = useContext(MyContext);

    return (
        <>
            <style>
                {`
          @keyframes moveGradient {
  0% { background-position: 200% 0%; }
  100% { background-position: 0% 0%; }
          }
        `}
            </style>
            <div>
                <Navbar
                    expand="lg"
                    fixed="top"
                    style={{
                        backgroundColor: "#3e3e42",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        width: "100%",
                        zIndex: 1000,
                        paddingLeft: "50px",
                        paddingRight: "50px"
                    }}
                >
                    <Navbar.Brand href="#">
                        <img
                            src="src\assets\F1-Logo.png"
                            alt="Racing What Ifs"
                            style={{
                                height: "40px",
                                width: "auto",
                                display: "block",
                            }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/" style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/scoringBuilder" style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}>Scoring Builder</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown" style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}>
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="light">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>

                {isLoading ? <div className="loading-bar">
                    <div
                        style={{
                            position: "fixed",
                            top: "70px",
                            left: 0,
                            width: "100%",
                            height: "4px",
                            background: "linear-gradient(to right, #615f5fff, #FF1E00)",
                            backgroundSize: "200% 100%",
                            animation: "moveGradient 3s linear infinite",
                            zIndex: 999,
                        }}
                    ></div>
                    <div
                        style={{
                            position: "fixed",
                            top: "80px",
                            left: 0,
                            width: "100%",
                            height: "4px",
                            background: "linear-gradient(to right, #615f5fff, #1828b8ff)",
                            backgroundSize: "200% 100%",
                            animation: "moveGradient 2.8s linear infinite",
                            animationDelay: "0.3s",
                            zIndex: 999,
                        }}
                    ></div></div> : null}
            </div>
        </>
    );
}
