// Counter of Discarding Interval Timers
var tm1 = 0;
var tm2 = 0;
var tm3 = 0;
var tm4 = 0;

var makeda = false;
var sndplayreq = true;
var lastkamichacardsel = 0;

// Array of shuffling Cards
// Values Ranges from 0 to 36
var card; 
// Arrays of Hand Cards
var cardumi;
var cardself;
var cardnico;
var cardhonoka;
// Mapping of Players
var pKamicha = "Umi";
var pShimocha = "Nico";
var pToimen = "Honoka";
// Quantity of Hand of Player;
var qHandUmi = 0;
var qHandNico = 0;
var qHandHonoka = 0;
var qHandKotori = 0;
// Array Indicates wheter Hand of Player is Selected to Discard
var isSelHandSelf = new Array(false, false, false, false, false, false, false, false, false, false);
// Previous Select of Player's Hand
var qCardSel = 0; // Quantity of Selected Hand
var seqCardSel = new Array(null, null, null); //[2] for last;

var isClearSelf = false;
var isClearShimocha = false;
var isClearToimen = false;
var isClearKamicha = false;
// Handlers of Discarding Interval Timers
var timerhandler1;
var timerhandler2;
var timerhandler3;
var timerhandler4;

// Flag Variables Indicating States
// whether fcSelfClick Workes
var listenSelfCard = false;
// whether fcKamichaClick Workes
var listenKamichaCard = false;
// whether fcKamichaClick Donw
var doneKamichaCard = true;

// Func: Return a Copy of Card Array According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen})
// Ret : Array of Player's Hand
function cardArrayReturn(cha) {
	switch (cha) {
		case "Umi": return cardumi;
		case "Nico": return cardnico;
		case "Honoka": return cardhonoka;
	}
}

// Func: Assign a New Array to Card Array According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen}), a2a(array to assgin)
// Ret : Null
function cardArrayAssign(cha, a2a) {
	switch (cha) {
		case "Umi": cardumi = a2a;
					break;
		case "Nico": cardnico = a2a;
					 break;
		case "Honoka": cardhonoka = a2a;
					   break;
	}
}

// Func: Get the Length of Card Array According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen})
// Ret : length of card array
function cardArrayGetLength(cha) {
	switch (cha) {
		case "Umi": return cardumi.length;
		case "Nico": return cardnico.length;
		case "Honoka": return cardhonoka.length;
		default: return 0;
	}
}

// Func: Splice from Card Array According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen}), start(arg of splice), length(arg of splice)
// Ret : Null
function cardArraySplice(cha, start, length) {
	switch (cha) {
		case "Umi": cardumi.splice(start, length)
					break;
		case "Nico": cardnico.splice(start, length)
					 break;
		case "Honoka": cardhonoka.splice(start, length)
					   break;
	}
}

// Func: Push a Card to Card Array According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen}), card2push
// Ret : Null
function cardArrayPush(cha, card2push) {
	switch (cha) {
		case "Umi": cardumi.push(card2push)
					break;
		case "Nico": cardnico.push(card2push)
					 break;
		case "Honoka": cardhonoka.push(card2push)
					   break;
	}
}

// Func: Get Item of Card Array According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen}), index
// Ret : item of card array
function cardArrayItem(cha, index) {
	switch (cha) {
		case "Umi": return cardumi[index];
		case "Nico": return cardnico[index];
		case "Honoka": return cardhonoka[index];
		default: return null;
	}
}

// Func: Sort the Hand of Players According to Mapping Table of Players
// Para: cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen})
// Ret : Null
function cardArraySort(cha) {
	switch (cha) {
		case "Umi": cardumi = sort(cardumi);
					break;
		case "Nico": cardnico = sort(cardnico);
					 break;
		case "Honoka": cardhonoka = sort(cardhonoka);
					   break;
	}
}

// Func: To Compare which Card is After
// Para: a (CardIndex of Card A), b (CardIndex of Card B)
// Ret : whether Card A is after
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

// Func: To Compare whether 2 Cards's Num is the Same, i.e., They Can Make A Pair
// Para: a (CardIndex of Card A), b (CardIndex of Card B)
// Ret : whether 2 Card's Num is the Same
function isCardPair(a, b) {
	var suita = Math.floor(a / 9);
	var numa = a % 9;
	var suitb = Math.floor(b / 9);
	var numb = b % 9;
	if (suita == 4) // A is the only Joker
		return false;
	if (suitb == 4) // B is the only Joker
		return false;
	if (numa == numb)
		return true;
	else
		return false;
}

// Func: To Determine whether Their is Any Pair in Card
// Para: card2find(!SORTED! Array of Card)
// Ret : Index of The FIRST Card of The FIRST Pair in Card, If not Find, It Returns -1
//   	i.e, findCardPair({1,2,2,3,4,4}) return 1, which is the index of the first "2";
function findCardPair(card2find) {
	var ret = -1;
	for (var i = 0; i < card2find.length - 1; i++) {
		if (isCardPair(card2find[i], card2find[i+1])) {
			ret = i;
			break;
		}
	}
	return ret;
}

