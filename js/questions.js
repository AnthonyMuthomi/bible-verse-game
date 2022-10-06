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

var loadBibleBook = function(bk, chap, vs){
jQuery.get('./books/'+bk+'.txt',  function(data) { 
data = data.substring(data.indexOf("*")-0+1, data.length);
data = data.replaceAll("/", "");
var chaps_arr = [];
var chap_idx = 1;
while(data != ""){
if(data.indexOf("*") != -1){
var chap_text = data.substring(0, data.indexOf("*")-0+1).replace("*", "");
chap_text = "<b style='color: black; background:white'>CHAPTER "+ chap_idx + "</b><br/>" + chap_text.substring(chap_text.indexOf("\n"), chap_text.length)+"<br/>";
chaps_arr.push(chap_text);
data = data.replace(data.substring(0, data.indexOf("*")-0+1),"");
chap_idx++;
}else{
var chap_text = "<b style='color: black; background:white'>CHAPTER "+ chap_idx + "</b><br/>" + data.substring(data.indexOf("\n"), data.length)+"<br/>";
chaps_arr.push(chap_text);
data = "";
}
}
/**
var text_edit = "";
for(var i = 0; i < chaps_arr.length; i++){
var text_ex = $("#menu-kjv_bb_text").html();
if(chap == (i-0+1)){
var stt = chaps_arr[i].indexOf(vs);
var nd = chaps_arr[i].length;
if(chaps_arr[i].indexOf(vs-0+1) != -1){
nd = chaps_arr[i].indexOf(vs-0+1);
}
var vs_text = chaps_arr[i].substring(stt, nd);
vs_text = vs_text.substring(vs_text.indexOf(".")-0+1,vs_text.length);
text_edit += text_ex + chaps_arr[i].replace(vs_text, "<b style='color: red; background:white' id='item'>"+vs_text+"</b>");
}else{
text_edit += text_ex+chaps_arr[i];
}**/

var text_edit = "";
for(var i = 0; i < chaps_arr.length; i++){
var text_ex = $("#menu-kjv_bb_text").html();
if(chap == (i-0+1)){

var waste = chaps_arr[i].substring(0, chaps_arr[i].indexOf("\n"));

chaps_arr[i] = chaps_arr[i].replace(waste, "");

var stt = chaps_arr[i].indexOf(vs);
var nd = chaps_arr[i].length;
if(chaps_arr[i].indexOf(vs-0+1) != -1){
nd = chaps_arr[i].indexOf(vs-0+1);
}

var vs_text = chaps_arr[i].substring(stt, nd);

vs_text = vs_text.substring(vs_text.indexOf(".")-0+1,vs_text.length);
text_edit += waste + text_ex + chaps_arr[i].replace(vs_text, "<b style='color: red; background:white' id='item'>"+vs_text+"</b>");
}else{
text_edit += text_ex+chaps_arr[i];
}

}
$("#menu-kjv_bb_text").html('<p class="alert alert-primary">'+text_edit+'</p>');
//$("#menu-kjv_bb_text").css("color", "white");
var scroller = $('#slider');
var item = $("#item");
//scroll bar pos
var pos = item.offset().top 
                - scroller.offset().top 
                + scroller.scrollTop();
//scroll div to desired position
scroller.animate({
scrollTop: pos - 25
});
});

}

var mark_chap = function(b, c){
jQuery.get('./books/'+b+'.txt',  function(data) { 
data = data.substring(data.indexOf("*")-0+1, data.length);
data = data.replaceAll("/", "");
var chap_idx = 1;
$("#chap_sel").remove();
var sel_chap = "<select id='chap_sel' style='width:20%;text-align:right;'>";
while(data != ""){
if(data.indexOf("*") != -1){
data = data.replace(data.substring(0, data.indexOf("*")-0+1),"");
}else{
data = "";
}
sel_chap += "<option value='"+chap_idx+"'";
if(chap_idx == c){
sel_chap += "selected";
}
sel_chap += ">"+chap_idx+"</option>";
chap_idx++;
}
sel_chap += "</select>";
$("#menu-title").append(sel_chap);

$("#chap_sel").change(function(){
var seldch = $('#chap_sel option:selected').val();
bbook = b;
chapt = seldch;
verse = 1;
$("#menu-kjv_bb_text").html("");
loadBibleBook(bbook, chapt, verse);
mark_chap(bbook, chapt);
mark_verse(bbook, chapt, verse);
});
});
}

var mark_verse = function(b, c, v){
jQuery.get('./books/'+b+'.txt',  function(data) { 
data = data.substring(data.indexOf("*")-0+1, data.length);
data = data.replaceAll("/", "");
var minvs = 1;
var chp = 1;
var chap_txt = "";
while(data != ""){
if(data.indexOf("*") != -1){
if(chp == c){ chap_txt = data.substring(0, data.indexOf("*")-0+1); }
data = data.replace(data.substring(0, data.indexOf("*")-0+1),"");
}else{
if(chap_txt == ""){ chap_txt = data; }
data = "";
}
chp++;
}
for(var i = 0; i < 200; i++){
if(chap_txt.indexOf(i+".") > -1){
minvs = i;
}
}
$("#vs_sel").remove();
var sel_vs = "<select id='vs_sel' style='width:20%;text-align:right;'>";
for(var i = 0; i < minvs; i++){
sel_vs += "<option value='"+(i+1)+"'";
if((i+1) == v){
sel_vs += "selected";
}
sel_vs += ">"+(i+1)+"</option>";
}
sel_vs += "</select>";
$("#menu-title").append(sel_vs);

$("#vs_sel").change(function(){
var seldvs = $('#vs_sel option:selected').val();
bbook = b;
chapt = c;
verse = seldvs;
$("#menu-kjv_bb_text").html("");
loadBibleBook(bbook, chapt, verse);
mark_chap(bbook, chapt);
mark_verse(bbook, chapt, verse);
});
});
};

