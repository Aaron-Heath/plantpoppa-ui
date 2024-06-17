import dayjs from "dayjs";

export const daysdiff = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    
    return Math.abs(endDate.diff(startDate, 'day'));
} 
