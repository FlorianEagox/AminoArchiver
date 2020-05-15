let parentSelector = '.message-list > *';
let messageClass = 'chat-message';
let sentFromMe = 'from-me';
class Message {
	constructor(userID, messageText, timestampID) {
		this.userID = userID;
		this.messageText = messageText;
		this.timestampID = timestampID;
	}
	static generateFromHTML(item) {
		// Gets the element containing the actual message content
		console.log(item)
		let messageText = item.children[1].children[item.classList.contains(sentFromMe) ? 0 : 1].innerText;

		return new Message(null, messageText, null);
	}
}
async function parseMessages() {
	let chatItems = document.querySelectorAll(parentSelector);
	let messages = [];
	await (chatItems.forEach(item => {
		if (item.classList.contains(messageClass))
			messages.push(Message.generateFromHTML(item));
	}));

	messages.forEach(message => console.log(message.messageText));
}
parseMessages();
