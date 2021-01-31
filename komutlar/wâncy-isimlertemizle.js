const Discord = require("discord.js");
const client = new Discord.Client();
const eayarlar = require("../ayarlar.json");
const database = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e)
    let eresbos = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    if (!message.member.roles.cache.has(ayarlar.teyitci) && !message.member.hasPermission("BAN_MEMBERS")) return message.react("801905668625793095");
    if(!eresbos) return message.react("❌") && message.reply(`Hangi Kullanıcının Geçmiş İsimlerini Temizlemek İstiyorsun?`).then (message => (message.delete({timeout:6000})))

    database.delete(`isimler_${eresbos.id}`)
    message.channel.send(embed.setDescription(`${eresbos} Adlı Kullanıcının Geçmiş İsimleri Başarıyla Temizlendi.`)).then(e => (e.delete({ timeout: 6000 })));
};

exports.conf = {
    aliases: ["isimlertemizle", "itemizle", "eresbostemizle"]
};

exports.help = {
    name: "isimlertemizle"
};




