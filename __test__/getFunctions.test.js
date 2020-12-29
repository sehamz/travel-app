import { getGeoData, getWeatherData, getPixData } from "../src/client/js/getFunctions"

describe("Testing GET functions:", () => {
    test("getGeoData Test", () => {
        expect(getGeoData).toBeDefined();
    })
    test("getWeatherData Test", () => {
        expect(getWeatherData).toBeDefined();
    })
    test("getPixData Test", () => {
        expect(getPixData).toBeDefined();
    })
});