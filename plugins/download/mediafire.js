const {
   decode
 } = require('html-entities')
 exports.run = {
   usage: ['mediafire'],
   hidden: ['mf'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
     client,
     args,
     isPrefix,
     command,
     env,
     Scraper
   }) => {
     try {
       if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file'), m)
       if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) return client.reply(m.chat, global.status.invalid, m)
       client.sendReact(m.chat, '🕒', m.key)
       let json = await Func.fetchJson(API('alya', '/api/mediafire', {
         url: args[0]
       }, 'apikey'))
       if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
       let text = `乂  *M E D I A F I R E*\n\n`
       text += '	◦  *Name* : ' + unescape(decode(json.data.filename)) + '\n'
       text += '	◦  *Size* : ' + json.data.filesize + '\n'
       text += '	◦  *Filetype* : ' + json.data.filetype + '\n'
       text += '	◦  *Extension* : ' + json.data.ext + '\n'
       text += '	◦  *Mime* : ' + json.data.mimetype + '\n'
       text += '	◦  *Uploaded* : ' + json.data.uploadAt + '\n\n'
       text += global.footer
       let chSize = Func.sizeLimit(json.data.size, env.max_upload)
       if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.data.filesize}) melebihi batas maksimum, unduh sendiri melalui tautan ini : ${await (await Scraper.shorten(json.data.link)).data.url}`, m)
       client.sendMessageModify(m.chat, text, m, {
         largeThumb: true,
         thumbnail: await Func.fetchBuffer('https://telegra.ph/file/fcf56d646aa059af84126.jpg')
       }).then(async () => {
         client.sendFile(m.chat, json.data.link, unescape(decode(json.data.filename)), '', m)
       })
     } catch {
       return client.reply(m.chat, global.status.error, m)
     }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
 }
 