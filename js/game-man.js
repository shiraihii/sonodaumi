// Trying
var i = 0;
var makeda = false;
function init() {
	preLoadImg();	
	document.getElementById("selfcard0img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard1img").src="image/card/jk/2.jpg"
	document.getElementById("selfcard2img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard3img").src="image/card/jk/2.jpg"
	document.getElementById("selfcard4img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard5img").src="image/card/jk/2.jpg"

	document.getElementById("toimencard0img").src="image/card/bk.jpg"
	document.getElementById("toimencard1img").src="image/card/bk.jpg"
	document.getElementById("toimencard2img").src="image/card/bk.jpg"
	document.getElementById("toimencard3img").src="image/card/bk.jpg"
	document.getElementById("toimencard4img").src="image/card/bk.jpg"
	document.getElementById("toimencard5img").src="image/card/bk.jpg"
	document.getElementById("toimencard6img").src="image/card/bk.jpg"
	document.getElementById("toimencard7img").src="image/card/bk.jpg"
	document.getElementById("toimencard8img").src="image/card/bk.jpg"
	document.getElementById("toimencard9img").src="image/card/bk.jpg"
	document.getElementById("shimochacard0img").src="image/card/bk.jpg"
	document.getElementById("shimochacard1img").src="image/card/bk.jpg"
	document.getElementById("shimochacard2img").src="image/card/bk.jpg"
	document.getElementById("shimochacard3img").src="image/card/bk.jpg"
	document.getElementById("shimochacard4img").src="image/card/bk.jpg"
	document.getElementById("shimochacard5img").src="image/card/bk.jpg"
	document.getElementById("shimochacard6img").src="image/card/bk.jpg"
	document.getElementById("shimochacard7img").src="image/card/bk.jpg"
	document.getElementById("shimochacard8img").src="image/card/bk.jpg"
	document.getElementById("shimochacard9img").src="image/card/bk.jpg"

	document.getElementById("selfavaimg").src="image/person/kotori/seijou.png"
	document.getElementById("toimenavaimg").src="image/person/honoka/seijou.png"
	document.getElementById("shimochaavaimg").src="image/person/nico/seijou.png"
	document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png"
	document.getElementById("selfcard0").style.display="none";
	document.getElementById("selfcard1").style.display="none";
	document.getElementById("selfcard2").style.display="none";
	document.getElementById("selfcard3").style.display="none";
	document.getElementById("kamichacard6").style.display="none";
	document.getElementById("kamichacard7").style.display="none";
	document.getElementById("kamichacard8").style.display="none";
	document.getElementById("kamichacard9").style.display="none";
	window.setInterval(timer, 1000);
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
function timer()
{
	i = i + 1;
	if (i >= 10)
		i = 1;
	document.getElementById("selfcard6img").src="image/card/1/"+i+".jpg"
	document.getElementById("selfcard7img").src="image/card/2/"+i+".jpg"
	document.getElementById("selfcard8img").src="image/card/3/"+i+".jpg"
	document.getElementById("selfcard9img").src="image/card/4/"+i+".jpg"
}

function fcKamichaMouseOver(index) {
	if (!makeda) {
		if (index == 3) {
			document.getElementById("sndureshi").play();
			document.getElementById("kamichaavaimg").src="image/person/umi/ureshi.png"
		}
		else {
			document.getElementById("sndeee").play();
			document.getElementById("kamichaavaimg").src="image/person/umi/eee.png"
		}
		document.getElementById("kamichacard"+index+"img").src="image/card/bk-hover.jpg"
	}
}
function fcKamichaMouseOut(index) {
	if (!makeda) {
		document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png"
		document.getElementById("kamichacard"+index+"img").src="image/card/bk.jpg"
	}
}
function fcKamichaClick(index) {
	if (!makeda) {
		document.getElementById("sndei").play();
		if (index == 3) {
			document.getElementById("kamichaavaimg").src="image/person/umi/kachi.png"
			document.getElementById("kamichacard"+index+"img").src="image/card/jk/2.jpg"
		}
		else {
			setTimeout("document.getElementById(\"sndkaoge\").play()", 120);
			document.getElementById("kamichaavaimg").src="image/person/umi/kaoge.png"
			document.getElementById("kamichacard"+index+"img").src="image/card/2/"+(index+1)+".jpg"
		}
	}
	makeda = true;
			
}

