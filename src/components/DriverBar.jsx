import { useEffect, useState } from "react";
import DeleteButton from './DeleteButton';

const DriverBar = ({ name, driverNum, totalPoints, color, maxPoints }) => {
    const [width, setWidth] = useState(0); // start at 0
    const widthPercent = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;

    // Trigger the animation after mounting
    useEffect(() => {
        const timeout = setTimeout(() => {
            setWidth(widthPercent);
        }, 100);
        return () => clearTimeout(timeout);
    }, [widthPercent]);

    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ marginBottom: 4, color: "white", fontWeight: "bold" }}>
                {name} - <span style={{ color }}>{driverNum}</span>{" "}
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <span
                    style={{
                        color,
                        marginRight: 8,
                        minWidth: 100,
                        textAlign: "right",
                    }}
                >
                    {totalPoints} pts
                </span>
                <div style={{ paddingLeft: 5, paddingRight: 10 }}>
                    <DeleteButton name={name} number={driverNum} />
                </div>

                {/* Bar grows to fill space */}
                <div
                    style={{
                        height: "24px",
                        width: `${width}%`,
                        backgroundColor: color,
                        borderRadius: 3,
                        transition: "width 1s ease-out",
                        marginRight: 10,
                    }}
                />

            </div>
        </div>
    );


};

export default DriverBar;
