const commands = require ("./commands")

module.exports = class blague extends commands {


    static match (message){
        return message.content.startWith(prefix + "blague")
    }

    static action (message) {
        var randblag = 0;
        message.delete();
        random2()

        if (randblag == 0){
            message.reply("Quelle est la plus intelligente, la blonde, la rousse ou la brune ? \nLa rousse parce que c’est un dictionnaire.")
            console.log("blague 0")
        }
        if (randblag == 1){
            message.reply("Un monsieur visite un musée. Soudain il s'arrête et dit au guide :  \n- Ah, c'est moche ! \n- C'est du Picasso, répond le guide. \nPlus loin, il s'écrie de nouveau : \n- Ah, c'est vraiment moche ! \n- Ca Monsieur, c'est un miroir !")
            console.log("blague 1")
        }
        if (randblag == 2){
            message.reply("Un chien et un homme son sur un bateau. Le chien pète, l'homme tombe à l'eau et se noie. Quelle est la race du chien ? \nUn pékinois. (un pet qui noie) ")
            console.log("blague 2")
        }
        if (randblag == 3){
            message.reply("Un fils demande à son père : \n- Papa,c'est quoi la beauté? \n- Tu vois ta mère ? \n- Oui \n- Et ben c'est pas ça!")
            console.log("blague 3")
        }
        if (randblag == 4){
            message.reply("Un jour Dieu dit à Casto de ramer. \nEt depuis, castorama...")
            console.log("blague 4")
        }
        if (randblag == 5){
            message.reply("Qu'est-ce qu'une manifestation d'aveugles ? \nUn festival de Cannes")
            console.log("blague 5")
        }
        if (randblag == 6){
            message.reply("C'est l'histoire d'un zoophile qui rentre dans un bar")
            console.log("blague 6")
        }
        if (randblag == 7){
            message.reply("Pourquoi la petite fille tombe-t-elle de la balançoire? \nParce qu'elle n'a pas de bras...")
            console.log("blague 7")
        }
        if (randblag == 8){
            message.reply("Comment est-ce qu'on appelle un boomerang qui ne revient pas? \nUn chat mort !")
            console.log("blague 8")
        }
        if (randblag == 9){
            message.reply("Qu'est-ce qui est tout noir et qui fait boum, boum, boum ? \nUne nonne dans un champ de mines.")
            console.log("blague 9")
        }
        if (randblag == 10){
            message.reply("Pourquoi les écolo aiment bien les lépreux ? \n- Ils sont biodégradables. ")
            console.log("blague 10")
        }

        function random2(min2, max2) {
            min2 = Math.ceil(0);
            max2 = Math.floor(10);
            randblag = Math.floor(Math.random() * (max2 - min2 +1) + min2);
    }
    }
}