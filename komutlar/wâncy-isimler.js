const Discord = require("discord.js");
const client = new Discord.Client();
const database = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e)
    if (!message.member.roles.cache.has(ayarlar.teyitci) && !message.member.hasPermission("BAN_MEMBERS")) return message.react("790718295040983080");
    if(!member) return message.channel.send(embed.setDescription(`Lütfen Geçmiş Kullanıcı Adlarını Görmek İstediğin Kullanıcıyı Etiketle.`)).then (e => (e.delete({ timeout: 6000 })));

    let isimgecmisi = database.get(`isimler_${member.id}`)
    let liste=""
    if (isimgecmisi) {
        var sayı = 0
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`${i+1}.\` ${isimgecmisi[i]}`
        }
    } else {
        message.channel.send(embed.setDescription(`${member} Adlı Kullanıcının Geçmiş Kullanıcı Adları \n\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`)).then(e => (e.delete({ timeout: 10000 })))
        return
    }

    message.channel.send(embed.setDescription(`${member} Adlı Kullanıcının Geçmiş Kullanıcı Adları **[${isimgecmisi.length}]** \n${liste}`)).then(e => (e.delete({ timeout: 10000 })))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "isimler",
  description: "Kod denemek için kullanılır.",
  usage: "isimler"
};