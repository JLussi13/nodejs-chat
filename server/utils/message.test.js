const expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe('generateMessage', () => {
    it("Should create correct message object", () => {
        var from = "admin";
        var text = "testing out generate message"

        var res = generateMessage(from, text)
        expect((res) => {
            expect(res.from).toBe(from);
            expect(res.text).toBe(text);
            expect(typeof res.createdAt).toBe('number')
        })

    })
})

describe('generateLocationMessage', () => {
    it("Should return the location of the user", () => {
        var from = "admin";
        var lat = 33.0010965;
        var lng = 96.7170405;
        var url = `https://www.google.com/maps/place/${lat},${lng}`

        var res = generateLocationMessage(from, lat, lng);
        expect(res.from).toBe(from);
        expect(res.url).toBe(url);
        expect(typeof res.createdAt).toBe('number');
    })
})