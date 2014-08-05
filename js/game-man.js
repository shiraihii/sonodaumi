// Trying
var tm1 = 0;
var tm2 = 0;
var tm3 = 0;
var tm4 = 0;
var makeda = false;
var sndplayreq = true;
var lastkamichacardsel = 0;
function init() {
	preLoadImg();	
	document.getElementById("selfcard0img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard1img").src="image/card/2/1.jpg"
	document.getElementById("selfcard2img").src="image/card/1/1.jpg"
	document.getElementById("selfcard3img").src="image/card/3/2.jpg"
	document.getElementById("selfcard4img").src="image/card/4/3.jpg"
	document.getElementById("selfcard5img").src="image/card/1/5.jpg"
	document.getElementById("selfcard6img").src="image/card/2/3.jpg"
	document.getElementById("selfcard7img").src="image/card/4/9.jpg"
	document.getElementById("selfcard8img").src="image/card/3/3.jpg"
	document.getElementById("selfcard9img").src="image/card/3/9.jpg"

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
	setTimeout(function () {
		document.getElementById("kubariareadyn1").classList.add("cardkubari1");
		document.getElementById("kubariareadyn2").classList.add("cardkubari2");
		document.getElementById("kubariareadyn3").classList.add("cardkubari3");
		document.getElementById("kubariareadyn4").classList.add("cardkubari4");
		window.setInterval(function(){timer1()}, 400);
		setTimeout(function(){window.setInterval(timer2, 400)}, 100);
		setTimeout(function(){window.setInterval(timer3, 400)}, 200);
		setTimeout(function(){window.setInterval(timer4, 400)}, 300);
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
	else
		tm1 = 11;
	tm1 ++;
}
function timer2()
{
	if (tm2 < 10)
		document.getElementById("selfcard"+tm2).style.display="inline-block";
	else
		tm2 = 11;
	tm2 ++;
}
function timer3()
{
	if (tm3 < 10)
		document.getElementById("shimochacard"+tm3).style.display="block";
	else
		tm3 = 11;
	tm3 ++;
}
function timer4()
{
	if (tm4 < 10)
		document.getElementById("toimencard"+tm4).style.display="block";
	else
		tm4 = 11;
	tm4 ++;
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
			
}

