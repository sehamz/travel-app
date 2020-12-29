import {
    handleSubmit,
    UpdateUserInterface,
    UpdateUserInterfaceWithoutImg,
    postTripData,
    getTripsData,
    addTrip,
    showAllTrips
} from "../src/client/js/formHandler"
describe("Testing:", () => {
    test("handleSubmit() Test", () => {
        expect(handleSubmit).toBeDefined();
    })
    test("UpdateUserInterface Test", () => {
        expect(UpdateUserInterface).toBeDefined();
    })
    test("UpdateUserInterfaceWithoutImg Test", () => {
        expect(UpdateUserInterfaceWithoutImg).toBeDefined();
    })
    test("postTripData Test", () => {
        expect(postTripData).toBeDefined();
    })
    test("getTripsData Test", () => {
        expect(getTripsData).toBeDefined();
    })
    test("addTrip Test", () => {
        expect(addTrip).toBeDefined();
    })
    test("showAllTrips Test", () => {
        expect(showAllTrips).toBeDefined();
    })
});