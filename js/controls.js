playMusic();
$("#sett-music-icon").click(function(){
playClickSd();
if(mus == 0){
$(this).removeAttr("src", "./images/others/music-off.png");
$(this).attr("src", "./images/others/music-on.png");
mus = 1;
playMusic();
}else{
$(this).removeAttr("src", "./images/others/music-on.png");
$(this).attr("src", "./images/others/music-off.png");
mus = 0;
document.getElementById("bgm").pause();
}
localStorage.setItem("music", mus);
});

$("#sett-sound-icon").click(function(){
if(sd == 0){
$(this).removeAttr("src", "./images/others/sound-off.png");
$(this).attr("src", "./images/others/sound-on.png");
sd = 1;
}else{
$(this).removeAttr("src", "./images/others/sound-on.png");
$(this).attr("src", "./images/others/sound-off.png");
sd = 0;
}
playClickSd();
localStorage.setItem("sound", sd);
});

var get_verse = function(bk, ref){
var p = db_kjv.split("***");
var vt = "";
for(var i = 0; i < p.length; i++){
var t = p[i];
if(t.indexOf(currBk+"*"+ref+"**")>-1){
vt = t.substring(t.indexOf("**")+2, t.length);
}
}
return vt;
}

/**open favs**/

var setAllFavsText = function(off, mkvs){
favs = favs.replaceAll("\n", "");
var fvrefs = favs.split(",");
var maxnol = 0;
if(favs != ""){
maxnol = fvrefs.length;
}

var no = 5;

if(maxnol < no){
no = maxnol;
}else{
if(maxnol - off < no){
no = maxnol - off;
}
}

var ftxt = "";
ftxt += '<table class="my-tables">';

if(maxnol < 1){
ftxt += '<tr><td style="padding-top:30px;color: white; font-size:25px;text-align: center">You have no added favourite verses</td></tr>';
}else{
ftxt += '<tr><td style="color: gold; text-align: center">Favourite Verses : ' +(off+1)+ ' - '+(off+no)+' of '+maxnol+'</td></tr><tr><td><input type="email" id="search-fav" placeholder="Search e.g. Genesis 1:1"/><div id="res"></div></td></tr>';

for(var i = off; i < (off+no); i++){
var bcp = fvrefs[i].replace("\n", "");
bcp = bcp.split(" ");
var bk = booksArray[bcp[0]-1];
var ref = bcp[1];

//verse txt
var verse_txt = get_verse(currBk, ref);
var data = verse_txt;

ftxt += '<tr><td ';

if(mkvs != 'undefined' && i == mkvs){
ftxt += 'style="border: 1px dashed red;"';
}

ftxt += '>'+bk+' '+ref+'</td></tr><tr><td ';

if(mkvs != 'undefined' && i == mkvs){
ftxt += 'style="border: 1px dashed red;"';
}

ftxt += '>'+data+'</td></tr>';

}
ftxt += '<tr><td style="color: gold; text-align: center;">Favourite Verses : '+(off+1)+' - '+(off+no)+' of '+maxnol+'</td></tr><tr><td></td></tr>';

var disp = 0;
if(maxnol > 5){
if(maxnol < 11){
disp = 1;
}else{
disp = 2;
}
}

if(disp == 2){
if(off == 0){
offnxt = off + 5;
offlst = Math.floor((maxnol-1)/5) * 5;

ftxt += '<tr><td style="background: rgba(0,0,0,0.5);"><div style="width:100%; height:wrap-content; display:flex; flex-direction:row; align-items:center; justify-content:center;"><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offnxt+');"><!--Next--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg> </div><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offlst+');"><!--Last--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg></div></div></td></tr>';

}else if(maxnol - off <= no){
offprev = off - 5;
offfst = 0;

ftxt += '<tr><td style="background: rgba(0,0,0,0.5);"><div style="width:100%; height:wrap-content; display:flex; flex-direction:row; align-items:center; justify-content:center;"><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offprev+');"><!--Prev--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M14,5 L6,20 14,34"/></svg></div><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offfst+');"><!--First--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M14,5 L6,20 14,34"/></svg><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M14,5 L6,20 14,34"/></svg></div></div></td></tr>';

}else{
offnxt = off + 5;
offlst = Math.floor((maxnol-1)/5) * 5;
offprev = off - 5;
offfst = 0;

ftxt += '<tr><td style="background: rgba(0,0,0,0.5);"><div style="width:100%; height:wrap-content; display:flex; flex-direction:row; align-items:center; justify-content:center;"><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offfst+');"><!--First--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M14,5 L6,20 14,34"/></svg><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M14,5 L6,20 14,34"/></svg></div><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offprev+');"><!--Prev--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M14,5 L6,20 14,34"/></svg></div><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offnxt+');"><!--Next--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg></div><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+offlst+');"><!--Last--><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg><svg width="22" height="40"><path stroke="white" stroke-width="6" fill="none" stroke-linecap="round" d="M6,5 L14,20 6,34"/></svg></div></div></td></tr>';

}
}

if(disp == 1){
if(off == 0){off = 5;var wd = "Next";} else {off = 0;var wd = "Prev";}
ftxt += '<tr><td style="background: rgba(0,0,0,0.5);"><div style="width:100%; height:wrap-content; display:flex; flex-direction:row; align-items:center; justify-content:center;"><div class="menu-item-item" style="border:none; background: blue; text-align:center; justify-content:center; padding:8px 2px; color:white" onclick="playClickSd();setAllFavsText('+off+');">'+wd+'</div></div></td></tr>';
}
}
ftxt += '</table>';
$("#menu-fvvs").html(ftxt);

$("#dark").show();
$("#menu-cont").show();

