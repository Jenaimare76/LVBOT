const commands = require ("./commands")

module.exports = class test extends commands {


    static match (message){
        return message.content.startWith(prefix + "?")
    }

    static action (message) {

        message.delete();
        message.channel.sendMessage("ON")
    }
}