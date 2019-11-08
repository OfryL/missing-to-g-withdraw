const resCodes = require('./res.json');
const resCodesLowerCase = require('./res.lowercase.json');
const WITHDRAWCMD = "/g_withdraw ";
const LIMIT = 16;
module.exports = function() {
  'use strict';

	function getCodes(msg) {
		let gwithdraw = '',
		lines = msg.split("\n");
		lines.forEach(function(element){
			gwithdraw = gwithdraw + parseLine(element);
		});
		return gwithdraw;
	}

	function splitByLimit(gwithdraw) {
		let cmd = '', cmds = [], i = 0,lines = gwithdraw.split(WITHDRAWCMD)[1].split(' ');
		lines.forEach(function (element) {
			cmd = cmd + ' ' + element;
			i++;
			if (i === LIMIT) {
				cmds.push(cmd);
				cmd = '';
				i = 0;
			}
		});
		lines = [];
		cmds.push(cmd);
		cmds.forEach(function (element) {
			let line = WITHDRAWCMD + element;
			line = line.replace('  ', ' ');
			lines.push(line);
		});
		return lines;
		// console.log(require('util').inspect(lines));
	}

	function parseMsg(msg) {
		let gwithdraw = WITHDRAWCMD;
		gwithdraw = gwithdraw + getCodes(msg);
		if (gwithdraw === WITHDRAWCMD) return;
		 splitByLimit(gwithdraw);
		gwithdraw = splitByLimit(gwithdraw);
		return gwithdraw;
	}
	
	function parseLine(line) {
		let resData;
		resData = line.split(" x ");
		if (resData.length < 2)
			return "";
		resData = getItemCode(resData[1]) + " " + resData[0].replace(' ','') + " ";
		return resData; 
	} 
	
	function getItemCode(item) {
		let resCode = resCodes[item];
		if (!resCode)
			resCode = resCodesLowerCase[item.toLowerCase()];
		return resCode;
	}

	 const test = function() {
		console.log(parseMsg(`Not enough materials for crafting Pouch of gold.
Required:
 9 x Thread`));

		console.log(parseMsg(`Not enough materials. Missing:
 21 x Bone
 17 x Stick
 7 x Magic stone
 4 x Coal
 24 x Iron ore`));	


		console.log(parseMsg(`Not enough materials. Missing:
 1 x Bone
 2 x Stick
 3 x Magic stone
 4 x Magic stone
 5 x Magic stone
 6 x Magic stone
 7 x Magic stone
 8 x Magic stone
 9 x Coal
 10 x Iron ore`));
	};

	return {
		parseMsg
	};
}();
