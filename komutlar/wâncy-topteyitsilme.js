const Discord = require("discord.js");
const client = new Discord.Client();
const database = require("quick.db");
const ayarlar = require("../ayarlar.json");
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const db = require('quick.db');

exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (message.author.id !== ayarlar.sahip) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu sadece <@${ayarlar.sahip}> kullanıcısı kullanabilir.`).setColor(`RED`)).then (message => (message.delete({timeout:6000})));
    rdb.delete("reg")
    message.channel.send(embed.setDescription(`${member}, tarafından **Top Teyit** sıralaması başarıyla Temizlendi.`)).then(e => (e.delete({ timeout: 6000 })));
};

exports.conf = {
    aliases: ["topteyitsıfırla", "ttsıfırla", "topteyits"]
};

exports.help = {
    name: "topteyitsil"
};

