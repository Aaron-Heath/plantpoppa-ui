import dayjs from "dayjs";

export const daysdiff = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    
    return Math.abs(endDate.diff(startDate, 'day'));
} 

export const getPlantTaskDueStatement = (nextWatering) => {
    const today = dayjs();
    const dayjsNextWatering = dayjs(nextWatering);
    // DayJS is date exclusive by default. Add 1 to correct the miscount
    const waterIn = dayjsNextWatering.diff(today, "day") + 1;
    let dueStatement;

    if(today.isSame(dayjsNextWatering, "day")) {
        dueStatement = "Due today";
    } else if (waterIn === 1) {
        dueStatement = "Due tomorrow";
    } else if (waterIn > 1) {
        dueStatement = "Due in " + waterIn + " days"
    } else {
        // For negative values, the +1 is unneeded. Subtracting 1 to compensate
        dueStatement = "Due " + Math.abs(waterIn - 1) + " days ago";
    }

    return dueStatement;
}
