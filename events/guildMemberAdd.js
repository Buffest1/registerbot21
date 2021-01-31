const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
module.exports = member => {
        const kanal = member.guild.channels.cache.get("802489919254822933")
        const register = "<@&801913092610981909>"
        let user = member.user
        let client = member.client
        require("moment-duration-format");
          const kurulus = new Date().getTime() - user.createdAt.getTime();  
          const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
       
        var kontrol;
      if (kurulus < 604800000) kontrol = '<a:rtik:802103042634809355>'
      if (kurulus > 604800000) kontrol = '<a:ytik:802102935718723646>'
        if (kurulus < 604800000) {
        moment.locale("tr");
        member.roles.set([ayarlar.şüphelihesap])
        member.setNickname("ϟ Şüpheli Hesap")
        
  member.send(`• Hesabın **1 Haftadan Kısa** Bir Sürede Açıldığı İçin Güvenlik Amaçlı Karantinaya Alındın. Yetkililere Ulaşarak Destek Alabilirsin.`)  
  const hg = new Discord.MessageEmbed()
  .setColor('#ec0c0c')
  .setDescription(`• ${member} Adlı Kullanıcının Hesabı \`1 Hafta\` Süreden Kısa Açıldığı İçin Kullanıcı Karantinaya Atıldı.` )  
  .setThumbnail(member.guild.iconURL({dynamic: true}))
  kanal.send(hg)

    } else {
    
      
        member.roles.set([ayarlar.kayıtsız])
        member.setNickname("ϟ İsim")
      
       kanal.send(`:tada: Sunucumuza hoşgeldin, ${member}!
       
`  + kontrol + ` Hesabın `  + moment(member.user.createdAt).format("DD MMMM YYYY dddd") + ` tarihin de oluşturulmuş,
       
Sunucu kurallarımız <#801920301952008233> kanalında belirtilmiştir, Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

Seninle beraber ${member.guild.memberCount} kişi olduk, Tagımızı alarak bizlere destek olabilirsin! Kayıt olmak için teyit odalarına girip <@&801913092610981909> yetkililerine ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir İyi eğlenceler.
`)
 
    }};

