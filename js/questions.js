$("img").on("contextmenu", function(){
return false;
});

$("audio").on("contextmenu", function(){
return false;
});

var booksArray = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Songs of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"];

var imagesbg = ["bg0.png", "bg1.png", "bg9.png", "bg3.png", "bg13.png", "bg5.png", "bg6.png", "bg7.png","bg8.png", "bg9.png", "bg10.png", "bg11.png", "bg12.png", "bg13.png", "bg14.png", "bg15.png","bg16.png", "bg17.png", "bg18.png", "bg19.png"];

var bodyimagesbg = ["bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png","bg8.png", "bg9.png", "bgis.jpeg"];

var keywords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million"];
var wordsfd = [];
var wordsfdidx = [];

var mus = '';
var sd = '';

var currBk = '';
var level = '';
var currQn = '';
var favs = '';

var vrefs = [];
var vtxts = [];

var currDs = '';

function is_in_array(s, a){
a = keywords;
p = false;
for(var i = 0; i < a.length; i++){
if(s.toLowerCase().indexOf(a[i]) != -1){
p = true;
}
}
return p;
}

function dashword(w, a){
a = keywords;
dw = '';
for(var i = 0; i < a.length; i++){
if(w.toLowerCase().indexOf(a[i]) != -1){
dw = w.toLowerCase().replace(a[i], "___");
}
}
return dw;
}

function getdashedword(w, a){
a = keywords;
dw = '';
for(var i = 0; i < a.length; i++){
if(w.toLowerCase().indexOf(a[i]) != -1){
dw = a[i];
}
}
return dw;
}

var dashverse = function(s, k){
var sp = s.split(" ");
var st = "";
for(var i = 0; i < sp.length; i++){
if(is_in_array(sp[i])){
wordsfd.push(sp[i]);
wordsfdidx.push(i);
st = s.substring(0, s.indexOf(sp[i]));
st += dashword(sp[i]);
st += s.substring(s.indexOf(sp[i])+sp[i].length, s.length);
}
if(st != ""){
s = st;
}
}
return s;
}

var get2Offset = function(p, bk){
var minarr = [];
for(var it = 0; it < p.length; it++){
var t = p[it];
if(t.indexOf(bk)>-1){
minarr.push(it);
}
}
return minarr[0];
}

var loadData = function(){

var data = loadDbData();
var dtpts = data.split("**");
mus = dtpts[0];
sd = dtpts[1];
currBk = dtpts[2];
level = dtpts[3];
favs = dtpts[4];
currDs = 1;
currQn = 1;
vrefs = [];
vtxts = [];

//vrefs , vtxts
var off = (level-1)*5;
var p = db_kjv.split("***");


var off2 = get2Offset(p, currBk);

off += off2;
var max = off + 5;

for(var it = 0; it < p.length; it++){
var t = p[it];
if(t.indexOf(currBk)>-1){
var rf = t.substring(0, t.indexOf("**")).replace(currBk+"*", "");
var vt = t.replace(currBk+"*"+rf+"**", "");

if(it >= off && it < max){
vrefs.push(rf);
vtxts.push(vt);
}
}
}

}

var addFavoriteVerse = function(bkIdx,vr){

var isfav = false;

if(favs.indexOf(bkIdx+" "+vr) > -1){
isfav = true;
}

if(isfav){
$("#favcheck").css("background","white");
$("#favcheck").html("<img style='border-radius: 5px; width:16px; height:16px;margin-right:5px;' src='./images/others/star.png'/>Add to Favorites");

favs = deleteFavVerse(bkIdx+" "+vr);

}else{

$("#favcheck").css("background","pink");
$("#favcheck").html("<img style='border-radius: 5px; width:16px; height:16px;margin-right:5px;' src='./images/others/star.jpg'/>Added to Favorites");

favs = addFavVerse(bkIdx+" "+vr);

}

}

//addFavoriteVerse(booksArray.indexOf("Genesis")+1, "1:9");

var getCAIndex = function(){
return Math.floor(Math.random() * 4);
}

var getFourAnswers = function(wta, a){
a = keywords;
if(wta.length < 4){
var wt = a[Math.floor(Math.random() * a.length)];
if(wta.indexOf(wt) == -1){
wta.push(wt);
}
getFourAnswers(wta);
}
return wta;

}

var generateAnswers = function(wd, a){
a = keywords;
var wt = "";
for(var i = 0; i < a.length; i++){
var idx = wd.toLowerCase().indexOf(a[i]);
if(idx > -1){
wt = a[i];
}
}

var info = {arr:getFourAnswers([wt]), idx:getCAIndex()};

return info;
}

var rearrangeArray = function(anss, idx, wd){
var w = anss[idx];
anss[0] = w;
anss[idx] = wd;
return anss;
}

