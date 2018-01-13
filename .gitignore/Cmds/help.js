const commands = require ("./commands")
const Discord = require("discord.js");

module.exports = class help extends commands {


    static match (message){
        return message.content.startWith(prefix + "help")
    }

    static action (message) {

        var help_embed = new Discord.RichEmbed()
            .setColor("#A50000")
            .addField(":wrench: **__Liste des commandes__** :wrench:", "`*help` *pour avoir la liste des commandes.* \n ")
            .addField(":musical_note: **__Musique__** :musical_note:", "`*play` *suivi d'un lien youtube pour avoir de la musique* \n`*leave` *pour stopper toutes les musiques.* \n`*skip (0-20)` *passe à la musique suivante. * \n`*clearqueue` *effacer la playlist* \n`*queue` *afficher la playlist actuelle* \n`*Pause` *mettre en pause la musique.* \n`*Resume` *arreter la pause.* \n`*Volume [1-200]` *modfier le volume (default: 50).* ")
            .addField(":question: **__Divers__** :question: ", "`*piece` *pour faire un pile ou face.* \n`*sb` *pour voir la SoundBox* \n`*blague` *à vos risque et péril* \n `*?` *pour tester l'activité du Bot* \n `*mb` *pour avoir la liste des meme* ")
            .setFooter("[WIP]")
            message.delete();
            message.channel.sendEmbed(help_embed);
            console.log("Help demandé")

    }
}