// Trying
var i = 0;
var makeda = false;
document.selfcard0img.src="image/null.png"
document.selfcard1img.src="image/null.png"
document.selfcard2img.src="image/null.png"
document.selfcard3img.src="image/null.png"
document.selfcard4img.src="image/null.png"
document.selfcard5img.src="image/null.png"

document.selfavaimg.src="image/person/kotori/seijou.png"
document.toimenavaimg.src="image/person/honoka/seijou.png"
document.shimochaavaimg.src="image/person/nico/seijou.png"
document.kamichaavaimg.src="image/person/umi/seijou.png"
window.setInterval(timer, 1000);
function timer()
{
	i = i + 1;
	if (i >= 10)
		i = 1;
	document.selfcard6img.src="image/card/1/"+i+".jpg"
	document.selfcard7img.src="image/card/2/"+i+".jpg"
	document.selfcard8img.src="image/card/3/"+i+".jpg"
	document.selfcard9img.src="image/card/4/"+i+".jpg"
}

function fcKamichaMouseOver(index) {
	if (!makeda)
		if (index == 3)
			document.kamichaavaimg.src="image/person/umi/ureshi.png"
		else
			document.kamichaavaimg.src="image/person/umi/eee.png"
}
function fcKamichaMouseOut(index) {
	if (!makeda)
		document.kamichaavaimg.src="image/person/umi/seijou.png"
}
function fcKamichaClick(index) {
	if (!makeda) {
		if (index == 3) {
			document.kamichaavaimg.src="image/person/umi/kachi.png"
			document.getElementById("kamichacard"+index+"img").src="image/card/jk/2.jpg"
		}
		else {
			document.kamichaavaimg.src="image/person/umi/kaoge.png"
			document.getElementById("kamichacard"+index+"img").src="image/card/2/"+(index+1)+".jpg"
		}
	}
	makeda = true;
			
}

