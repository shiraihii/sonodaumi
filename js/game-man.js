// Trying
var i = 0;
var makeda = false;
function init() {
	document.getElementById("selfcard0img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard1img").src="image/card/jk/2.jpg"
	document.getElementById("selfcard2img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard3img").src="image/card/jk/2.jpg"
	document.getElementById("selfcard4img").src="image/card/jk/1.jpg"
	document.getElementById("selfcard5img").src="image/card/jk/2.jpg"

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
	if (!makeda)
		if (index == 3)
			document.getElementById("kamichaavaimg").src="image/person/umi/ureshi.png"
		else
			document.getElementById("kamichaavaimg").src="image/person/umi/eee.png"
}
function fcKamichaMouseOut(index) {
	if (!makeda)
		document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png"
}
function fcKamichaClick(index) {
	if (!makeda) {
		if (index == 3) {
			document.getElementById("kamichaavaimg").src="image/person/umi/kachi.png"
			document.getElementById("kamichacard"+index+"img").src="image/card/jk/2.jpg"
		}
		else {
			document.getElementById("kamichaavaimg").src="image/person/umi/kaoge.png"
			document.getElementById("kamichacard"+index+"img").src="image/card/2/"+(index+1)+".jpg"
		}
	}
	makeda = true;
			
}