var displayQn = function(cq, cd, s){
//que, curr dash

$("#cont").css("background-image","url(./images/others/"+imagesbg[Math.floor(Math.random() * imagesbg.length)]+")").css("background-size","100% 100%");

$("body").css("background-image","url(./images/bg/"+bodyimagesbg[Math.floor(Math.random() * bodyimagesbg.length)]+")").css("background-size","100% 100%");

$("#book").html(currBk+'<svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg>');
$("#level").html("Level "+level+'<svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg>');
$("#question").html("Question "+cq);

var vrss = vrefs[cq-1];

var color = '';
var img = '';

var isfav = false;
if(favs.indexOf((booksArray.indexOf(currBk)+1)+" "+vrss) > -1){
isfav = true;
}

if(isfav){
var expt = "Added to Favorites";
color = "pink";
img = "star.jpg";
}else{
var expt = "Add to Favorites";
color = "white";
img = "star.png";
}

var qntxt = "";

qntxt += '<span style="color: gold; text-shadow: none; font-size: 25px; font-weight:bold">' + currBk + " "+ vrss + " - KJV</span>";

qntxt += "<span id='favcheck' onclick='playClickSd();addFavoriteVerse("+(booksArray.indexOf(currBk)+1)+",vrefs["+cq+"-1]);' style='border-radius: 5px; font-weight: bold; background: "+color+"; color:black; width:wrap-content; font-size: 12px; padding: 6px;height:15px; margin-left:10px;'><img style='border-radius: 5px; width:16px; height:16px;margin-right:5px;' src='./images/others/"+img+"'/>"+expt+"</span><br/>";

qntxt += '<span id="dash_area">' + s.replace("___", '<div id="dash" ondragenter="return dragEnter(event)" ondragleave="return dragLeave(event)" ondrop="return dragDrop(event)" ondragover="return dragOver(event)"></div>').replaceAll("***", "'").replaceAll("**", "\"") + '</span>';

$("#qn-txt").html(qntxt);

var ansarr = generateAnswers(wordsfd[cd-1]);

var anss = ansarr["arr"];
var idx = ansarr["idx"];
anss = rearrangeArray(anss, idx, getdashedword(wordsfd[cd-1]));

var atxt = '';
for(i=0; i<4; i++){
atxt += '<div class="answer"';
if(i == idx){
atxt += 'id="correct"';
}
atxt += 'draggable="true" ondragstart="return dragStart(event)">'+anss[i]+'</div>';
}

$("#answer-area").html(atxt);
}

loadData();
var st = dashverse(vtxts[currQn-1], keywords);
displayQn(currQn, currDs, st);

var loadStats = function(){
//stats
loadData(); 
var nofav = 0;
if(favs != ""){nofav = favs.split(",").length;}

var stxt = "";
stxt += '<table class="my-tables">';

stxt += '<tr><td>Current Book</td><td>'+currBk+'</td></tr>';

stxt += '<tr><td>Current Level</td><td>'+level+'</td></tr>';

stxt += '<tr><td ';

stxt += 'onclick="playClickSd();setAllFavsText(0)"';

stxt += '>Favourite Verses</td><td>'+nofav+'</td></tr>';

$("#menu-statistics").html(stxt);
}

if(mus == 1){
$("#sett-music-icon").removeAttr("src", "./images/others/music-off.png");
$("#sett-music-icon").attr("src","./images/others/music-on.png");
}else{
$("#sett-music-icon").removeAttr("src", "./images/others/music-on.png");
$("#sett-music-icon").attr("src","./images/others/music-off.png");
}
if(sd == 1){
$("#sett-sound-icon").removeAttr("src", "./images/others/sound-off.png");
$("#sett-sound-icon").attr("src","./images/others/sound-on.png");
}else{
$("#sett-sound-icon").removeAttr("src", "./images/others/sound-on.png");
$("#sett-sound-icon").attr("src","./images/others/sound-off.png");
}


var playMusic = function(e){
if(mus == "1"){
document.getElementById("bgm").play();
}
}

var playClickSd = function(e){
if(sd == "1"){
var time = new Date().getTime();
var audio = document.createElement("audio");
audio.setAttribute("type", "audio/mp3");
audio.setAttribute("src", "./audio/buttonClick.mp3");
audio.setAttribute("style", "display:none");
audio.setAttribute("controlslist", "nodownload");
audio.setAttribute("id", "click"+time);
$("body").append(audio);
audio.play();
setTimeout(function(){
document.getElementById("click"+time).remove();
},1000);
}
}

var playAppldSd = function(){
if(sd == "1"){
var time = new Date().getTime();
var audio = document.createElement("audio");
audio.setAttribute("type", "audio/mp3");
audio.setAttribute("src", "./audio/appl.mp3");
audio.setAttribute("style", "display:none");
audio.setAttribute("controlslist", "nodownload");
audio.setAttribute("id", "click"+time);
$("body").append(audio);
audio.play();
setTimeout(function(){
document.getElementById("click"+time).remove();
},4000);
}
}

