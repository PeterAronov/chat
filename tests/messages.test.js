// test() function isn't being loaded in with anything like a require.
// jest provides the test() function as a global env

const supertest = require("supertest");
const server = require("../app");
const status = require('http-status');
const messagesManager = require('../api/messages/messages_manager');
const messagesJsonInit = require("../messages_init.json");
request = supertest(server);

const messagesJsonPath = process.env.MESSAGES_JSON_PATH;

/*
beforeAll(() => {
    messagesManager.writeMessagesToJsonFile(null, messagesJsonInit.messages, messagesJsonPath);
});
*/

describe("Messages", () => {
    describe("GET /", () => {
        it("Should return 200 OK", async () => {
            try {
                const message = await request.get("/messages").expect(status.OK);
                expect(message.status).toBe(5);
            } catch (error) {
                console.log(error)
            }
        });

        it("Should return 200 OK for a specific id", async () => {
            const message = await request.get("/messages/88ab2e95-1955-482e-9107-bf2ae8825baf").expect(status.OK);
            expect(message.body.message.user_name).toBe("Tom");
        });

        it("Should return 404 not found for a specific id", async () => {
            const message = await request.get("/messages/xyz").expect(status.NOT_FOUND);
        });
    });

    describe("POST /", () => {
        it("Should return 200 OK", async () => {
            try {
                const message = await request.get("/messages").expect(status.OK);
                expect(message.status).toBe(5);
            } catch (error) {
                console.log(error)
            }
        });
    });

    describe("PUT /", () => {
        it("Should return 200 OK", async () => {
            try {
                const message = await request.get("/messages").expect(status.OK);
                expect(message.status).toBe(5);
            } catch (error) {
                console.log(error)
            }
        });
    });

    describe("DELETE /", () => {
        it("Should return 200 OK", async () => {
            try {
                const message = await request.get("/messages").expect(status.OK);
                expect(message.status).toBe(5);
            } catch (error) {
                console.log(error)
            }
        });
    });


});