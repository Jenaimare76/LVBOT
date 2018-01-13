const commands = require ("./commands")
const Discord = require("discord.js");

module.exports = class sb extends commands {


    static match (message){
        return message.content.startWith(prefix + "sb")
    }

    static action (message) {

        var sb_embed = new Discord.RichEmbed()
            .setColor("#C600D4")
            .addField(":loud_sound: **__SoundBox__** :loud_sound: ","`*nani` \n`*owms` \n`*ndy` \n`*omg` \n`*xploff` \n`*xplon` \n`*xpshut` \n`*xpstart` \n`*pog` \n`*ch` \n`*swag` \n`*cc` \n`*gtamp` \n`*tbc` \n`*btch` \n`*deus` \n`*gcube` \n`*ora` \n`*pbar` \n`*ps` \n`*tw` \n`*nig` \n`*jmv` \n")
            .setFooter("[WIP]")
            message.delete();
            message.channel.sendEmbed(sb_embed);
            console.log("SoundBox demandé")
    }
}