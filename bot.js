var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var list = require('./list.json');
var smite = require('./smite.json')
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    //Listens for !!
    if (message.substring(0, 2) == '!!') {
        var args = message.substring(2).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {

            case 'game':
                var choose = Math.floor(Math.random() * list.games.length);
                bot.sendMessage({
                    to: channelID,
                    message: list.games[choose]
                });
                break;

            case 'coinflip':
                var choose = Math.floor(Math.random() * 3);
                if (choose == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: "Heads"
                    });
                } else if (choose == 2) {
                    bot.sendMessage({
                        to: channelID,
                        message: "Tails"
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: "Abdomen"
                    });
                }
                break;

            case 'gif':
                var choose = Math.floor(Math.random() * list.gifs.length);
                bot.sendMessage({
                    to: channelID,
                    message: list.gifs[choose]
                });
                break;

            case 'boys':
                var choose = Math.floor(Math.random() * list.boys.length);
                bot.sendMessage({
                    to: channelID,
                    message: "<@&564875541069561862>" + " " + list.boys[choose]
                });
                break;

            case 'rgod':
                var choose = Math.floor(Math.random() * smite.agods.length);
                bot.sendMessage({
                    to: channelID,
                    message: smite.agods[choose]
                });
                break;

            case 'agod':
                var choose = Math.floor(Math.random() * smite.cgods[0].Assasin.length);
                bot.sendMessage({
                    to: channelID,
                    message: smite.cgods[0].Assasin[choose]
                });
                break;

            case 'ggod':
                var choose = Math.floor(Math.random() * smite.cgods[1].Guardian.length);
                bot.sendMessage({
                    to: channelID,
                    message: smite.cgods[1].Guardian[choose]
                });
                break;

            case 'hgod':
                var choose = Math.floor(Math.random() * smite.cgods[2].Hunter.length);
                bot.sendMessage({
                    to: channelID,
                    message: smite.cgods[2].Hunter[choose]
                });
                break;

            case 'mgod':
                var choose = Math.floor(Math.random() * smite.cgods[3].Mage.length);
                bot.sendMessage({
                    to: channelID,
                    message: smite.cgods[3].Mage[choose]
                });
                break;

            case 'wgod':
                var choose = Math.floor(Math.random() * smite.cgods[4].Warrior.length);
                bot.sendMessage({
                    to: channelID,
                    message: smite.cgods[4].Warrior[choose]
                });
                break;

            case 'team':
                var choose;
                for(var i = 0; i < 5; i++){
                    logger.info(smite.cgods[i][list.class[i]][0]);
                    choose = Math.floor(Math.random() * smite.cgods[i][list.class[i]].length);
                    logger.info(choose)
                    bot.sendMessage({
                        to: channelID,
                        message: list.roles[i] + " " + smite.cgods[i][list.class[i]][0]
                    });
                }
                break;
        }
    }
});