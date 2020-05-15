console.clear();
let parentSelector = '.message-list > *';
let messageClass = 'user-message';
let sentFromMe = 'from-me';
let timeStampClass = 'timestamp';
class Message {
	constructor(userID, messageText, timestampID) {
		this.userID = userID;
		this.messageText = messageText;
		this.timestampID = timestampID;
	}
	static generateFromHTML(item, currentTimestamp) {
		// Get the text of messages, if the message is sent from the user, get the 0th child, otherwise, get the first child.
		let messageText = item.children[1].children[item.classList.contains(sentFromMe) ? 0 : 1].innerText;
		return new Message(null, messageText, currentTimestamp);
	}
}
function parseMessages() {
	let chatItems = document.querySelectorAll(parentSelector);
	let messages = [];
	let timestamps = [];
	currentTimestamp = -1;
	chatItems.forEach(item => {
		if (item.classList.contains(messageClass)) {
			// TODO change the way the class is generated
			let timestamp = timestamps[currentTimestamp];
			messages.push(Message.generateFromHTML(item, timestamp != null ? currentTimestamp : null));
		} else if (item.classList.contains(timeStampClass)) {
			timestamps.push(item.innerText);
			currentTimestamp++;
		}
	});

	messages.forEach(message =>
		console.log(timestamps[message.timestampID], message.messageText));
}
parseMessages();
