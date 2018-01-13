const commands = require ("./commands")
const Discord = require("discord.js");

module.exports = class mb extends commands {


    static match (message){
        return message.content.startWith(prefix + "mb")
    }

    static action (message) {

        var meme_sembed = new Discord.RichEmbed()
            .setColor("#FEFE00")
            .addField(":space_invader:  **__MemeBox__** :space_invader: ","`*blop` \n`*salt` \n`*scuse` \n`*knife` \n`*pot` \n`*blbl` \n`*phot` \n`*pol` \n`*view` \n`*men` \n`*bear` \n")
            .setFooter("[WIP]")
            message.delete();
            message.channel.sendEmbed(meme_sembed);
            console.log("MemeBox demandé")
    }
}