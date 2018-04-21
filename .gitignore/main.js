//CONSTANTES

    const { Client, Util } = require("discord.js");  
    const Discord = require("discord.js");  
    const snekfetch = require("snekfetch");
    const config = require("./config.json");
    const request = require("superagent");
    const test = require("./Cmds/test.js");
    const piece = require("./Cmds/piece.js");
    const blague = require("./Cmds/blague.js");
    const got = require("got");
    const YouTube = require('simple-youtube-api');
    const ytdl = require('ytdl-core');
    const youtube = new YouTube(config.youtube_key);
    const queue = new Map();
    const bot = new Client({ disableEveryone: true });
    const giphy = require('giphy-api')(config.giphy_key);
    const moment = require('moment');
    require('moment-duration-format');

//VARIABLES
//CONNECTION DU BOT
    bot.on('ready', function () {
        
        //ACTIVITE DU BOT
        bot.user.setGame(config.prefix + "help")
        console.log("Bot pret!");
    });
    
//TOKEN DU BOT
    bot.login(config.token);
    
//MESSAGE COMMANDE
    bot.on('message', async message => {
        if (message.author.bot) return;
        if (message.content.indexOf(config.prefix) !== 0) return;
        
        const voiceChannel = message.member.voiceChannel;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(message.guild.id);
        const command = args.shift().toLowerCase();
        
//COMMANDE MUSIC
    //COMMANDE PLAY
        if (command === 'play') {

            message.delete(1000);

            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('Veuillez allez dans un salon vocal!');
            const permissions = voiceChannel.permissionsFor(message.client.user);

            if (!permissions.has('CONNECT')) {
                return message.channel.send('Je ne peux pas me connecter dans le salon vocal, veuillez verifier si les bonne permissions son misent !');
            }

            if (!permissions.has('SPEAK')) {
                return message.channel.send('Je ne peux pas parler dans le salon vocal, veuillez verifier si les bonne permission son misent !');
            }

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();

                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }

                return message.channel.send(`✅ Playlist: **${playlist.title}** a été rajouté à la liste!`).then(msg => msg.delete(5000));

            } else {

                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {

                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        let index = 0;
                        message.channel.send("```GLSL" + "\n# Musique sélection:" + videos.map(video2 => `\n${++index} - ${video2.title}`) + "\n// Veuillez écrire [1-10] pour sélectionner une musique parmi celles proposées.```").then(msg => msg.delete(12500));
                        // eslint-disable-next-line max-depth

                        try {
                            var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                maxMatches: 1,
                                time: 12500,
                                errors: ['time']
                            });

                        } catch (err) {
                            console.error(err);
                            return message.channel.send('Invalide ou aucune valeur, sélection de musique annulée .').then(msg => msg.delete(5000));
                        }

                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);

                    } catch (err) {
                        console.error(err);
                        return message.channel.send('🆘 Aucun resultat de recherche trouvé.');
                    }

                }

                return handleVideo(video, message, voiceChannel);
            }

        }

    //COMMANDE SKIP
        if (command === 'skip') {
            message.delete();
            if (!message.member.voiceChannel) return message.channel.send('Vous devez être dans un salon vocal pour passer la musique !');
            if (!serverQueue) return message.channel.send('Impossible de passer, aucune musique est jouée.');
            serverQueue.connection.dispatcher.end('Musique passée !');
            return undefined;
        }

    //COMMANDE STOP
        if (command === 'stop') {
            message.delete();
            if (!message.member.voiceChannel) return message.channel.send('Vous devez être dans un salon vocal pour stoper la musique !');
            if (!serverQueue) return message.channel.send('Stop impossible, aucune musique est jouée.');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Musique stop !');
            return undefined;
        }

    //COMMANDE VOLUME-
        if (command === 'volume') {
            message.delete();
            if (!message.member.voiceChannel) return message.channel.send('Vous devez être dans un salon vocal pour modifier le volume !');
            if (!serverQueue) return message.channel.send('Modification du volume impossible, aucune musique est jouée.');
            if (!args[1]) return message.channel.send(`Le volume actuel est: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            return message.channel.send(`Volume mit à: **${args[1]}**`);
        }

    //COMMANDE NP
        if (command === 'np') {
            message.delete();
            if (!serverQueue) return message.channel.send('Aucune musique est jouée.');
            return message.channel.send(`🎶 Musique actuellement jouée: **${serverQueue.songs[0].title}**`).then(msg => msg.delete(5000));;
        }

    //COMMANDE QUEUE
        if (command === 'queue') {
            message.delete();
            if (!serverQueue) return message.channel.send('Aucune musique en attente.');
            let index = 0;
            return message.channel.send("```GLSL" + "\n# Liste des musiques:" + serverQueue.songs.map(song => `\n${++index} - ${song.title}`) + "\n" + "\n// Musique actuellement jouée: \n// " + serverQueue.songs[0].title + "```").then(msg => msg.delete(10000));
        }

    //COMMANDE PAUSE
        if (command === 'pause') {
            message.delete();
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send('⏸ Musique en pause !');
            }
            return message.channel.send('Pause impossible, aucune musique est jouée.');
        }

    //COMMANDE RESUME
        if (command === 'resume') {
            message.delete();
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return message.channel.send('▶ Musique relancée !');
            }
            return message.channel.send('Redémarrage impossible, aucune musique est jouée.');
        }

