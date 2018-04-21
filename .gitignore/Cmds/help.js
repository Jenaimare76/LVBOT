const commands = require ("./commands")
const Discord = require("discord.js");
const config = require("../config")

module.exports = class help extends commands {


    static match (message){
        return message.content.startWith(config.prefix + "help")
    }

    static action (message) {

        var help_embed = new Discord.RichEmbed()
            .setColor("#A50000")

            .addField(":page_facing_up:  **__Liste des commandes__** :page_facing_up: ",
                "\n`" + config.prefix + "help` *pour avoir la liste des commandes.*" +
                "\n`" + config.prefix + "sb` *pour voir la SoundBox*" +
                "\n`" + config.prefix + "mb` *pour avoir la liste de meme* " +
                "\n "
            )

            .addBlankField()

            .addField(":wrench: **__Administration__** :wrench:",
                "\n`" + config.prefix + "purge [2-100]` *pour supprimer un certain nombre de messages*" +
                "\n "
            )

            .addBlankField()

            .addField("🎶 **__Musique__** 🎶",
                "\n`" + config.prefix + "play [lien, nom]` *pour avoir de la musique*" +
                "\n`" + config.prefix + "stop` *pour stopper toutes les musiques.*" +
                "\n`" + config.prefix + "skip ` *passe à la musique suivante.*" +
                "\n`" + config.prefix + "np` *pour afficher la musique actuellement jouée*" +
                "\n`" + config.prefix + "queue` *afficher la playlist actuelle*" +
                "\n`" + config.prefix + "Pause` *mettre en pause la musique.*" +
                "\n`" + config.prefix + "Resume` *arreter la pause.*" +
                "\n`" + config.prefix + "Volume [1-5]` *modfier le volume (default: 2).*" +
                "\n "
            )

            .addBlankField()

            .addField(":question: **__Divers__** :question: ",
                "\n`" + config.prefix + "opggl [Pseudo]` *pour voir un profil opgg League Of Legends.*" +
                "\n`" + config.prefix + "opggo [Pseudo]` *pour voir un profil opgg Overwatch.*" +
                "\n`" + config.prefix + "opggp [Pseudo]` *pour voir un profil opgg PUBG.*" +
                "\n`" + config.prefix + "g [Theme]` *pour envoyer un gif random à partir d'un thème*." +
                "\n`" + config.prefix + "blague` *à vos risque et péril*." +
                "\n`" + config.prefix + "piece` *pour faire un pile ou face.*" +
                "\n`" + config.prefix + "de` *pour faire un lancé de dé de 6.*" +
                "\n`" + config.prefix + "server` *pour avoir des informations sur le serveur*." +
                "\n`" + config.prefix + "bot` *pour avoir des informations sur le bot*." +
                "\n`" + config.prefix + "?` *pour tester l'activité du bot*." +
                "\n "
            )

            .addBlankField()

            .setFooter("[WIP]")

        message.delete();
        message.author.createDM().then(channel => {
            channel.send(help_embed);
        });

        console.log("Help demandé")

    }
}