// Func: Generate a Random Integer Ranges from {0, num - 1}
// Para: num (Sup-Limit of Random Integer)
// Ret : the Random Integer
function randomInt(num) {
	return Math.floor(Math.random() * num);
}

// Func: Sort Cards According to function "isCardGreatThan()"
// Para: array (Array of Cards)
// Ret : Sorted Array;
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

// Func: Delete a Card in CardSelf
// Para: deli(the index of card to delete in CardSelf)
// Ret : Null
function del1CardSelf(deli)
{
	if (deli >= 0 && deli < cardself.length)
		cardself.splice(deli, 1);
}

// Func: Delete 2 Cards in CardSelf
// Para: deli, delj(the index of card to delete in CardSelf)
// Ret : Null
function del2CardSelf(deli, delj)
{
	if (deli == delj) {
		del1CardSelf(deli);
	}
	else {
		var delF = (deli > delj) ? delj : deli;
		var delL = ((deli > delj) ? deli : delj) - 1;
		if (delF >= 0 && delF < cardself.length)
			cardself.splice(delF, 1);
		if (delL >= 0 && delL < cardself.length)
			cardself.splice(delL, 1);
	}
}

// Func: Delete 2 Cards in CardSelf and Show an animation
// Para: deli, delj(the index of card to delete in CardSelf)
// Ret : Null
function del2CardSelfShow(deli, delj)
{
	setTimeout(function(varindexi, varindexj) {
		document.getElementById("selfcard"+varindexi+"in").classList.add("cardselectup");
		document.getElementById("selfcard"+varindexj+"in").classList.add("cardselectup");
	}, 300, deli, delj);
	setTimeout(function(varindexi, varindexj) {
		document.getElementById("selfcard"+varindexi+"in").classList.remove("cardselectup");
		document.getElementById("selfcard"+varindexi+"in").classList.add("cardselectupstatic");
		document.getElementById("selfcard"+varindexj+"in").classList.remove("cardselectup");
		document.getElementById("selfcard"+varindexj+"in").classList.add("cardselectupstatic");
	}, 400, deli, delj);
	setTimeout(function(varindexi, varindexj) {
		document.getElementById("selfcard"+varindexi+"img").classList.add("cardremove");
		document.getElementById("selfcard"+varindexi+"in").classList.add("cardremove");
		document.getElementById("selfcard"+varindexi).classList.add("cardremove");
		document.getElementById("selfcard"+varindexj+"img").classList.add("cardremove");
		document.getElementById("selfcard"+varindexj+"in").classList.add("cardremove");
		document.getElementById("selfcard"+varindexj).classList.add("cardremove");
	}, 1100, deli, delj);
	setTimeout(function(varindexi, varindexj) {
		document.getElementById("selfcard"+varindexi).style.display="none";
		document.getElementById("selfcard"+varindexi+"img").classList.remove("cardremove");
		document.getElementById("selfcard"+varindexi+"in").classList.remove("cardremove");
		document.getElementById("selfcard"+varindexi).classList.remove("cardremove");
		document.getElementById("selfcard"+varindexi+"in").classList.remove("cardselectupstatic");
		document.getElementById("selfcard"+varindexj).style.display="none";
		document.getElementById("selfcard"+varindexj+"img").classList.remove("cardremove");
		document.getElementById("selfcard"+varindexj+"in").classList.remove("cardremove");
		document.getElementById("selfcard"+varindexj).classList.remove("cardremove");
		document.getElementById("selfcard"+varindexj+"in").classList.remove("cardselectupstatic");
	}, 1500, deli, delj);
	setTimeout(function(varindexi, varindexj) {
		del2CardSelf(varindexi, varindexj);
		reshowCardSelf(-1);
	}, 1500, deli, delj);
}

// Func: Remove Select on Hand
// Para: Null
// Ret : Null
function rmSelectCardSelf()
{
	for (var x in isSelHandSelf)
		isSelHandSelf[x] = false;
	for (var x in seqCardSel)
		seqCardSel[x] = null;
	qCardSel = 0;
}

// Func: Insert a new card into Hand, including the Animation of that
// Para: insi(the index of card to delete in CardSelf)
// Ret : Null
function ins1CardSelf(insi)
{
	if (cardself.length >= 10)
		return;
	var pos2ins = cardself.length;
	for (var i = 0; i < cardself.length; i++) {
		if (isCardGreatThan(cardself[i], insi)) {
			pos2ins = i;
			break;
		}
	}
	cardself.splice(pos2ins, 0, insi);
	rmSelectCardSelf();
	reshowCardSelf(-1); // Rerender Hand Card Self, but Hide the One which Inserted just now;
	// Add Animation
	document.getElementById("selfcard"+pos2ins+"img").classList.add("cardcreate");
	document.getElementById("selfcard"+pos2ins+"in").classList.add("cardcreate");
	document.getElementById("selfcard"+pos2ins).classList.add("cardcreate");
	document.getElementById("selfcard"+pos2ins).style.display="inline-block";
	setTimeout(function(varindex) {
		document.getElementById("selfcard"+varindex+"img").classList.remove("cardcreate");
		document.getElementById("selfcard"+varindex+"in").classList.remove("cardcreate");
		document.getElementById("selfcard"+varindex).classList.remove("cardcreate");
	}, 400, pos2ins);
}

