exports.run = {
  usage: ['shopeeuser'],
  use: 'name',
  category: 'utilities',
  async: async (m, {
    client,
    isPrefix,
    command,
    text,
    Func
  }) => {
    try {
      if (!text) return m.reply(Func.example(isPrefix, command, 'holigans'))
      client.sendReact(m.chat, '🕐', m.key)
      const json = await Func.fetchJson(API('alya', '/api/shopee', { q: text }, 'apikey'))
      if (!json.status) return m.reply(Func.jsonFormat(json))
      let sp = `乂  *S H O P E E - U S E R*\n\n`
      json.data.map((v, i) => {
        sp += `*${(i + 1)}.* ${v.shopname}\n`
        sp += ` ◦ *Followers* : ${v.follower_count}\n`
        sp += ` ◦ *Following* : ${v.following_count}\n`
        sp += ` ◦ *Official* : ${v.is_official_shop}\n`
        sp += ` ◦ *Product* : ${v.products}\n`
        sp += ` ◦ *Rating* : ${v.shop_rating}\n`
        sp += ` ◦ *Rating Good* : ${v.rating_good}\n`
        sp += ` ◦ *Rating Normal* : ${v.rating_normal}\n`
        sp += ` ◦ *Rating Bad* : ${v.rating_bad}\n\n`
      })
      sp += global.footer
      client.reply(m.chat, sp, m)
    } catch (e) {
      console.log(e)
      m.reply(Func.jsonFormat(e))
    }
  },
  limit: true,
  cache: true,
  location: __filename
}
