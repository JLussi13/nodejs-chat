const expect = require("expect");

var {Users} = require("./users");

describe('Users', () => {
    var users; 

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: "Bitch",
            room: "Mothafucka"
        }, {
            id: 2,
            name: "Boe",
            room: "Mothafucka"
        }, {
            id: 3,
            name: "Hondor",
            room: "Hopodopo"
        }];
    });

    it("Should add a user to the Users object", () => {
        var users = new Users();
        var user = {
            id: 1234,
            name: "Jams",
            room: "Death Cult Armageddon"
        }

        var res = users.addUser(user.id, user.name, user.room);
        expect((res) => {
            expect(users.users).toContain(user);
            expect(res.id).toBe(user.id);
            expect(res.name).toBe(user.name);
            expect(res.room).toBe(user.room)
        })

    })

    it("Should return a list of all names in a room", () => {
        var res = users.getUserList("Mothafucka");

        expect(res).toContain("Bitch");
        expect(res).toContain("Boe");
    })

    it("Should return a user from an id", () => {
        var res = users.getUser(1);
        expect(res).toBe(users.users[0]);
    })

    it("Should not return a user from an id", () => {
        var res = users.getUser(10);
        expect(res).toBe(undefined);
    })

    it("Should remove a user from an id", () => {
        var res = users.removeUser(1);
        expect(res.name).toBe("Bitch");
        expect(users.users.length).toBe(2);
    })

    it("Should not remove a user from an id", () => {
        var res = users.removeUser(10);
        expect(res).toBe(undefined);
        expect(users.users).toBe(users.users);
    })
})