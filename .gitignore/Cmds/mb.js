const commands = require ("./commands")
const Discord = require("discord.js");
const config = require("../config")

module.exports = class mb extends commands {


    static match (message){
        return message.content.startWith(config.prefix + "help")
    }

    static action (message) {

        var meme_sembed = new Discord.RichEmbed()
            .setColor("#FEFE00")

            .addField(":space_invader:  **__MemeBox__** :space_invader: ",
                "\n`" + config.prefix + "blop`" +
                "\n`" + config.prefix + "salt`" +
                "\n`" + config.prefix + "scuse`" +
                "\n`" + config.prefix + "knife`" +
                "\n`" + config.prefix + "pot`" +
                "\n`" + config.prefix + "blbl`" +
                "\n`" + config.prefix + "phot`" +
                "\n`" + config.prefix + "pol`" +
                "\n`" + config.prefix + "view`" +
                "\n`" + config.prefix + "men`" +
                "\n`" + config.prefix + "bear`" +
                "\n"
            )

            .setFooter("[WIP]")

        message.delete();
        message.author.createDM().then(channel => {
            channel.send(meme_sembed);
        });
        console.log("MemeBox demandé")

    }
}
