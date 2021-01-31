const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayarlar = require("../ayarlar.json");
const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, member) => {

    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e)
    if (!message.member.roles.cache.has(ayarlar.teyitci) && !message.member.hasPermission("BAN_MEMBERS")) return message.react("❌");  
    let teyitData = rdb.get("reg") || {};
    let data = Object.keys(teyitData);
    let dataTop = data.filter(x => message.guild.members.cache.has(x)).sort((a, b) => Number((teyitData[b].Erkek || 0) + (teyitData[b].Kız || 0)) - Number((teyitData[a].Erkek) + (teyitData[a].Kız))).map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value)} adlı üyenin toplam **${(teyitData[value].Erkek || 0) + (teyitData[value].Kız || 0)}** (\`${teyitData[value].Erkek || 0}\` erkek, \`${teyitData[value].Kız || 0}\` kadın)`).splice(0, 10).join("\n");
    message.channel.send(embed.setDescription(`**TEYİT TOP 10** \n\ ${dataTop || 'Sıralama için yeterli veri bulunamadı!'}`));

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['topteyit'],
  permLevel: 0
};

exports.help = {
  name: 'topteyit',
  usage: [''],
  description: ''
};