import { useContext } from "react";
import Button from "react-bootstrap/Button";
import MyContext from "./contexts/MyContext";

const DeleteButton = ({ name, number }) => {
    const { setDrivers } = useContext(MyContext);
    const { setCustomDrivers } = useContext(MyContext);

    const deleteDriver = () => {
        setDrivers(prev => {
            console.log(name);
            const newMap = new Map(prev);
            newMap.delete(number);
            return newMap;
        });

        setCustomDrivers(prev => {
            const newMap = new Map(prev);
            newMap.delete(name);
            return newMap;
        });
    };

    return (
        <Button onClick={deleteDriver} variant="outline-danger" size="sm">
            &times;
        </Button>
    );
};


export default DeleteButton;
