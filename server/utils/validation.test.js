const expect = require("expect");

var {isRealString} = require("./validation");

describe("isRealString", () => {
    it("Should validate a real string", () => {
        var string = "This is a valid string";
        var res = isRealString(string);

        expect(res).toBe(true);
    })

    it("Should reject non string values", () => {
        var string = true;
        var res = isRealString(string);

        expect(res).toBe(false);
    })

    it("Should reject strings with only spaces", () => {
        var string = "     ";
        var res = isRealString(string);

        expect(res).toBe(false);
    })
})