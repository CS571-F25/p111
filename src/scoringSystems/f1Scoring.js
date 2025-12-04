export function calculateStandardScores(driverMap, pointMap, customDrivers) {
    const pointsForPositionSprint = [8, 7, 6, 5, 4, 3, 2, 1];
    const scores = new Map();

    driverMap.forEach((positions, driverNum) => {
        let total = 0;

        positions.forEach(pos => {
            if (pos == null) return;

            const isSprint = typeof pos === "string" && pos.endsWith("s");
            const position = parseInt(pos);

            if (isNaN(position)) return;

            if (isSprint) {
                if (position <= pointsForPositionSprint.length)
                    total += pointsForPositionSprint[position - 1];
            } else {
                if (position <= pointMap.length)
                    total += pointMap[position - 1];
            }
        });

        scores.set(driverNum, total);
    });

    if (customDrivers) {
        customDrivers.forEach((points, driverName) => {
            scores.set(driverName, points)
        });
    }

    return scores;
}