// Func: Update Render of Card Self
// Para: mask(to Mask One Card, Hidden, set -1 to Show All Cards)
// Ret : Null
function reshowCardSelf(mask)
{
	for (var i = 0; i < 10; i++) {
		document.getElementById("selfcard" + i + "in").classList.remove("cardselectupstatic");
		if (i < cardself.length) {
			document.getElementById("selfcard" + i + "img").src = getcardimgurl(cardself[i]);
			if (i != mask) {
				document.getElementById("selfcard" + i).style.display = "inline-block";
			}
			else {
				document.getElementById("selfcard" + i).style.display = "none";
			}
		}
		else {
			document.getElementById("selfcard" + i).style.display = "none";
		}
	}
}

// Func: Update Render of Card Other
// Para: chastr(string of player ranges from {"kamicha", "toimen", "shimocha"}), 
//		 cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen}),
// Ret : Null
function reshowCardOther(chastr, cha)
{
	for (var i = 0; i < 10; i++) {
		if (i < cardArrayGetLength(cha)) {
			document.getElementById(chastr+"card" + i + "img").src = "image/card/bk.png"
			document.getElementById(chastr+"card" + i).style.display = "inline-block";
		}
		else {
			document.getElementById(chastr+"card" + i).style.display = "none";
		}
	}
	if (chastr == "shimocha" || chastr == "toimen")
		recalWidth(chastr, cha);
}

// Func: Delete All Pairs of Players' Hands
// Para: Null
// Ret : Null
function delPairs()
{
	function delPairSelfRecu() {
		if((pair2del = findCardPair(cardself)) != -1) {
			del2CardSelfShow(pair2del, pair2del + 1);
			setTimeout(delPairSelfRecu, 1550);
		}
		else isClearSelf = true;
	}
	function delPairShimochaRecu() {
		var pair2del;
		if((pair2del = findCardPair(cardArrayReturn(pShimocha))) != -1) {
			del2CardOtherShow("shimocha", pShimocha, pair2del, pair2del + 1);
			setTimeout(delPairShimochaRecu, 1550);
		}
		else isClearShimocha = true;
	}
	function delPairToimenRecu() {
		var pair2del;
		if((pair2del = findCardPair(cardArrayReturn(pToimen))) != -1) {
			del2CardOtherShow("toimen", pToimen, pair2del, pair2del + 1);
			setTimeout(delPairToimenRecu, 1550);
		}
		else isClearToimen = true;
	}
	function delPairKamichaRecu() {
		var pair2del;
		if((pair2del = findCardPair(cardArrayReturn(pKamicha))) != -1) {
			del2CardOtherShow("kamicha", pKamicha, pair2del, pair2del + 1);
			setTimeout(delPairKamichaRecu, 1550);
		}
		else isClearKamicha = true;
	}
	delPairSelfRecu();
	delPairShimochaRecu();
	delPairToimenRecu();
	delPairKamichaRecu();
}

// Func: Active a Player's Area and Set Others Inactive
// Para: player(value ranges from {"self", "shimocha", "toimen", "kamicha"})
// Ret : Null
function activeAva(player) {
	document.getElementById("selfareadiv").classList.remove("avaactivestatic");
	document.getElementById("shimochaareadiv").classList.remove("avaactivestatic");
	document.getElementById("toimenareadiv").classList.remove("avaactivestatic");
	document.getElementById("kamichaareadiv").classList.remove("avaactivestatic");
	document.getElementById("selfareadiv").classList.add("avainactivestatic");
	document.getElementById("shimochaareadiv").classList.add("avainactivestatic");
	document.getElementById("toimenareadiv").classList.add("avainactivestatic");
	document.getElementById("kamichaareadiv").classList.add("avainactivestatic");

	document.getElementById(player + "areadiv").classList.add("avaactive");
	setTimeout(function (dom1) {
		dom1.classList.remove("avaactive");
		dom1.classList.remove("avainactivestatic");
		dom1.classList.add("avaactivestatic");
		//document.getElementById("selfareadiv").style.backgroundColor="#"
	}, 600, document.getElementById(player + "areadiv"));
}

// Func: Shuffle an Array by Swapping
// Para: array2sw(Array to Shuffle), times(Swapping Times)
// Ret : An Swapped Array
function shuffleArray(array2sw, times) {
	var length = array2sw.length;
	for (var i = 0; i < times; i++) {
		var swpi = randomInt(length);
		var swpj = randomInt(length);
		var tmpswp = array2sw[swpj];
		array2sw[swpj] = card[swpi];
		array2sw[swpi] = tmpswp;
	}
	return array2sw;
}

// Func: Shuffled Card by Swapping Cards,
//     Generating Arrays of 3 COM-Players and a Sorted Array of Player's Hand,
//     Storing in Global Variables
// Para: Null
// Ret : Null
function shufflesw() {
	card = [];
	for (var i = 0; i < 37; i++)
		card.push(i);
	card = shuffleArray(card, 500);
	cardArrayAssign(pKamicha, sort(card.slice(0,10)));
	cardself = sort(card.slice(10,19));
	cardArrayAssign(pShimocha, sort(card.slice(19,28)));
	cardArrayAssign(pToimen, sort(card.slice(28,37)));
}

