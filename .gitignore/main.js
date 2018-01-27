
//CONSTANTES
    const Discord = require("discord.js");
    const music = require("discord.js-music-v11");
    const test = require("./Cmds/test.js")
    const piece = require("./Cmds/piece.js")
    const blague = require("./Cmds/blague.js")
    const help = require("./Cmds/help.js")
    const sb = require("./Cmds/sb.js")
    const mb = require("./Cmds/mb.js")

//VARIABLES
    var bot = new Discord.Client();
    var prefix = ("*")


//CONNECTION DU BOT
    bot.on('ready', function () {

    //ACTIVITE DU BOT
        bot.user.setGame("*help")
        console.log("Bot pret! ");
    });

//TOKEN DU BOT
    bot.login(process.env.TOKEN);

//NPM MUSIQUE
    music(bot, {prefix: "*"}, {anyoneCanSkip: (true)});

//MESSAGE COMMANDE
    bot.on('message', function (message) {
    var voiceChannel = message.member.voiceChannel;

//COMMANDE TEST
    if (message.content === prefix + "?"){
      return test.action(message)
    }
//COMMANDES POUR AFFICHER LA LISTE DES COMMANDES
    //COMMANDE HELP
        if (message.content === prefix + "help"){
            return help.action(message)
        }

    //COMMANDE SOUNDBOX
        if (message.content === prefix + "sb"){
            return sb.action(message)
        }

    //COMMANDE MEMEBOX
        if (message.content === prefix + "mb"){
            return mb.action(message)
        }


//COMMANDE POUR FAIRE UN PILE OU FACE
    if (message.content === prefix + "piece"){
        return piece.action(message)
    }
//COMMANDE BLAGUE RANDOM
    if (message.content === prefix + "blague"){
        return blague.action(message)
        }
//COMMANDES POUR FICHIER AUDIO
    function executeQueue(message, queue) {

        if (messsage.member.voiceChannel) {
            message.member.voiceChannel.join().then(connection => {
                resolve(connection);
            }).catch((error) => {
                message.reply("Vous n'êtes pas dans un channel vocal !")
                console.log(error);
            });
        }
    }
    //COMMANDE DU SON "NANI"
        if (message.content === prefix +  "nani") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/nani.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "OWMS"    
        if (message.content === prefix + "owms") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/owms.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "CH"    
        if (message.content === prefix + "ch") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/ch.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "NDY"    
        if (message.content ===  prefix + "ndy") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/ndy.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "OMG"    
        if (message.content === prefix +  "omg") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/omg.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "POG"    
        if (message.content === prefix +  "pog") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/pog.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "SWAG"    
        if (message.content === prefix +  "swag") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/swag.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "XPLOGOFF"    
        if (message.content === prefix +  "xploff") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/xplogoff.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "XPLOGON"    
        if (message.content === prefix +  "xplon") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/xplogon.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "XPSHUT"    
        if (message.content === prefix +  "xpshut") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/xpshut.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

    //COMMANDE DU SON "XPSTART"    
        if (message.content === prefix +  "xpstart") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/xpstart.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "CC"    
        if (message.content === prefix +  "cc") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/cc.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "GTAMP"
        if (message.content === prefix +  "gtamp") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/gtamp.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "TBC"
        if (message.content === prefix +  "tbc") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/tbc.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "BTCH"
        if (message.content === prefix +  "btch") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/btch.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "DEUS"
        if (message.content === prefix +  "deus") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/deus.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "GCUBE"
        if (message.content === prefix +  "gcube") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/gcube.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "ORA"
        if (message.content === prefix +  "ora") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/ora.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "PBAR"
        if (message.content === prefix +  "pbar") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/pbar.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "PS"
        if (message.content === prefix +  "ps") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/ps.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "TST"
        if (message.content === prefix +  "tw") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/tst.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
    //COMMANDE DU SON "NIG"
        if (message.content === prefix +  "nig") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/nig.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        } 
    //COMMANDE DU SON "JMV"
       if (message.content === prefix +  "jmv") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/jmv.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
                
            })
            .catch(err => console.log(err));  
        } 
     //COMMANDE DU SON "COL"
        if (message.content === prefix +  "col") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/col.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
     //COMMANDE DU SON "BZ"
        if (message.content === prefix +  "bz") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/bz.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }
       //COMMANDE DU SON "NANI"
        if (message.content === prefix +  "oui") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./Audio/OUI.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
            .catch(err => console.log(err));  
        }

//COMMANDE POUR FICHIER GIF
        //COMMANDE DE L'IMAGE "BLOP"
           if (message.content === prefix + "blop"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/11uvS4uiFETcDS/giphy.gif"
                });
            }

        //COMMANDE DE L'IMAGE "SALT"
            if (message.content === prefix + "salt"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/l4Jz3a8jO92crUlWM/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "SCUSE"
            if (message.content === prefix + "scuse"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "KNIFE"
            if (message.content === prefix + "knife"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/xiFTOBC9fEaOI/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "POT"
            if (message.content === prefix + "pot"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/NQ75gA8pPKCZ2/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "BLBL"
            if (message.content === prefix + "blbl"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/bC0caT4xYU8qQ/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "PHOT"
            if (message.content === prefix + "phot"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/byZRNbekKtkxW/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "POL"
            if (message.content === prefix + "pol"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/12IYvE1GQWZsm4/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "VIEW"
            if (message.content === prefix + "view"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/ZjxNuXkYTOlAk/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "BEAR"
            if (message.content === prefix + "bear"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/l41lZyILJyluNm8gw/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "MEN"
            if (message.content === prefix + "men"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/gXch6VhLYZAA/giphy.gif"
                });
            }
//FONCTION
    function wrap(text) {
        return "" + text.replace(/ /g, ' ' + String.fromCharCode(8203)) + "";
        }
    });
