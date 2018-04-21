const commands = require ("./commands")
const Discord = require("discord.js");
const config = require("../config")

module.exports = class sb extends commands {


    static match (message){
        return message.content.startWith(config.prefix + "help")
    }

    static action (message) {

        var sb_embed = new Discord.RichEmbed()
            .setColor("#C600D4")

            .addField(":loud_sound: **__SoundBox__** :loud_sound: ",
                "\n`" + config.prefix + "nani`" +
                "\n`" + config.prefix + "owms`" +
                "\n`" + config.prefix + "ndy`" +
                "\n`" + config.prefix + "omg`" +
                "\n`" + config.prefix + "xploff`" +
                "\n`" + config.prefix + "xplon`" +
                "\n`" + config.prefix + "xpshut`" +
                "\n`" + config.prefix + "xpstart`" +
                "\n`" + config.prefix + "pog`" +
                "\n`" + config.prefix + "ch`" +
                "\n`" + config.prefix + "swag`" +
                "\n`" + config.prefix + "cc`" +
                "\n`" + config.prefix + "gtamp`" +
                "\n`" + config.prefix + "tbc`" +
                "\n`" + config.prefix + "btch`" +
                "\n`" + config.prefix + "deus`" +
                "\n`" + config.prefix + "gcube`" +
                "\n`" + config.prefix + "ora`" +
                "\n`" + config.prefix + "pbar`" +
                "\n`" + config.prefix + "ps`" +
                "\n`" + config.prefix + "tw`" +
                "\n`" + config.prefix + "nig`" +
                "\n`" + config.prefix + "jmv`" +
                "\n`" + config.prefix + "col`" +
                "\n`" + config.prefix + "bz`" +
                "\n`" + config.prefix + "oui`" +
                "\n`" + config.prefix + "osk`" +
                "\n"
            )

            .setFooter("[WIP]")

        message.delete();
        message.author.createDM().then(channel => {
            channel.send(sb_embed);
        });
        console.log("SoundBox demandé")

    }
}
