import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import MyContext from "./contexts/MyContext";

export default function SystemDropdown() {
    const { system, setSystem } = useContext(MyContext);

    const options = [
        { value: "F1", label: "F1 (No fastest lap point)" },
        { value: "Nascar", label: "Nascar" },
        { value: "MarioKart", label: "Mario Kart" },
        { value: "Custom", label: "Custom System" }
    ];

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success">
                {system}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {options.map(opt => (
                    <Dropdown.Item key={opt.value} onClick={() => setSystem(opt.value)}>
                        {opt.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
