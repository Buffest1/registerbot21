const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
const db = require('quick.db');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const database = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

  if (message.author.bot || message.channel.type === "dm") return;
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e)

    if (!message.member.roles.cache.has(ayarlar.teyitci) && !message.member.hasPermission("BAN_MEMBERS")) return message.react("❌");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])  
    let isim = args[1];
    if (!member) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${ayarlar.prefix || '.'}k @Wâncy/687355056990978132 İsim\``)).then(x => x.delete({timeout: 15000}));
    if (!isim) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${ayarlar.prefix || '.'}k @Wâncy/687355056990978132 İsim\``)).then(x => x.delete({timeout: 15000}));

    let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(ayarlar.erkek.setColor).setFooter(`• Kullanıcının ismini değiştirmek için .isim @Wâncy/ıd yazarak değiştirebilirsin.`)
    if (member.roles.cache.get(ayarlar.erkek)) return message.channel.send(embed2.setDescription(`Bu Kullanıcı Zaten Kayıtlı Olduğu İçin Tekrar Kayıt Edemem.`)).then(e => e.delete({ timeout: 6000 })).catch(err => console.error(error));
    if (member.roles.cache.get(ayarlar.kız)) return message.channel.send(embed2.setDescription(`Bu Kullanıcı Zaten Kayıtlı Olduğu İçin Tekrar Kayıt Edemem.`)).then(e => e.delete({ timeout: 6000 })).catch(err => console.error(error));

    await member.setNickname(`ϟ ${isim}`)
    await member.roles.add(ayarlar.kız)
    await member.roles.remove(ayarlar.kayıtsız)


database.add(`Kız_${message.author.id}`, 1)
database.add(`ToplamKayit_${message.author.id}`, 1)
rdb.add(`reg.${message.author.id}.Kız`, +1);
database.push(`isimler_${member.id}`, `\`ϟ ${isim}\` (**<@&801917111207198770>**)`), {
Yetkili: message.author.id,
Komut: "Kız"
};
  
    let isimgecmisi = database.get(`isimler_${member.id}`)
    let liste = ""
    var sayı = 0
    if(isimgecmisi){
        sayı = isimgecmisi.lenght
        for(let i = 0;i<isimgecmisi.length;i++){
            liste+=`\n\`•\` ${isimgecmisi[i]}`
        }
    } else {
        liste=`\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`
    }
    message.react('<a:ytik:802102935718723646>');
    message.guild.channels.cache.get(ayarlar.chat).send(new Discord.MessageEmbed().setDescription(`${member}, aramıza hoşgeldin! Seninle birlikte **${message.guild.memberCount}** Kişiyiz.`));
    let embed1 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x49003e).setFooter(`• Üyenin daha önce kayıt olduğu isimlere .isimler @etiket/ID bakarak kayıt işlemini gerçekleştirmeniz önerilir!`)
    message.channel.send(embed1.setDescription(`${member.user} Kullanıcı başarıyla <@&${ayarlar.kız}> olarak kayıt edildi.\n\n <a:campfire:803002983452246027> Kişinin toplamda **${isimgecmisi.length}** isim kayıtı bulundu. \n${liste}`))

};

exports.conf = {
    aliases: ["kız", "kadın", "k"]
};

exports.help = {
    name: 'kadın'
};