$("#menu-img").removeAttr("src", "");
$("#menu-img").attr("src", "./images/others/star.png");
$("#menu-title").text("Favourite Verses");
$("#menu-fvvs").show();
$("#menu-settings").hide();
$("#menu-fb").hide();
$("#menu-statistics").hide();
$("#menu-about").hide();
$("#menu-share").hide();

$("#search-fav").keyup(function(){
var textsch = $(this).val().toLowerCase();

if(textsch == ""){
$("#res").html("<b style='color:red'>Search above eg. Genesis 1:1</b>");
}else{
var count = 0;
var favssch = [];
var offs = [];
var positionsfav = [];
for(var i = 0; i < maxnol; i++){
var bkastxt = fvrefs[i].replace(fvrefs[i][0], booksArray[parseInt(fvrefs[i][0])-1]);

if(bkastxt.toLowerCase().indexOf(textsch)>-1){
count++;
favssch.push(bkastxt);
offs.push(Math.floor(i/5));
positionsfav.push(i);
}
}

if(count == 0){
$("#res").html("<b style='color:red'>No Favourites Found</b>");
}else{
var favstxts = "";
favstxts += '<table class="my-tables">';
for(var i = 0; i < count; i++){
if(i<5){
favstxts += '<tr><td style="border:1px dashed red" onclick="playClickSd();setAllFavsText('+(offs[i]*5)+', '+positionsfav[i]+');">'+favssch[i]+'</td></tr>';
}
}
favstxts += '</table>';
$("#res").html(favstxts);
}
}
});
$("#search-fav").blur(function(){
//$("#res").html("");
});
}

//setAllFavsText(0);
/**end favs**/

//****
$("#dark").click(function(){
playClickSd();
$("#dark").hide();
$("#menu-cont").hide();
});
$("#close-img").click(function(){
playClickSd();
$("#dark").hide();
$("#menu-cont").hide();
});
$("#settIcon").click(function(){
playClickSd();
$("#dark").show();
$("#menu-cont").show();
$("#menu-img").removeAttr("src", "./images/others/stats.png");
$("#menu-img").attr("src", "./images/others/settings.png");
$("#menu-title").html("Settings");
$("#menu-settings").show();
$("#menu-statistics").hide();
$("#menu-about").hide();
$("#menu-fb").hide();
$("#menu-fvvs").hide();
$("#menu-share").hide();
});

$("#statsIcon").click(function(){
playClickSd();
loadStats();
$("#dark").show();
$("#menu-cont").show();
$("#menu-img").removeAttr("src", "");
$("#menu-img").attr("src", "./images/others/stats.png");
$("#menu-title").text("Statistics");
$("#menu-statistics").show();
$("#menu-settings").hide();
$("#menu-fb").hide();
$("#menu-about").hide();
$("#menu-fvvs").hide();
$("#menu-share").hide();
});

var opencontact = function(){
playClickSd();
$("#dark").show();
$("#menu-cont").show();
$("#menu-img").removeAttr("src", "");
$("#menu-img").attr("src", "./images/others/email.png");
$("#menu-title").text("Contact us");
$("#menu-fb").show();
$("#menu-settings").hide();
$("#menu-statistics").hide();
$("#menu-about").hide();
$("#menu-fvvs").hide();
$("#menu-share").hide();
}

var openabout = function(){
playClickSd();
$("#dark").show();
$("#menu-cont").show();
$("#menu-img").removeAttr("src", "");
$("#menu-img").attr("src", "./images/others/about.png");
$("#menu-title").html("About Us");
$("#menu-settings").hide();
$("#menu-fb").hide();
$("#menu-statistics").hide();
$("#menu-about").show();
$("#menu-fvvs").hide();
$("#menu-share").hide();
}

$("#menu-share").html("<img style='margin: 20px; width: 50px; height: 50px; border-radius:50%; border: 2px dotted white' src='./images/icon/email.png' id = 'emailshare'/><img style='margin: 20px; width: 50px; height: 50px; border-radius:50%; border: 2px dotted white' src='./images/icon/fb.png' id = 'fbshare'/><img style='margin: 20px; width: 50px; height: 50px; border-radius:50%; border: 2px dotted white' src='./images/icon/whatsapp.png' id = 'whashare'/>");

var pgurl = encodeURIComponent("https://some.site.com/bvg");

var subj = encodeURIComponent("Download and Install Bible Verse Game");

$("#fbshare").click(function(){
window.location.href = "https://www.facebook.com/sharer/sharer.php?u=" + pgurl;
});

$("#emailshare").click(function(){
window.location.href = "mailto:?Subject=" + subj + "&body=Hi. Download and install Bible Verse Game here, " + pgurl;
});
$("#whashare").click(function(){
window.location.href = "https://api.whatsapp.com/send?text=Hi. Download and install Bible Verse Game here, " + pgurl;
});

var opensharemenu = function(){
/**
playClickSd();
$("#dark").show();
$("#menu-cont").show();
$("#menu-img").removeAttr("src", "");
$("#menu-img").attr("src", "./images/others/share.png");
$("#menu-title").text("Share app via");
$("#menu-share").show();
$("#menu-fb").hide();
$("#menu-settings").hide();
$("#menu-statistics").hide();
$("#menu-about").hide();
$("#menu-fvvs").hide();
**/
}

$("textarea").on("input", function () {
  this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

$("#fb-btn").click(function(){
playClickSd();
var subj = encodeURIComponent("Bible Verse Game Feedback");

var txt = $("#fb-txt").val();
if(txt != ""){

txt = encodeURIComponent(txt);

$("#fb-txt").val("");
//window.location.href = "mailto:?Subject=" + subj + "&body=" + txt;
}
});
















