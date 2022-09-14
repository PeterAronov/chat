// test() function isn't being loaded in with anything like a require.
// jest provides the test() function as a global env

require('dotenv').config({ path:__dirname + '/../config/test.env' }); // Default: path.resolve(process.cwd(), '.env')
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
            const message = await request.get("/messages/630d4cc2d9d042f6007a9a0b").expect(status.OK);
            expect(message.body.name).toBe("Tom");
        });

        it("Should return 404 not found for a specific id", async () => {
            const message = await request.get("/messages/630d4cc2d9d042f6007a9a02").expect(status.NOT_FOUND);
        });
    });
    
    describe("POST /", () => {
        let messageId = "";

        it("Should return 200 OK", async () => {
            const message = await request
                .post("/messages")
                .send({
                    name: "Tom",
                    text: "Hello World"
                }).expect(status.CREATED);
        });

        it("Should check if the last message is what we sent", async () => {
            const messages = await request.get("/messages").expect(status.OK);
            const messagesLength = messages.body.length - 1;
            messageId = messages.body[messagesLength]._id;
            expect(messages.body[messagesLength].text).toBe("Hello World");
        })

        it("Should delete the last message sent", async () => {
            console.log(messageId)
            const messages = await request.delete("/messages/" + messageId).expect(status.OK);
        })
    }
    );
    
    describe("PATCH /", () => {
        let messagesArray = [];
        let textOld = "";
        let messagesLength = 0;
        let lastMessageId = "";
        const textNew = "This is a test";

        it("Should receive all the messages", async () => {
            const messages = await request.get("/messages").expect(status.OK);
            messagesArray = messages.body;
            messagesLength = messagesArray.length - 1;
            textOld = messagesArray[messagesLength].text;
            lastMessageId = messagesArray[messagesLength]._id;
        })

        it("Should change the text of the last message", async () => {
            const message = await request
                .patch("/messages/" + lastMessageId)
                .send({
                    text: textNew
                })
                .expect(status.OK);
        })

        it("Should check if the text did changed", async () => {
            const message = await request.get("/messages/" + lastMessageId).expect(status.OK);
            expect(message.body.text).toBe(textNew);
        });

        it("Should change the text of the last message back", async () => {
            const message = await request
                .patch("/messages/" + lastMessageId)
                .send({
                    text: textOld
                })
                .expect(status.OK);
        })

        it("Should check if the text did changed back", async () => {
            const message = await request.get("/messages/" + lastMessageId).expect(status.OK);
            expect(message.body.text).toBe(textOld);
        });
    })
}
);