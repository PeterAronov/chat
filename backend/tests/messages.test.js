// test() function isn't being loaded in with anything like a require.
// jest provides the test() function as a global env

require('dotenv').config({ path:__dirname + '/../config/test.env' }); // Default: path.resolve(process.cwd(), '.env')
console.log(__dirname)
console.log(process.cwd())
const supertest = require("supertest");
const server = require("../app");
const status = require('http-status');
request = supertest(server); // supertest is a function that takes in a server and returns a supertest object. The IP and the Port are taken from 

describe("Messages", () => {
    describe("GET /", () => {
        it("Should return 200 OK", async () => {
            expect.assertions(1);
            try {
                const messages = await request.get("/messages").expect(status.OK);
                expect(messages.status).toBe(status.OK);
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
        let messageId = "";

        it("Should return 200 OK", async () => {
            const message = await request
                .post("/messages")
                .send({
                    user_name: "Tom",
                    text: "Hello World"
                }).expect(status.CREATED);
        });

        it("Should check if the last message is what we sent", async () => {
            const messages = await request.get("/messages").expect(status.OK);
            const messagesLength = messages.body.messages.length - 1;
            messageId = messages.body.messages[messagesLength].id;
            expect(messages.body.messages[messagesLength].text).toBe("Hello World");
        })

        it("Should delete the last message sent", async () => {
            const messages = await request.delete("/messages/" + messageId).expect(status.OK);
        })
    }
    );


    describe("PUT /", () => {
        let messagesArray = [];
        let textOld = "";
        let messagesLength = 0;
        let lastMessageId = "";
        const textNew = "This is a test";

        it("Should receive all the messages", async () => {
            const messages = await request.get("/messages").expect(status.OK);
            messagesArray = messages.body.messages;
            messagesLength = messagesArray.length - 1;
            textOld = messagesArray[messagesLength].text;
            lastMessageId = messagesArray[messagesLength].id;
        })

        it("Should change the text of the last message", async () => {
            const message = await request
                .put("/messages/" + lastMessageId)
                .send({
                    text: textNew
                })
                .expect(status.OK);
        })

        it("Should check if the text did changed", async () => {
            const message = await request.get("/messages/" + lastMessageId).expect(status.OK);
            expect(message.body.message.text).toBe(textNew);
        });

        it("Should change the text of the last message back", async () => {
            const message = await request
                .put("/messages/" + lastMessageId)
                .send({
                    text: textOld
                })
                .expect(status.OK);
        })

        it("Should check if the text did changed back", async () => {
            const message = await request.get("/messages/" + lastMessageId).expect(status.OK);
            expect(message.body.message.text).toBe(textOld);
        });
    })
}
);