// Func: Get A Card's image's url
// Para: cardnum (CardIndex Ranging from 0 to 36)
// Ret : Url of Image
function getcardimgurl(cardnum) {
	var suit = Math.floor(cardnum / 9) + 1;
	var num = cardnum % 9 + 1;
	if (suit == 5) {
		suit = "jk";
		num = 2; // the "white alpaca" as JOKER
	}
	return "image/card/" + suit + "/" + num + ".jpg";
}

// Func: Add an Animation of Drawing on Player's Hand
// Para: Null
// Ret : Null
function showselfcard() {
	for (var num = 0; num < 9; num++) {
		document.getElementById("selfcard" + num + "img").classList.add("cardmeguri");
		setTimeout(function (varnum) {
			document.getElementById("selfcard" + varnum + "img").src = getcardimgurl(cardself[varnum]);
		}, 150, num);
		setTimeout(function (varnum) {
			document.getElementById("selfcard" + varnum + "img").classList.remove("cardmeguri");
		}, 300, num);
	}
}

// Func: Recalculate the Width of Card-Div of Shimocha and Toimen when Discarding Cards
// Para: chastr(string of player ranges from {"toimen", "shimocha"}), 
// Ret : Null
function recalWidthDiscard(chastr) {
	var divw;
	switch (chastr) {
		case "shimocha":
			if (tm3 <= 2)
				divw = 100;
			else
				divw = (325 - 100) / (tm3);
			for (var ii = 0; ii < 10; ii++)
				document.getElementById("shimochacard" + ii).style.width = divw + "px";
			break;
		case "toimen":
			if (tm4 <= 2)
				divw = 100;
			else
				divw = (325 - 100) / (tm4);
			for (var ii = 0; ii < 10; ii++)
				document.getElementById("toimencard" + ii).style.width = divw + "px";
			break;
	}
}

// Func: Recalculate the Width of Card-Div of Shimocha and Toimen when Playing
// Para: chastr(string of player ranges from {"toimen", "shimocha"}), 
//		 cha(mapping of player, ranges from {pShimocha, pToimen}),
// Ret : Null
function recalWidth(chastr, cha) {
	var divw;
	var length = cardArrayGetLength(cha);
	if (length <= 3)
		divw = 100;
	else
		divw = (325 - 100) / (length - 1);
	switch (chastr) {
		case "shimocha":
			for (var ii = 0; ii < 10; ii++)
				document.getElementById("shimochacard" + ii).style.width = divw + "px";
			break;
		case "toimen":
			for (var ii = 0; ii < 10; ii++)
				document.getElementById("toimencard" + ii).style.width = divw + "px";
			break;
	}
}

// Func: Add an Animation of Discarding Cards
// Para: Null
// Ret : Null
function animateDiscard() {
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
	setTimeout(function() {
		document.getElementById("kubariareadyn1").classList.add("cardkubari1");
		document.getElementById("kubariareadyn2").classList.add("cardkubari2");
		document.getElementById("kubariareadyn3").classList.add("cardkubari3");
		document.getElementById("kubariareadyn4").classList.add("cardkubari4");
	}, 10);
}

