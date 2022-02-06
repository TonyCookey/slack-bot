async function helloGreeting({ message, say }) {
    // Acknowledge command request
    await ack();
    // respond to the command
    await say('Welcome. How are you doing?');
}

module.exports = helloGreeting