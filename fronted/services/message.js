class MessageService {
    static getAllMessages = async () => {
        try {
            const response = await axios.get('/messages');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    
    static postMessage = async (userName, messageText) => {
        const newMessage = {
            name: userName,
            text: messageText
        };
        
        try {
            await axios.post('/messages/', newMessage);
        } catch (error) {
            console.log(error);
        }
    }
    
    static deleteMessage = async (messageId) => {
        try {
            await axios.delete('/messages/' + messageId);
        } catch (error) {
            console.log(error);
        }
    }
}