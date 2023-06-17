const {Composer} = require("grammy")

const bot = new Composer()

// bot.command("start", async (ctx)=>{
//    await ctx.reply(`<b>Assalomu aleykum <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>. Xush kelibsiz</b>`, {
//     parse_mode:"HTML"
//    })

//    await ctx.reply("Ismingizni kiriting")
//    ctx.session.step = "birinchi"

// })

module.exports = bot