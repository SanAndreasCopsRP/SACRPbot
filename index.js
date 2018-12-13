const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setGame("SACRP Discord")
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    // Kick Command
    if(cmd === `${prefix}kick`) {

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser}`)
        .addField("Kicked By", `<@${message.author.id}>`)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "useractions");
        if(!kickChannel) return message.channel.send("Can't find useractions channel.");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        return;
  }
// Ban Command
  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser}`)
    .addField("Banned By", `<@${message.author.id}>`)
    .addField("Time", message.createdAt)
    .addBlankField()
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "useractions");
    if(!incidentchannel) return message.channel.send("Can't find useractions channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


    // Server Command
    if(cmd === `${prefix}serverinfo`){

        let serverembed = new Discord.RichEmbed()
        .setDescription("Server information")
        .setColor("#f44542")
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("Total Members", message.guild.memberCount)

        return message.channel.send(serverembed);
    }

    if(cmd === `${prefix}help`){

        let helpEmbed = new Discord.RichEmbed()
        .setDescription("HELP Menu")
        .addField("Do !commands for command list")
        .addField("MORE help comming soon")

        return message.channel.send(helpEmbed);
    }
})

bot.login(botconfig.token);