// Func: Show Meguri and Remove Animation on Other's Card, and Then Delete It
// Para: chastr(string of player ranges from {"kamicha", "toimen", "shimocha"}), 
//		 cha(mapping of player, ranges from {pKamicha, pShimocha, pToimen}),
//		 indexi(Index of the Card to be Removed in Kamicha's Card)
//		 indexj(Index of the Card to be Removed in Kamicha's Card)
// Ret : Null
function del2CardOtherShow(chastr, cha, indexi, indexj) {
	// Show Animation of Meguri
	document.getElementById(chastr+"card"+indexi+"img").classList.add("cardmeguri");
	document.getElementById(chastr+"card"+indexj+"img").classList.add("cardmeguri");
	// Show Card's Face
	setTimeout(function(urli, varindexi, urlj, varindexj) {
		document.getElementById(chastr+"card"+varindexi+"img").src=urli;
		document.getElementById(chastr+"card"+varindexj+"img").src=urlj;
	}, 150, getcardimgurl(cardArrayItem(cha, indexi)), indexi, getcardimgurl(cardArrayItem(cha, indexj)), indexj);
	// Delete the Card in Array
	if (indexi == indexj) {
		cardArraySplice(cha, indexi, 1);
	}
	else {
		var delF = (indexi > indexj) ? indexj : indexi;
		var delL = ((indexi > indexj) ? indexi : indexj) - 1;
		if (delF >= 0 && delF < cardArrayGetLength(cha))
			cardArraySplice(cha, delF, 1);
		if (delL >= 0 && delL < cardArrayGetLength(cha))
			cardArraySplice(cha, delL, 1);
	}
	// Show Animation of Remove after 1.5 seconds
	setTimeout(function(varindexi, varindexj, chastr) {
		document.getElementById(chastr+"card"+varindexi+"img").classList.add("cardremove");
		document.getElementById(chastr+"card"+varindexj+"img").classList.add("cardremove");
		if (chastr == "kamicha") {
			document.getElementById(chastr+"card"+varindexi+"in").classList.add("cardremove");
			document.getElementById(chastr+"card"+varindexi).classList.add("cardremove");
			document.getElementById(chastr+"card"+varindexj+"in").classList.add("cardremove");
			document.getElementById(chastr+"card"+varindexj).classList.add("cardremove");
		}
	}, 1500, indexi, indexj, chastr);
	// Hidden Object and Remove ClassList
	setTimeout(function(varindexi, varindexj, chastr, cha) {
		document.getElementById(chastr+"card"+varindexi).style.display="none";
		document.getElementById(chastr+"card"+varindexi+"img").classList.remove("cardremove");
		document.getElementById(chastr+"card"+varindexi+"img").classList.remove("cardmeguri");
		document.getElementById(chastr+"card"+varindexj).style.display="none";
		document.getElementById(chastr+"card"+varindexj+"img").classList.remove("cardremove");
		document.getElementById(chastr+"card"+varindexj+"img").classList.remove("cardmeguri");
		if (chastr == "kamicha") {
			document.getElementById(chastr+"card"+varindexi+"in").classList.remove("cardremove");
			document.getElementById(chastr+"card"+varindexi).classList.remove("cardremove");
			document.getElementById(chastr+"card"+varindexj+"in").classList.remove("cardremove");
			document.getElementById(chastr+"card"+varindexj).classList.remove("cardremove");
		}
		reshowCardOther(chastr, cha);
	}, 1890, indexi, indexj, chastr, cha);
}

// Func: Initialization
// Para: Null
// Ret : Null
function init() {
	preLoadImg();	

	document.getElementById("toimencard0img").src="image/card/bk.png";
	document.getElementById("toimencard1img").src="image/card/bk.png";
	document.getElementById("toimencard2img").src="image/card/bk.png";
	document.getElementById("toimencard3img").src="image/card/bk.png";
	document.getElementById("toimencard4img").src="image/card/bk.png";
	document.getElementById("toimencard5img").src="image/card/bk.png";
	document.getElementById("toimencard6img").src="image/card/bk.png";
	document.getElementById("toimencard7img").src="image/card/bk.png";
	document.getElementById("toimencard8img").src="image/card/bk.png";
	document.getElementById("toimencard9img").src="image/card/bk.png";

	document.getElementById("shimochacard0img").src="image/card/bk.png";
	document.getElementById("shimochacard1img").src="image/card/bk.png";
	document.getElementById("shimochacard2img").src="image/card/bk.png";
	document.getElementById("shimochacard3img").src="image/card/bk.png";
	document.getElementById("shimochacard4img").src="image/card/bk.png";
	document.getElementById("shimochacard5img").src="image/card/bk.png";
	document.getElementById("shimochacard6img").src="image/card/bk.png";
	document.getElementById("shimochacard7img").src="image/card/bk.png";
	document.getElementById("shimochacard8img").src="image/card/bk.png";
	document.getElementById("shimochacard9img").src="image/card/bk.png";

	document.getElementById("selfcard0img").src="image/card/bk.png";
	document.getElementById("selfcard1img").src="image/card/bk.png";
	document.getElementById("selfcard2img").src="image/card/bk.png";
	document.getElementById("selfcard3img").src="image/card/bk.png";
	document.getElementById("selfcard4img").src="image/card/bk.png";
	document.getElementById("selfcard5img").src="image/card/bk.png";
	document.getElementById("selfcard6img").src="image/card/bk.png";
	document.getElementById("selfcard7img").src="image/card/bk.png";
	document.getElementById("selfcard8img").src="image/card/bk.png";
	document.getElementById("selfcard9img").src="image/card/bk.png";

	document.getElementById("kubariareaimg").src="image/card/bk.png";

	document.getElementById("selfavaimg").src="image/person/kotori/seijou.png";
	document.getElementById("toimenavaimg").src="image/person/honoka/seijou.png";
	document.getElementById("shimochaavaimg").src="image/person/nico/seijou.png";
	document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png";

	document.getElementById("selfareadiv").classList.add("avainactivestatic");
	document.getElementById("toimenareadiv").classList.add("avainactivestatic");
	document.getElementById("kamichaareadiv").classList.add("avainactivestatic");
	document.getElementById("shimochaareadiv").classList.add("avainactivestatic");

	document.getElementById("selfavaimg").addEventListener("click", function(e) {
		document.getElementById("selfavaimg").classList.add("change-size");
		setTimeout(function() {
			document.getElementById("selfavaimg").classList.remove("change-size");
		} ,1000);
	});
	// Shuffle Card and Discarding them
	shufflesw();
	setTimeout(function () {
		animateDiscard();
	}, 1000);
	// Start from Self (to Get Card from Umi SONODA)
	setTimeout(function () {
		showselfcard();
		SelfHandler();
	}, 1000 + 10 * 400)
	// Discard All Pairs of Every Player of Hand
	setTimeout(function () {
		delPairs();
	}, 1000 + 10 * 400 + 400);
}

