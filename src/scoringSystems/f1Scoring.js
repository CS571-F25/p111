export function calculateF1StandardScores(driverMap) {
    const pointsForPosition = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
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
                if (position <= pointsForPosition.length)
                    total += pointsForPosition[position - 1];
            }
        });

        scores.set(driverNum, total);
    });

    return scores;
}
