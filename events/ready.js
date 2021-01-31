const moment = require("moment");
const Discord = require("discord.js");

module.exports = client => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
    client.user.setStatus("online");
    client.user.setActivity("Wâncy", { type: "PLAYING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
    console.log(``);
  
  };
  