// Func: Load Image for Speeding Up
// Para: Null
// Ret : Null
function preLoadImg()
{
	for (var imgi = 1; imgi < 5; imgi ++) {
		for (var imgj = 1; imgj < 10; imgj ++)
		{
			var img = new Image();
			img.src = "image/card/" + imgi + "/" + imgj + ".jpg";
		}
	}
	var img = new Image();
	img.src = "image/card/jk/2.jpg";
}

// Func: Interval Timer for Discarding Cards to Kamicha (Umi Sonoda)
// Para: Null
// Ret : Null
function timer1()
{
	if (tm1 < 10) {
		document.getElementById("sndcard1").play();
		document.getElementById("sndcard1").volume = "0.3";
		qHandUmi = tm1;
		document.getElementById("kamichacard"+tm1).style.display="inline-block";
	}
	if (tm1 == 9)
	{
		document.getElementById("kubariareadyn1").style.display="none";
		document.getElementById("kubariareadyn1").classList.remove("cardkubari1");
		window.clearInterval(timerhandler1);
	}
	tm1 ++;
}

// Func: Interval Timer for Discarding Cards to Player Self (Kotori Minami)
// Para: Null
// Ret : Null
function timer2()
{
	if (tm2 < 9) {
		document.getElementById("sndcard2").play();
		document.getElementById("sndcard2").volume = "0.3";
		qHandKotori = tm2;
		document.getElementById("selfcard"+tm2).style.display="inline-block";
	}
	if (tm2 == 8)
	{
		document.getElementById("kubariareadyn2").style.display="none";
		document.getElementById("kubariareadyn2").classList.remove("cardkubari2");
		document.getElementById("kubariarea").style.display="none";
		window.clearInterval(timerhandler2);
	}
	tm2 ++;
}

// Func: Interval Timer for Discarding Cards to Shimocha (Nico Yazawa)
// Para: Null
// Ret : Null
function timer3()
{
	if (tm3 < 9) {
		document.getElementById("sndcard3").play();
		document.getElementById("sndcard3").volume = "0.3";
		qHandNico = tm3;
		document.getElementById("shimochacard"+tm3).style.display="block";
		recalWidthDiscard("shimocha");
	}
	if (tm3 == 8)
	{
		document.getElementById("kubariareadyn3").style.display="none";
		document.getElementById("kubariareadyn3").classList.remove("cardkubari3");
		window.clearInterval(timerhandler3);
	}
	tm3 ++;
}

// Func:The 2 Functions below:
//		Handle Process in Self's Turn
//		Including Getting Card from Kamicha and Discard Pairs
//			with fcKamichaClick;
//		After Which It will Call the Function to Handle Process in Shimocha(Nico YAZAWA)'s Turn
// Para: Null
// Ret : Null
function SelfHandler()
{
	activeAva("self");
	doneKamichaCard = false;
	listenKamichaCard = true;
	// wait for player select a card from kamicha;
}
function SelfHandler2() {
	// after player click a card from kamicha
	var pair2del;
	if((pair2del = findCardPair(cardself)) != -1) {
		del2CardSelfShow(pair2del, pair2del + 1);
		setTimeout("document.getElementById(\"sndyatta\").play()", 200);
	}
	setTimeout(function() {
		ShimochaHandler();
	}, 2000);
}

// Func: Handle Process in Shimocha's Turn
//		 Including Getting Card from Self and Discard Pairs
//		 After Which It will Call the Function to Handle Process in Toimen(Honoka KOUSAKA)'s Turn
// Para: Null
// Ret : Null
function ShimochaHandler() {
	activeAva("shimocha");
	var carddeltmp;
	var carddeltmpindex;
	// Generate a Random Index of Deleting Self's Card
	carddeltmpindex = randomInt(cardself.length);
	carddeltmp = cardself[carddeltmpindex];
	// Delete a Card from CardSelf
	setTimeout(function(index) {
		del2CardSelfShow(index, index);
	}, 600, carddeltmpindex);
	// Add a Card to Shimocha's Hand
	setTimeout(function(c) {
		cardArrayPush(pShimocha, c);
		cardArraySort(pShimocha);
		recalWidthDiscard("shimocha");
		reshowCardOther("shimocha", pShimocha);
	}, 600 + 1500, carddeltmp);

	// Find a pair in Shimocha's Hand and Delete It
	setTimeout(function() {
		var pair2del;
		if((pair2del = findCardPair(cardArrayReturn(pShimocha))) != -1) {
			// delete in the same Position to Delete 2 Cards in Pair
			del2CardOtherShow("shimocha", pShimocha, pair2del, pair2del + 1);
			// TODO add an sndof niconiconi
			// Mapping to pKamicha
			// setTimeout("document.getElementById(\"sndniconiconi\").play()", 200);
		}
	}, 600 + 1500 + 400);

	// Call ToimenHandler
	setTimeout(function() {
		ToimenHandler();
	}, 600 + 1500 + 2000);
}