//COMMANDE SAY
    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });

        message.channel.send(sayMessage);
    }
//COMMANDE PURGE
    if (command === "purge") {

        message.delete();

        if (!message.member.roles.some(r => ["Purge"].includes(r.name)))
            return message.reply("Vous n'avez les permissions d'utiliser ça !");

        if (!args[0] || args < 2 || args > 100) return message.channel.send("Veuillez faire " + "`" + config.prefix + "purge [2-100]`").then(message.delete());
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send("Effacer " + args + " message(s).").then(msg => msg.delete(5000));
        });

    }
//COMMANDE DE
    if (command === "de") {
        var randde = 0;
        random1()
        message.delete();
        message.channel.send("Le dé est tombé sur " + randde)

    }

//COMMANDE INFO BOT
    if (command === "bot") {
        const GetUptime = bot => {
            return moment.duration(bot.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]');
        };


        let uptime = GetUptime(bot)
        let boticon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("**__Information du Bot__**")
        .setColor("#B9121B")
        .setThumbnail(boticon)
        .addField("Nom : ", bot.user.username)
        .addField("Créé le : ", bot.user.createdAt)
        .addField("Temps d'activité :", uptime)
        .addField("Version :", "0.3")
        .addField("Créé par :", "**Luffy Vanquish**#4716")
        
        message.delete();
        return message.channel.send(botembed)
    }

//COMMANDE INFO SERVER
    if (command === "server") {

        let servicon = message.guild.displayAvatarURL;
        let servembed = new Discord.RichEmbed()
        .setDescription("**__Information du serveur__**")
        .setColor("#2BFE01")
        .setThumbnail(servicon)
        .addField("Nom : ", message.guild.name)
        .addField("Créé le : ", message.guild.createdAt)
        .addField("Vous avez rejoins le :", message.member.joinedAt)
        .addField("Il y a", message.guild.memberCount + " personnes.")

        
        message.delete();
        return message.channel.send(servembed)
    }

//COMMANDE GIPHY
    if (command === "g"){
        const gif = message.content.split(" ").slice(1);
        
        
        if (gif.length < 1) return message.channel.send("Veuillez inserez un theme: " + "`" + config.prefix + "g [theme]`")
        const res = await got("http://api.giphy.com/v1/gifs/random?api_key=" + config.giphy_key + "&tag=" + encodeURIComponent(gif.join(" ")), {json: true})
        if (!res || !res.body || !res.body.data.image_url) return message.channel.send("Impossible de trouver un Gif correspondant.")
        
        const GifEmbed = new Discord.RichEmbed()
        .setImage(res.body.data.image_url)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)

        message.channel.send({embed: GifEmbed});
        message.delete();

    }

//COMMANDE OPGGL
    if (command === "opggl") {
        const Name = args.join(" ");
        message.delete().catch(O_o => { });

        if (!Name) {
            message.delete();
            message.reply("Veuillez mettre un pseudo League Of Legends Valide ! " + "`" + config.prefix + "opggl [Pseudo]`").then(msg => msg.delete(5000))
        } else {
            message.delete();
            message.channel.send("http://euw.op.gg/summoner/userName=" + Name)
        }
    }

//COMMANDE OPGGL
    if (command === "opggo") {
        const Name = args.join(" ");
        message.delete().catch(O_o => { });

        if (!Name) {
            message.delete();
            message.reply("Veuillez mettre un pseudo Overwatch ou BattleTag#1234 valide ! " + "`" + config.prefix + "opggo [Pseudo]`").then(msg => msg.delete(5000))
        } else {
            message.delete();
            message.channel.send("https://overwatch.op.gg/search/?playerName=" + Name)
        }
    }

//COMMANDE OPGGL
    if (command === "opggp") {
        const Name = args.join(" ");
        message.delete().catch(O_o => { });

        if (!Name) {
            message.delete();
            message.reply("Veuillez entrer un pseudo PUBG valide ! " + "`" + config.prefix + "opggp [Pseudo]`").then(msg => msg.delete(5000))
        } else {
            message.delete();
            message.channel.send("https://pubg.op.gg/user/" + Name)
        }
    }

