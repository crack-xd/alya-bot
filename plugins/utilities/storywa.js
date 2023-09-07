exports.run = {
  usage: ['storywa'],
  use: 'query',
  category: 'utilities',
  async: async(m, {
    client,
    isPrefix,
    command,
    text,
    Func
  }) => {
    try {
      if (!text) return m.reply(Func.example(isPrefix, command, 'bucin'))
      client.sendReact(m.chat, '🕐', m.key)
      const json = await Func.fetchJson(API('alya', '/api/storywa', { q: text }, 'apikey'))
      if (!json.status) return m.reply(Func.jsonFormat(json))
      for (let i = 0; i < 5; i++) {
        var rand = Math.floor(json.data.length * Math.random())
        let sw = `乂  *S T O R Y - W A*\n\n`
        sw += ` ◦ *ID* : ${json.data[rand].id}\n`
        sw += ` ◦ *Title* : ${json.data[rand].title}\n`
        sw += ` ◦ *Download* : ${json.data[rand].download}\n\n`
        sw += global.footer
        client.sendFile(m.chat, json.data[rand].video_url, '', sw, m)
        await Func.delay(2800)
      }
    } catch (e) {
      console.log(e)
      m.reply(Func.jsonFormat(e))
    }
  },
  limit: true,
  cache: true,
  location: __filename
}
