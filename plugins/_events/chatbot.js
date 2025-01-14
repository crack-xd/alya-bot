exports.run = {
   async: async (m, {
      client,
      body,
      chats,
      setting,
      Scraper,
      env,
      Func
   }) => {
      try { 
         if (body && !env.evaluate_chars.some(v => body.startsWith(v))) {
            let json = await Scraper.simsimi(body)
            if (!m.fromMe && setting.chatbot && json.status) return client.reply(m.chat, json.msg, null)
         }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   private: true,
   cache: true,
   location: __filename
  }