var playFailedSd = function(){
if(sd == "1"){
var time = new Date().getTime();
var audio = document.createElement("audio");
audio.setAttribute("type", "audio/mp3");
audio.setAttribute("src", "./audio/failed.mp3");
audio.setAttribute("style", "display:none");
audio.setAttribute("controlslist", "nodownload");
audio.setAttribute("id", "click"+time);
$("body").append(audio);
audio.play();
setTimeout(function(){
document.getElementById("click"+time).remove();
},2000);
}
}

//drag drop
function dragStart(e){
playClickSd();
e.dataTransfer.effectAllowed = 'move';
e.dataTransfer.setData("Text", e.target.getAttribute('id'));
e.dataTransfer.setDragImage(e.target, 0, 0);
return true;
}

function dragEnter(ev) {
ev.preventDefault();
if(ev.target.getAttribute("id") == "dash"){
playClickSd();
ev.target.style.border = "1px dotted gold";
ev.target.style.transform = "scale(1.4)";
}
return false;
}

function dragLeave(ev) {
ev.preventDefault();
if(ev.target.getAttribute("id") == "dash"){
playClickSd();
ev.target.style.border = "none";
ev.target.style.transform = "scale(1.0)";
}
return false;
}

function dragOver(e){ 
e.preventDefault();
return false; 
}

function dragDrop(ev) {
ev.preventDefault();
var src = ev.dataTransfer.getData("Text");
ev.target.style.border = "none";

if(ev.target.getAttribute("id") == "dash" && src == "correct"){

var da = $("#dash_area");
var obj = $("#"+src);
if(wordsfdidx[currDs-1] == 0){
var text = obj.text();
text = text.replace(text[0], text[0].toUpperCase());
}else{
var text = obj.text();
}
var ansa = $("#answer-area");

ev.target.style.transform = "scale(1.0)";
ev.target.style.background = "none";
ev.target.style.width = "auto";
ev.target.innerHTML = "<b style='color: yellow'>" + text + "</b>";
playAppldSd();
ansa.html('');

if(currDs < wordsfd.length){
currDs += 1;
st = da.html();
setTimeout(function(){
displayQn(currQn, currDs, st);
},2000);

}else{

if(currQn < 5){

setTimeout(function(){
currQn += 1;
currDs = 1;
wordsfd = [];
wordsfdidx = [];
var st = dashverse(vtxts[currQn-1], keywords);
ansa.html('<div class = "btn-nxt" onclick="playClickSd();displayQn('+currQn+', '+currDs+', \''+st.replaceAll("'", "***").replaceAll("\"", "**")+'\');">Next Question</div>');

},3000);

}else{

var hasnb = false;
var hasnl = false;

var o = parseInt(level)*5;
if(currBk.toLowerCase() != "revelation"){
hasnb = true;
}
var p = db_kjv.split("***");
var cnt = 0;
for(var i = 0; i < p.length; i++){
var t = p[i];
if(t.indexOf(currBk)>-1){
cnt++;
}
}
if(o < cnt/5){ 
hasnl = true; 
}

if(hasnl){
//record move to next level
level = parseInt(level) + 1;

localStorage.setItem("level", level);

currBk = '';
level = '';
currQn = '';
vrefs = [];
vtxts = [];
wordsfd = [];
wordsfdidx = [];
currDs = '';

loadData();
var st = dashverse(vtxts[currQn-1], keywords);

setTimeout(function(){
ansa.html('<div class = "btn-nxt" onclick="playClickSd();displayQn('+currQn+', '+currDs+', \''+st.replaceAll("'", "***").replaceAll("\"", "**")+'\');">Next Level</div>');
},5000);

}else{

//record move to next book

if(! hasnb){
ansa.html("");
}else{
level = 1;
var idx = booksArray.indexOf(currBk);
currBk = booksArray[idx+1];

localStorage.setItem("book", ""+currBk);
localStorage.setItem("level", 1);

currBk = '';
level = '';
currQn = '';

vrefs = [];
vtxts = [];
wordsfd = [];
wordsfdidx = [];
currDs = '';

loadData();
var st = dashverse(vtxts[currQn-1], keywords);

setTimeout(function(){
ansa.html('<div class = "btn-nxt" onclick="playClickSd();displayQn('+currQn+', '+currDs+', \''+st.replaceAll("'", "***").replaceAll("\"", "**")+'\');">Next Book</div>');
},5000);

}
}

}

}

}else{
ev.target.style.transform = "scale(1.0)";
playFailedSd();
}

return true;
}

//localStorage.setItem("book", "Genesis");
//localStorage.setItem("level", 25);

//loadData();
//alert(currBk +""+ level);