//COMMANDE TEST
    if (command ==="?"){
      return test.action(message)
    }
//COMMANDES POUR AFFICHER LA LISTE DES COMMANDES
    //COMMANDE HELP
        if (command ==="help"){
            
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

    //COMMANDE SOUNDBOX
        if (command ==="sb"){
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

    //COMMANDE MEMEBOX
        if (command ==="mb"){
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


//COMMANDE POUR FAIRE UN PILE OU FACE
    if (command ==="piece"){
        return piece.action(message)
    }
//COMMANDE BLAGUE RANDOM
    if (command ==="blague"){
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
        if (command === "nani") {

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
        if (command ==="owms") {

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
        if (command ==="ch") {

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
        if (command === "ndy") {

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
        if (command === "omg") {

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
        if (command === "pog") {

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
        if (command === "swag") {

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
        if (command === "xploff") {

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
        if (command === "xplon") {

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
        if (command === "xpshut") {

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
        if (command === "xpstart") {

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
        if (command === "cc") {

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
        if (command === "gtamp") {

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
        if (command === "tbc") {

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
        if (command === "btch") {

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
        if (command === "deus") {

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
        if (command === "gcube") {

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
        if (command === "ora") {

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
        if (command === "pbar") {

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
        if (command === "ps") {

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
        if (command === "tw") {

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
        if (command === "nig") {

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
       if (command === "jmv") {

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
        if (command === command === "col") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Audio/col.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
                .catch(err => console.log(err));
        }
    //COMMANDE DU SON "BZ"
        if (command === "bz") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Audio/bz.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
                .catch(err => console.log(err));
        }
    //COMMANDE DU SON "OUI"
        if (command === "oui") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Audio/OUI.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
                .catch(err => console.log(err));
        }
    //COMMANDE DU SON "OSK"
        if (command === "osk") {

            message.delete();
            if (message.member.voiceChannel === undefined) return message.reply(wrap("Vous n\'êtes pas dans un channel vocal !"));
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Audio/osk.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            })
                .catch(err => console.log(err));
        }

//COMMANDE POUR FICHIER GIF
        //COMMANDE DE L'IMAGE "BLOP"
           if (command ==="blop"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/11uvS4uiFETcDS/giphy.gif"
                });
            }

        //COMMANDE DE L'IMAGE "SALT"
            if (command ==="salt"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/l4Jz3a8jO92crUlWM/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "SCUSE"
            if (command ==="scuse"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "KNIFE"
            if (command ==="knife"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/xiFTOBC9fEaOI/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "POT"
            if (command ==="pot"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/NQ75gA8pPKCZ2/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "BLBL"
            if (command ==="blbl"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/bC0caT4xYU8qQ/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "PHOT"
            if (command ==="phot"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/byZRNbekKtkxW/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "POL"
            if (command ==="pol"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/12IYvE1GQWZsm4/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "VIEW"
            if (command ==="view"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/ZjxNuXkYTOlAk/giphy.gif"
                });
            }
        //COMMANDE DE L'IMAGE "BEAR"
            if (command ==="bear"){

                message.delete();
                message.channel.send({
                    file: "https://media1.tenor.com/images/2b1f9c80aed389699cbdaf6855433dbf/tenor.gif"
                });
            }
        //COMMANDE DE L'IMAGE ""
            if (command ==="men"){

                message.delete();
                message.channel.send({
                    file: "https://media.giphy.com/media/gXch6VhLYZAA/giphy.gif"
                });
            }
//FONCTION
    function wrap(text) {
        return "" + text.replace(/ /g, ' ' + String.fromCharCode(8203)) + "";
        }

    function random1(min2, max2) {
        min2 = Math.ceil(1);
        max2 = Math.floor(6);
        randde = Math.floor(Math.random() * (max2 - min2 + 1) + min2);
        }


    function play(guild, song) {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', reason => {
                if (reason === 'Le flux trop lent.') console.log('Song ended.');
                else console.log(reason);
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        message.channel.bulkDelete(2);
        serverQueue.textChannel.send(`🎶 Début de: **${song.title}**`).then(msg => msg.delete(5000));
    }

    async function handleVideo(video, msg, voiceChannel, playlist = false) {
        const serverQueue = queue.get(msg.guild.id);
        console.log(video);
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 2,
                playing: true
            };
            queue.set(msg.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(msg.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`Je ne peux pas rejoindre le salon vocal: ${error}`);
                queue.delete(msg.guild.id);
                return msg.channel.send(`Je ne peux pas rejoindre le salon vocal: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else message.channel.bulkDelete(2); return msg.channel.send(`✅ **${song.title}** a été rajouté à la liste !`);
        }
        return undefined;
    }

    });
