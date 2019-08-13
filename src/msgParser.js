const resCodes = require('./res.json');
const resCodesLowerCase = require('./res.lowercase.json');


function parseMsg(msg) {
	msg = removeFisrtLine(msg);
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


function removeFisrtLine(msg) {
	let lineEnd = msg.split("\n")[0].length;
	let newStr = msg.substr(lineEnd + 2, msg.length);
	return newStr;
}

function parseLine(line) {
	let resData;
	resData = line.split(" x ");
	if (resData.length < 2)
		return;
	resData = getItemCode(resData[1]) + " " + resData[0].replace(' ','') + " ";
	return resData; 
} 

function getItemCode(item) {
	let resCode = resCodes[item];
	if (!resCode)
		resCode = resCodesLowerCase[item.toLowerCase()];
	return resCode;
}

let test = `Not enough materials. Missing:
 100 x Thread
 21 x Bone
 17 x Stick
 7 x Magic stone
 4 x Coal
 24 x Iron ore`;
console.log(parseMsg(test));

