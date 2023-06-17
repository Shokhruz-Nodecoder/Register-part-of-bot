const config = require("../config/index");
const { Bot, session } = require("grammy");
const commandsModule = require("./modules/commands");
const registerModule = require("./modules/register.module");
const bot = new Bot(config.TOKEN);

bot.use(
  session({
    initial: () => ({
      step: "birinchi",
    }),
  })
);
bot.use(commandsModule);
bot.use(registerModule);

// bot.on("message", (ctx) => {
//   ctx.reply("Welcome");
// });

bot.start();
