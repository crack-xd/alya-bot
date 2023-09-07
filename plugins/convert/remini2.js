exports.run = {
    usage: ['remini2'],
    category: 'tools',
    async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func,
      Scraper
    }) => {
      try {
        if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
          let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
          let q = m.quoted ? m.quoted.message[type] : m.msg
          if (/image/.test(type)) {
            client.sendReact(m.chat, '🕒', m.key)
            let old = new Date()
            let img = await client.downloadMediaMessage(q)
            let image = await Scraper.uploadImage(img)
            let result = await Func.fetchJson(API('alya', '/api/enhance2', {
              image: image.data.url
            }, 'apikey'))
            if (!result.status) return m.reply(Func.jsonFormat(result))
            client.sendFile(m.chat, result.data.url, 'image.jpg', `Made By AsepitgansXc V2🍟 *Process* : ${(new Date() - old) * 1} ms`, m)
          } else client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk foto.`), m)
        } else {
          let q = m.quoted ? m.quoted : m
          let mime = (q.msg || q).mimetype || ''
          if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
          if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk foto.`), m)
          client.sendReact(m.chat, '🕒', m.key)
          let old = new Date()
          let img = await q.download()
          let image = await Scraper.uploadImage(img)
          let result = await Func.fetchJson(API('alya', '/api/enhance2', {
            image: image.data.url
          }, 'apikey'))
          if (!result.status) return m.reply(Func.jsonFormat(result))
          client.sendFile(m.chat, result.data.url, 'image.jpg', `Made By AsepitgansXc V2🍟 *Process* : ${(new Date() - old) * 1} ms`, m)
        }
      } catch (e) {
        console.log(e)
        return m.reply(status.error)
      }
    },
    error: false,
    limit: true,
    restrict: true,
    cache: true,
    location: __filename
  }
