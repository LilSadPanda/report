const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
      //Command Information
      name: "sreport",
      description: "Sets the report channel",
      usage: "`prefix reportchannel #channelname`",
      enabled: true,
      guildOnly: true,
      aliases: ["channel"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

        // let prefix = args[0];
        const msg = args.join(" ");

        if (data.guild.reportChannel == "null") {
            let announcementEmbed = new Discord.MessageEmbed()
            .setTitle("Report Log Channel")
            .setColor(config.color)
            .setDescription(`This server does not have a report channel setup yet. \n\nYou can run the *rb!helpsetup* to see how to do it`)
            return message.channel.send(announcementEmbed)
        }
        
        if(args.length == 0){

              let announcementEmbed = new Discord.MessageEmbed()
              .setTitle("Report Empty")
              .setColor(config.color)
              .setDescription(`You need to report something?`)
              return message.channel.send(announcementEmbed)
        } 
  
        else {
            let announcementEmbed = new Discord.MessageEmbed()
            .setTitle(`<:check:723597104261365953> New Silent Report from **${message.member.user.username}**`)
            .setColor(config.color)
            .addField("Reporter/Reported By:", `${message.member.user}\n${message.member.user.username}#${message.member.user.discriminator} — ID: ${message.member.id}`)
            .addField("Contents of the Report:", `${msg}`)
            .setFooter(`Sponsored by hyperlayer.co.za`, 'https://s3-us-west-2.amazonaws.com/hp-cdn-01/uploads/orgs/hyper-layer_logo.jpg')
            message.delete({ timeout: 5,});
            if(message.member.voice.channel) {
                announcementEmbed.addField("Voice Channel", message.member.voice.channel.name);
    		}	
            // message.reply("Thank you for logging a report! <a:PusheenCompute:723598493112991767>");
            return client.channels.cache.get(`${data.guild.reportChannel}`).send(announcementEmbed)
            
        }


    },
};