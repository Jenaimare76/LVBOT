const commands = require ("./commands")

module.exports = class piece extends commands {


    static match (message){
        return message.content.startWith(prefix + "piece")
    }

    static action (message) {
        var randnum = 0;
        random();
        message.delete();

        if (randnum == 1){
            message.reply("Face !");
            console.log("Reponse random 1")
        }
        if (randnum == 2){
            message.reply("Pile !");
            console.log("Reponse random 2")
        }
        function random(min1, max1) {
            min1 = Math.ceil(1);
            max1 = Math.floor(2);
            randnum = Math.floor(Math.random() * (max1 - min1 +1) + min1);
        }
    }
}