var scrollToVerse = function(b, c, v){
var bbook = b;
var chapt = c;
var verse = v;
$("#dark").show();
$("#menu-cont").show();
$("#menu-img").removeAttr("src", "");
$("#menu-img").attr("src", "./images/others/bg0.png");
var sel_text = "<select id='books_sel' style='width:60%;'>";
for(var i=0; i<booksArray.length; i++){
sel_text += "<option value='"+booksArray[i].toLowerCase()+"'";
if(booksArray[i].toLowerCase() == b){
sel_text += "selected";
}
sel_text += ">"+ booksArray[i]+"</option>";
}
sel_text += "</select>";

$("#menu-title").html(sel_text);

$("#menu-fvvs").hide();
$("#menu-settings").hide();
$("#menu-fb").hide();
$("#menu-statistics").hide();
$("#menu-about").hide();
$("#menu-share").hide();
$("#menu-kjv_bb_text").show();

loadBibleBook(b, c, v);
mark_chap(b, c);
mark_verse(b, c, v);

//menu-kjv_bb_text
$("#close-img").click(function(){
$("#menu-kjv_bb_text").html("");
});
$("#dark").click(function(){
$("#dark").show();
$("#menu-cont").show();
});

$('#books_sel').change(function(){
var seldbk = $('#books_sel option:selected').val();
bbook = seldbk;
chapt = 1;
verse = 1;
$("#menu-kjv_bb_text").html("");
loadBibleBook(bbook, chapt, verse);
mark_chap(bbook, chapt);
mark_verse(bbook, chapt, verse);
});

$("#vs_sel").change(function(){

});
}

//scrollToVerse("genesis", 2, 1);

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

var changeBg = function(){
$("body").css("background-image","url(./images/others/"+imagesbg[Math.floor(Math.random() * imagesbg.length)]+")").css("background-size","100% 100%");

//$("body #cony").css("background-image","url(./images/bg/"+bodyimagesbg[Math.floor(Math.random() * bodyimagesbg.length)]+")").css("background-size","100% 100%");
}
changeBg();

var displayQn = function(cq, cd, s){
//que, curr dash

$("#book").html(currBk+'<svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg>');
$("#level").html("Level "+level+'<svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg>');
$("#question").html("Question "+cq);

var vrss = vrefs[cq-1];

var vrss_arr = vrss.split(":");

var chapt = vrss_arr[0];
var vsno = vrss_arr[1];

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

qntxt += "<span id='favcheck' onclick='playClickSd();addFavoriteVerse("+(booksArray.indexOf(currBk)+1)+",vrefs["+cq+"-1]);' style='border-radius: 5px; font-weight: bold; background: "+color+"; color:black; width:wrap-content; font-size: 12px; padding: 6px;height:15px; margin-left:10px;'><img style='border-radius: 5px; width:16px; height:16px;margin-right:5px;' src='./images/others/"+img+"'/>"+expt+"</span>";

qntxt += "<span id='read_more' onclick='scrollToVerse(\""+currBk+"\", "+chapt+", "+vsno+");' style='border-radius: 5px; font-weight: bold; background: white; color:black; width:wrap-content; font-size: 12px; padding: 6px;height:15px; margin-left:10px;'><img style='border-radius: 5px; width:16px; height:16px;margin-right:5px;' src='./images/others/bg0.png'/>Read More</span><br/>";

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

//$("#favcheck").css("display", "none");
$("#favcheck").hide();
$("#read_more").hide();
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
playMusic();

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

ansa.html("<b style='background:white; font-size:20px; padding:10px; border-radius:5px;'>Correct!</b>");

currDs += 1;
st = da.html();
setTimeout(function(){
displayQn(currQn, currDs, st);
},2000);

}else{

//$("#favcheck").css("display", "block");
$("#favcheck").show();
$("#read_more").show();


if(currQn < 5){

ansa.html("<b style='background:white; font-size:20px; padding:10px; border-radius:5px;'>Correct!</b>");

setTimeout(function(){
currQn += 1;
currDs = 1;
wordsfd = [];
wordsfdidx = [];
var st = dashverse(vtxts[currQn-1], keywords);
ansa.html('<div class = "btn-nxt" onclick="playClickSd();displayQn('+currQn+', '+currDs+', \''+st.replaceAll("'", "***").replaceAll("\"", "**")+'\');changeBg();">Next Question</div>');

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

ansa.html("<center><b style='background:white; font-size:20px;padding:10px; border-radius:5px;'>Congratulations! Level Completed</b></center>");
setTimeout(function(){
playAppldSd();
},4000);

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
ansa.html('<div class = "btn-nxt" onclick="playClickSd();displayQn('+currQn+', '+currDs+', \''+st.replaceAll("'", "***").replaceAll("\"", "**")+'\');changeBg();">Next Level</div>');
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
ansa.html('<div class = "btn-nxt" onclick="playClickSd();displayQn('+currQn+', '+currDs+', \''+st.replaceAll("'", "***").replaceAll("\"", "**")+'\');changeBg();">Next Book</div>');
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

$("#read_bible_sett").click(function(){
playClickSd();
scrollToVerse("Genesis", 1, 1);
});

//localStorage.setItem("book", "Exodus");
//localStorage.setItem("level", 1);

//loadData();
//alert(currBk +""+ level);