// Func: Handle Process in Toimen's Turn
//		 Including Getting Card from Shimocha and Discard Pairs
//		 After Which It will Call the Function to Handle Process in Kamicha(Umi SONODA)'s Turn
// Para: Null
// Ret : Null
function ToimenHandler() {
	activeAva("toimen");
	var carddeltmp;
	var carddeltmpindex;
	// Generate a Random Index of Deleting Shimocha's Card
	carddeltmpindex = randomInt(cardArrayGetLength(pShimocha));
	carddeltmp = cardArrayItem(pShimocha, carddeltmpindex);
	// Delete a Card from CardToimen
	setTimeout(function(index) {
		del2CardOtherShow("shimocha", pShimocha, index, index);
	}, 600, carddeltmpindex);
	// Add a Card to Toimen's Hand
	setTimeout(function(c) {
		cardArrayPush(pToimen, c);
		cardArraySort(pToimen);
		recalWidthDiscard("toimen");
		reshowCardOther("toimen", pToimen);
	}, 600 + 1500, carddeltmp);

	// Find a pair in Toimen's Hand and Delete It
	setTimeout(function() {
		var pair2del;
		if((pair2del = findCardPair(cardArrayReturn(pToimen))) != -1) {
			// delete in the same Position to Delete 2 Cards in Pair
			del2CardOtherShow("toimen", pToimen, pair2del, pair2del + 1);
			// TODO add an sndof mayakusaikou
			// Mapping to pToimen
			// setTimeout("document.getElementById(\"sndniconiconi\").play()", 200);
		}
	}, 600 + 1500 + 400);

	// Call KamichaHandler
	setTimeout(function() {
		KamichaHandler();
	}, 600 + 1500 + 2000);
}

// Func: Handle Process in Kamicha's Turn
//		 Including Getting Card from Toimen and Discard Pairs
//		 After Which It will Call the Function to Handle Process in Player(Kotori MINAMI)'s Turn
// Para: Null
// Ret : Null
function KamichaHandler() {
	activeAva("kamicha");
	var carddeltmp;
	var carddeltmpindex;
	// Generate a Random Index of Deleting Toimen's Card
	carddeltmpindex = randomInt(cardArrayGetLength(pToimen));
	carddeltmp = cardArrayItem(pToimen, carddeltmpindex);
	// Delete a Card from CardToimen
	setTimeout(function(index) {
		del2CardOtherShow("toimen", pToimen, index, index);
	}, 600, carddeltmpindex);
	// Add a Card to Kamicha's Hand
	setTimeout(function(c) {
		cardArrayPush(pKamicha, c);
		cardArraySort(pKamicha);
		recalWidthDiscard("kamicha");
		reshowCardOther("kamicha", pKamicha);
	}, 600 + 1500, carddeltmp);

	// Find a pair in Kamicha's Hand and Delete It
	setTimeout(function() {
		var pair2del;
		if((pair2del = findCardPair(cardArrayReturn(pKamicha))) != -1) {
			// delete in the same Position to Delete 2 Cards in Pair
			del2CardOtherShow("kamicha", pKamicha, pair2del, pair2del + 1);
			// TODO add an sndof Umiumiu~
			// Mapping to pKamicha
			// setTimeout("document.getElementById(\"sndniconiconi\").play()", 200);
		}
	}, 600 + 1500 + 400);

	// Call SelfHandler
	setTimeout(function() {
		SelfHandler();
	}, 600 + 1500 + 2000);
}

// Func: Interval Timer for Discarding Cards to Toimen (Honoka Kousaka)
// Para: Null
// Ret : Null
function timer4()
{
	if (tm4 < 9) {
		document.getElementById("sndcard4").play();
		document.getElementById("sndcard4").volume = "0.3";
		qHandHonoka = tm4;
		document.getElementById("toimencard"+tm4).style.display="block";
		recalWidthDiscard("toimen");
	}
	if (tm4 == 8)
	{
		document.getElementById("kubariareadyn4").style.display="none";
		document.getElementById("kubariareadyn4").classList.remove("cardkubari4");
		window.clearInterval(timerhandler4);
	}
	tm4 ++;
}

// Func: Kamicha MouserOver Listener
// Para: Null
// Ret : Null
function fcKamichaMouseOver(index) {
	if (listenKamichaCard) {
		if (index == 3) {
			sndplayreq = true;
			lastkamichacardsel = index;
			setTimeout(function() {
				if (sndplayreq && lastkamichacardsel == index)
					document.getElementById("sndureshi").play();
			}, 400);
			document.getElementById("kamichaavaimg").src="image/person/umi/ureshi.png";
		}
		else {
			sndplayreq = true;
			lastkamichacardsel = index;
			setTimeout(function() {
				if (sndplayreq && lastkamichacardsel == index)
					document.getElementById("sndeee").play();
			}, 400);
			document.getElementById("kamichaavaimg").src="image/person/umi/eee.png";
		}
		document.getElementById("kamichacard"+index+"img").src="image/card/bk-hover.png";
	}
}

