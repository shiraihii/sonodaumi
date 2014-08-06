// Trying
var tm1 = 0;
var tm2 = 0;
var tm3 = 0;
var tm4 = 0;
var makeda = false;
var sndplayreq = true;
var lastkamichacardsel = 0;

var card; 
var cardkamicha;
var cardself;
var cardshimocha;
var cardtoimen;

var timerhandler1;
var timerhandler2;
var timerhandler3;
var timerhandler4;

function isCardGreatThan(a, b) {
	var suita = Math.floor(a / 9);
	var numa = a % 9;
	var suitb = Math.floor(b / 9);
	var numb = b % 9;
	if (suita == 4) // A is the only Joker
		return true;
	if (suitb == 4) // B is the only Joker
		return false;
	if (numa > numb) // sort by number
		return true;
	if (numa < numb)
		return false;
	if (suita > suitb) // then by suit
		return true;
	if (suita < suitb)
		return false;
	return false; // default: for error;
}
function randomInt(num) {
	return Math.floor(Math.random() * num);
}
function sort(array) {
	var length = array.length;
	for (var i = 0; i < length; i++) {
		for (var j = i + 1; j < length; j++) {
			if (isCardGreatThan(array[i], array[j])) {
				var tmp = array[j];
				array[j] = array[i];
				array[i] = tmp;
			}
		}
	}
	return array;
}
function shufflesw() {
	card = [];
	for (var i = 0; i < 37; i++)
		card.push(i);
	for (var i = 0; i < 500; i++) {
		var swpi = randomInt(37);
		var swpj = randomInt(37);
		var tmpswp = card[swpj];
		card[swpj] = card[swpi];
		card[swpi] = tmpswp;
	}
	cardkamicha = card.slice(0,10);
	cardself = sort(card.slice(10,19));
	cardshimocha = card.slice(19,28);
	cardtoimen = card.slice(28,37);
}
function getcardimgurl(cardnum) {
	var suit = Math.floor(cardnum / 9) + 1;
	var num = cardnum % 9 + 1;
	if (suit == 5) {
		suit = "jk";
		num = 2;
	}
	return "image/card/" + suit + "/" + num + ".jpg";
}
function showselfcard() {
	for (var num = 0; num < 9; num++) {
		document.getElementById("selfcard" + num + "img").classList.add("cardmeguri");
		setTimeout(function (varnum) {
			document.getElementById("selfcard" + varnum + "img").src = getcardimgurl(cardself[varnum]);
		}, 150, num);
	}
}
function animateDiscard() {
	document.getElementById("kubariareadyn1").classList.add("cardkubari1");
	document.getElementById("kubariareadyn2").classList.add("cardkubari2");
	document.getElementById("kubariareadyn3").classList.add("cardkubari3");
	document.getElementById("kubariareadyn4").classList.add("cardkubari4");
	// Timeout
		timerhandler1 = window.setInterval(timer1, 400);
	// 0	
	setTimeout(function() {
		timerhandler2 = window.setInterval(timer2, 400);
	} , 100);
	setTimeout(function() {
		timerhandler3 = window.setInterval(timer3, 400);
	}, 200);
	setTimeout(function() {
		timerhandler4 = window.setInterval(timer4, 400);
	}, 300);
}
function init() {
	preLoadImg();	

	document.getElementById("toimencard0img").src="image/card/bk.png"
	document.getElementById("toimencard1img").src="image/card/bk.png"
	document.getElementById("toimencard2img").src="image/card/bk.png"
	document.getElementById("toimencard3img").src="image/card/bk.png"
	document.getElementById("toimencard4img").src="image/card/bk.png"
	document.getElementById("toimencard5img").src="image/card/bk.png"
	document.getElementById("toimencard6img").src="image/card/bk.png"
	document.getElementById("toimencard7img").src="image/card/bk.png"
	document.getElementById("toimencard8img").src="image/card/bk.png"
	document.getElementById("toimencard9img").src="image/card/bk.png"

	document.getElementById("shimochacard0img").src="image/card/bk.png"
	document.getElementById("shimochacard1img").src="image/card/bk.png"
	document.getElementById("shimochacard2img").src="image/card/bk.png"
	document.getElementById("shimochacard3img").src="image/card/bk.png"
	document.getElementById("shimochacard4img").src="image/card/bk.png"
	document.getElementById("shimochacard5img").src="image/card/bk.png"
	document.getElementById("shimochacard6img").src="image/card/bk.png"
	document.getElementById("shimochacard7img").src="image/card/bk.png"
	document.getElementById("shimochacard8img").src="image/card/bk.png"
	document.getElementById("shimochacard9img").src="image/card/bk.png"

	document.getElementById("selfcard0img").src="image/card/bk.png"
	document.getElementById("selfcard1img").src="image/card/bk.png"
	document.getElementById("selfcard2img").src="image/card/bk.png"
	document.getElementById("selfcard3img").src="image/card/bk.png"
	document.getElementById("selfcard4img").src="image/card/bk.png"
	document.getElementById("selfcard5img").src="image/card/bk.png"
	document.getElementById("selfcard6img").src="image/card/bk.png"
	document.getElementById("selfcard7img").src="image/card/bk.png"
	document.getElementById("selfcard8img").src="image/card/bk.png"
	document.getElementById("selfcard9img").src="image/card/bk.png"

	document.getElementById("kubariareaimg").src="image/card/bk.png"

	document.getElementById("selfavaimg").src="image/person/kotori/seijou.png"
	document.getElementById("toimenavaimg").src="image/person/honoka/seijou.png"
	document.getElementById("shimochaavaimg").src="image/person/nico/seijou.png"
	document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png"

	document.getElementById("selfavaimg").addEventListener("click", function(e) {
		document.getElementById("selfavaimg").classList.add("change-size");
		setTimeout(function() {
			document.getElementById("selfavaimg").classList.remove("change-size");
		} ,1000);
	});
	shufflesw();
	setTimeout(function () {
		animateDiscard();
	}, 1000);
}
function preLoadImg()
{
	for (var imgi = 1; imgi < 4; imgi ++)
		for (var imgj = 1; imgj < 9; imgj ++)
		{
			var img = new Image();
			img = "image/card/" + imgi + "/" + imgj + ".jpg";
		}
}
function timer1()
{
	if (tm1 < 10)
		document.getElementById("kamichacard"+tm1).style.display="inline-block";
	if (tm1 == 9)
	{
		document.getElementById("kubariareadyn1").style.display="none";
		document.getElementById("kubariareadyn1").classList.remove("cardkubari1");
		window.clearInterval(timerhandler1);
	}
	tm1 ++;
}
function timer2()
{
	if (tm2 < 9)
		document.getElementById("selfcard"+tm2).style.display="inline-block";
	if (tm2 == 8)
	{
		document.getElementById("kubariareadyn2").style.display="none";
		document.getElementById("kubariareadyn2").classList.remove("cardkubari2");
		document.getElementById("kubariarea").style.display="none";
		window.clearInterval(timerhandler2);
	}
	tm2 ++;
}
function timer3()
{
	if (tm3 < 9)
		document.getElementById("shimochacard"+tm3).style.display="block";
	if (tm3 == 8)
	{
		document.getElementById("kubariareadyn3").style.display="none";
		document.getElementById("kubariareadyn3").classList.remove("cardkubari3");
		window.clearInterval(timerhandler3);
	}
	tm3 ++;
}
function timer4()
{
	if (tm4 < 9)
		document.getElementById("toimencard"+tm4).style.display="block";
	if (tm4 == 8)
	{
		document.getElementById("kubariareadyn4").style.display="none";
		document.getElementById("kubariareadyn4").classList.remove("cardkubari4");
		window.clearInterval(timerhandler4);
	}
	tm4 ++;
	if (tm4 > 14) alert("abing")
}

