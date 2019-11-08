const Telegraf = require('telegraf');
const config = require('config');
const parse = require('./msgParser');
const START_MSG = "Plz forward ur missing staff msg and see the magic!";

const bot = new Telegraf(config.get('token'));

bot.start((ctx) => handleStartCmd(ctx));
bot.on("forward" ,(ctx) => handleForward(ctx));

function handleStartCmd(ctx) {
	console.log(`Start from user: ${ctx.message.from.first_name}(@${ctx.message.from.username})`);
	ctx.telegram.sendMessage(ctx.message.chat.id, START_MSG, {parse_mode:'HTML'} );
}

function handleForward(ctx) {
	console.log(`Forward from user: ${ctx.message.from.first_name}(@${ctx.message.from.username})`);
	let replayData = parse.parseMsg(ctx.message.text);
	if (!replayData) return;
	replayData.forEach(function (line) {
		ctx.telegram.sendMessage(ctx.message.chat.id, line, {parse_mode:'HTML'} );
	});
}

bot.startPolling();