// Func: Kamicha MouserOut Listener
// Para: Null
// Ret : Null
function fcKamichaMouseOut(index) {
	if (listenKamichaCard) {
		sndplayreq = false;
		document.getElementById("kamichaavaimg").src="image/person/umi/seijou.png";
		document.getElementById("kamichacard"+index+"img").src="image/card/bk.png";
	}
}

// Func: Kamicha Click Listener
// Para: Null
// Ret : Null
function fcKamichaClick(index) {
	if (listenKamichaCard && isClearSelf && isClearShimocha && isClearToimen && isClearKamicha) {
		listenKamichaCard = false;
		sndplayreq = false;
		document.getElementById("sndei").play();
		setTimeout("document.getElementById(\"sndkaoge\").play()", 120);
		document.getElementById("kamichaavaimg").src="image/person/umi/kaoge.png";
		setTimeout(function(card2ins) {
			ins1CardSelf(card2ins);
		}, 1500, cardArrayItem(pKamicha, index));
		del2CardOtherShow("kamicha", pKamicha, index, index);
		setTimeout(function() {
			doneKamichaCard = true;
			SelfHandler2();
		}, 2000);
	}
}

function fcSelfClick(index) {
//	if (isSelHandSelf[index]) {
//		document.getElementById("selfcard"+index+"in").classList.add("cardselectdown");
//		setTimeout(function(varindex) {
//			document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectdown");
//			document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectupstatic");
//		}, 100, index);
//		isSelHandSelf[index] = false;
//		if (seqCardSel[0] == index) {
//			seqCardSel[0] = seqCardSel[1];
//			seqCardSel[1] = seqCardSel[2];
//		}
//		if (seqCardSel[1] == index) {
//			seqCardSel[1] = seqCardSel[2];
//		}
//		qCardSel --;
//	}
//	else {
//		var removed = false;
//		document.getElementById("selfcard"+index+"in").classList.add("cardselectup");
//		setTimeout(function(varindex) {
//			document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectup");
//			document.getElementById("selfcard"+varindex+"in").classList.add("cardselectupstatic");
//		}, 100, index);
//		seqCardSel[qCardSel] = index;
//		qCardSel ++;
//		for (var i = 0; i < qCardSel; i++) {
//			for (var j = i + 1; j < qCardSel; j++) {
//				if (isCardPair(cardself[seqCardSel[i]], cardself[seqCardSel[j]])) {
//					setTimeout(function(varindexi, varindexj) {
//						document.getElementById("selfcard"+varindexi+"img").classList.add("cardremove");
//						document.getElementById("selfcard"+varindexi+"in").classList.add("cardremove");
//						document.getElementById("selfcard"+varindexi).classList.add("cardremove");
//						document.getElementById("selfcard"+varindexj+"img").classList.add("cardremove");
//						document.getElementById("selfcard"+varindexj+"in").classList.add("cardremove");
//						document.getElementById("selfcard"+varindexj).classList.add("cardremove");
//					}, 500, seqCardSel[i], seqCardSel[j]);
//					setTimeout(function(varindexi, varindexj) {
//						document.getElementById("selfcard"+varindexi).style.display="none";
//						document.getElementById("selfcard"+varindexi+"img").classList.remove("cardremove");
//						document.getElementById("selfcard"+varindexi+"in").classList.remove("cardremove");
//						document.getElementById("selfcard"+varindexi).classList.remove("cardremove");
//						document.getElementById("selfcard"+varindexj).style.display="none";
//						document.getElementById("selfcard"+varindexj+"img").classList.remove("cardremove");
//						document.getElementById("selfcard"+varindexj+"in").classList.remove("cardremove");
//						document.getElementById("selfcard"+varindexj).classList.remove("cardremove");
//					}, 900, seqCardSel[i], seqCardSel[j]);
//					setTimeout(function(varindexi, varindexj) {
//						del2CardSelf(varindexi, varindexj);
//						reshowCardSelf(-1);
//					}, 900, seqCardSel[i], seqCardSel[j]);
//					if (qCardSel == 3) {
//						document.getElementById("selfcard"+seqCardSel[3-i-j]+"in").classList.add("cardselectdown");
//						setTimeout(function(varindex) {
//							document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectdown");
//							document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectupstatic");
//						}, 100, seqCardSel[3-i-j]); // if 3 cards selected, putdown the other.
//					}
//					setTimeout("document.getElementById(\"sndyatta\").play()", 200);
//					removed = true;
//					rmSelectCardSelf();
//				}
//			}
//		}
//		if (qCardSel == 3) {
//			document.getElementById("selfcard"+seqCardSel[0]+"in").classList.add("cardselectdown");
//			setTimeout(function(varindex) {
//				document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectdown");
//				document.getElementById("selfcard"+varindex+"in").classList.remove("cardselectupstatic");
//			}, 100, seqCardSel[0]);
//			isSelHandSelf[seqCardSel[0]] = false;
//			seqCardSel[0] = seqCardSel[1];
//			seqCardSel[1] = seqCardSel[2];
//			qCardSel = 2;
//		}
//		if (!removed)
//			isSelHandSelf[index] = true;
//	}
}