function fcKamichaMouseOver(index) {
	if (!makeda) {
		if (index == 3) {
			sndplayreq = true;
			lastkamichacardsel = index;
			setTimeout(function() {
				if (sndplayreq && lastkamichacardsel == index)
					document.getElementById("sndureshi").play();
			}, 400);
			document.getElementById("kamichaavaimg").src="image/person/umi/ureshi.png"
		}
		else {
			sndplayreq = true;
			lastkamichacardsel = index;
			setTimeout(function() {
				if (sndplayreq && lastkamichacardsel == index)
					document.getElementById("sndeee").play();
			}, 400);
			document.getElementById("kamichaavaimg").src="image/person/umi/eee.png"
		}
		document.getElementById("kamichacard"+index+"img").src="image/card/bk-hover.png"
	}
}
function fcKamichaMouseOut(index) {
	if (!makeda) {
		sndplayreq = false;
		document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png"
		document.getElementById("kamichacard"+index+"img").src="image/card/bk.png"
	}
}
function fcKamichaClick(index) {
	if (!makeda) {
		sndplayreq = false;
		document.getElementById("sndei").play();
		document.getElementById("kamichacard"+index+"img").classList.add("cardmeguri");
		setTimeout(function(varindex) {
			document.getElementById("kamichacard"+varindex+"img").classList.add("cardremove");
			document.getElementById("kamichacard"+varindex).classList.add("cardremove");
		}, 1500, index);
		setTimeout(function(varindex) {
			document.getElementById("kamichacard"+varindex).style.display="none";
			document.getElementById("kamichacard"+varindex+"img").classList.remove("cardremove");
			document.getElementById("kamichacard"+varindex).classList.remove("cardremove");
		}, 1900, index);
		if (index == 3) {
			setTimeout(function(varindex) {
				document.getElementById("kamichaavaimg").src="image/person/umi/kachi.png"
				document.getElementById("kamichacard"+varindex+"img").src="image/card/jk/2.jpg"
			}, 150, index);
		}
		else {
			setTimeout("document.getElementById(\"sndkaoge\").play()", 120);
			setTimeout(function(varindex) {
				document.getElementById("kamichaavaimg").src="image/person/umi/kaoge.png"
				document.getElementById("kamichacard"+varindex+"img").src="image/card/2/"+(varindex+1)+".jpg"
			}, 150, index);
		}
	}
	makeda = true;
	setTimeout("makeda = false;", 2000);
			
}

