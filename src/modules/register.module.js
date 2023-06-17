const { Router } = require("@grammyjs/router");
const router = new Router((ctx) => ctx.session.step);
const { contactBtn } = require("../helpers/contact.helper");
const Io = require("../utils/io");
const Users = new Io("./database/users.json");
const User = require("../models/User");

const first = router.route("birinchi");

first.command("start", async (ctx) => {
  await ctx.reply(
    `<b>Assalomu aleykum <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>. Xush kelibsiz</b>`,
    {
      parse_mode: "HTML",
    }
  );

  const id = ctx.from.id;
  const users = await Users.read();

  const findId = users.find((user) => user.id === id);
  console.log(findId);

  if (findId == undefined) {
    //   ctx.session.step = "to`rtinchi";
    await ctx.reply("Ismingizni kiriting");
    ctx.session.step = "ikkinchi";
  } else {
    ctx.session.step = "to`rtinchi";

    return await ctx.reply("siz kirgansiz aka");
  }

  //  ctx.reply("Siz tizimdan ro`yxatdan o`tgansiz")
});

const second = router.route("ikkinchi");
second.on(":text", async (ctx) => {
  await ctx.reply("Familiyangizni kiriting");

  ctx.session.firstName = ctx.message.text;

  ctx.session.step = "uchinchi";
});

const third = router.route("uchinchi");
third.on(":text", async (ctx) => {
  await ctx.reply("Telefon raqamingizni yuboring", {
    reply_markup: {
      ...contactBtn,
      resize_keyboard: true,
    },
  });

  ctx.session.lastName = ctx.message.text;
  ctx.session.step = "to`rtinchi";
});

const forth = router.route("to`rtinchi");

forth.on(":contact", async (ctx) => {
  ctx.session.phoneNumber = ctx.message.contact.phone_number;
  const id = ctx.from.id;
  const { firstName, lastName, phoneNumber } = ctx.session;

  const users = await Users.read();

  const newUser = new User(id, firstName, lastName, phoneNumber);

  const data = users.length ? [...users, newUser] : [newUser];

  await Users.write(data);
  ctx.reply("you logged in successfully");

  //   const text = `Name : ${firstName} \n Surname : ${lastName} \n Phone :${ctx.session.phoneNumber}`;
  //   await ctx.reply(text);

  //   await ctx.api.sendMessage(1208648086, text);

  ctx.session.step = "";
});

module.exports = router;
