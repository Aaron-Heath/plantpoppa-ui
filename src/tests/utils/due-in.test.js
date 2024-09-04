import { getPlantTaskDueStatement } from "../../utils/dates";
import dayjs from "dayjs";

const today = dayjs();

describe('getPlantTaskDueStatement', () => {
    // Testing due statements created from this function

    it("should take today's date and return \"Due today\"", () => {
        const expected = "Due today";
        expect(getPlantTaskDueStatement(today)).toEqual(expected);
    })
    it("should take tomorrow's date and return \"Due tomorrow\"", () => {
        const tomorrow = today.add(1, "days");
        const expected = "Due tomorrow";
        expect(getPlantTaskDueStatement(tomorrow)).toEqual(expected);
    });

    it("should take the date 7 days from now and return \"Due in 7 days\"", () => {

        const dueDate = today.add(7, "days");
        const expected = "Due in 7 days";
        expect(getPlantTaskDueStatement(dueDate)).toEqual(expected);
    });

    it("should take a passed date and return \"Due 4 days ago\"", () => {
        const dueDate = today.subtract(4, "day");
        const expected = "Due 4 days ago";
        expect(getPlantTaskDueStatement(dueDate)).toEqual(expected);
    })
})
