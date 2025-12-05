import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import MyContext from "./contexts/MyContext";

export default function YearDropdown() {
    const { year, setYear } = useContext(MyContext);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success">
                {year}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {[2025, 2024, 2023].map(y => (
                    <Dropdown.Item key={y} onClick={() => setYear(y)}>
                        {y}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
