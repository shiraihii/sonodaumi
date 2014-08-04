// Trying
var i = 0;
document.selfcard0img.src="image/null.png"
document.selfcard1img.src="image/null.png"
document.selfcard2img.src="image/null.png"
document.selfcard3img.src="image/null.png"
document.selfcard4img.src="image/null.png"
document.selfcard5img.src="image/null.png"
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
