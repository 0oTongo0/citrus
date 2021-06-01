import { createApp, h, reactive } from 'vue';
import MessageComponent from './MessageComponent.vue';
let messageList = reactive([]);
let timer = 3000;

function handleData(type, title) {
    messageList.push({ type, title });
    setTimeout(() => {
        messageList.shift();
    }, timer)

    let app = createApp({
        render() {
            return h(MessageComponent, { messageList });
        },
    })

    app.mount('#message');
}

class MessageClass {
    info(title) {
        handleData('info', title)
    }

    wraning(title) {
        handleData('wraning', title)
    }

    success(title) {
        handleData('success', title)
    }

    error(title) {
        handleData('error', title)
    }
}

const Message = new MessageClass();
export default Message;