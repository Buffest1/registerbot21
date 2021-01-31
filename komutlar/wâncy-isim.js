const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
const database = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
    if(message.author.bot || message.channel.type === "dm") return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let isim = args[1];  
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e)
    if (!message.member.roles.cache.has(ayarlar.teyitci) && !message.member.hasPermission("BAN_MEMBERS")) return message.react("790718295040983080");
    if (!member) return message.reply("Kullanıcı Adını Değiştirmek İstediğin Kullanıcıyı Etiketlemelisin.").then(e => e.delete({ timeout: 6000 }));
    if (!isim) return message.reply("Kullanıcı Adını Değiştirmem İçin Bir İsim Yazmalısın").then(e => e.delete({ timeout: 6000 }));

    await member.setNickname(`ϟ ${isim}`)
    database.push(`isimler_${member.id}`, `\`${isim}\` **(**İsim Değiştirme**)**`)
    
    let isimgecmisi = database.get(`isimler_${member.id}`)
    let liste = ""
    var sayı = 0
    if(isimgecmisi){
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`${i+1}.\` ${isimgecmisi[i]}`
        }
    } else {
        liste=`\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`
    }

    message.channel.send(embed.setDescription(`${member.user} Adlı Kullanıcının Adını **${isim}** Olarak Değiştirdim. \nBu Kullanıcı Daha Önceden **${isimgecmisi.length}** Farklı İsim Kullanmış. \n${liste}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))).then(e => e.delete({ timeout: 15000 }))
};

exports.conf = {
    aliases: ["isim", "nick"]
};

exports.help = {
    name: "isim"
};