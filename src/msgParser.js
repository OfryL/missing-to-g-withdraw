const resCodes = require('./res.json');
const resCodesLowerCase = require('./res.lowercase.json');

module.exports = function() {
  'use strict';
  
	function parseMsg(msg) {
		let gwithdraw = "/g_withdraw ",
			i = 0;
		while (i < msg.length)
		{
			let j = msg.indexOf("\n", i);
			if (j == -1) j = msg.length;
			gwithdraw = gwithdraw + parseLine(msg.substr(i, j - i));
			i = j+1;
		}
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

	function test() {
		console.log(parseMsg(`Not enough materials for crafting Pouch of gold.
Required:
 9 x Thread`));

		console.log(parseMsg(`Not enough materials. Missing:
 21 x Bone
 17 x Stick
 7 x Magic stone
 4 x Coal
 24 x Iron ore`));	
	}

	return {
		parseMsg
	};
}();
