class MessageService {
    getAllMessages = async () => {
        try {
            const response = await axios.get('/messages');
            displayAllMessages(response.data); // response.data is an array of object messages
        } catch (error) {
            console.error(error);
        }
    }
    
    const postMessage = async (messageText) => {
        const newMessage = {
            name: getLocalStorageUserName(),
            text: messageText
        };
    
        try {
            await axios.post('/messages/', newMessage);
        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteMessage = async (messageId) => {
        try {
            await axios.delete('/messages/' + messageId);
        } catch (error) {
            console.log(error);
        }
    }
}

