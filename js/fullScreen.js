var fxLock = function(){
const oppositeOrientation = screen.orientation.type.startsWith("portrait") ? "landscape" : "portrait";
if(oppositeOrientation != "landscape"){
screen.orientation.lock('landscape')
.then( () => {
      //alert(`Locked to ${oppositeOrientation}\n`);
      }
    )
    .catch ( error => {
      //alert(`${error}\n`);
    });
}else{
screen.orientation.lock(oppositeOrientation)
    .then( () => {
      //alert(`Locked to ${oppositeOrientation}\n`);
      }
    )
    .catch ( error => {
      //alert(`${error}\n`);
    });
}
}

var fxEnterFullScreen = function(){
if (document.documentElement.requestFullScreen){
document.documentElement.requestFullScreen();
        }
        else if (document.documentElement.mozRequestFullScreen){ /* Firefox */
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullScreen){   /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        else if (document.msRequestFullscreen){ /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
}

var prepFsLock = function(){
fxEnterFullScreen();
fxLock();
$("#fsb").hide();
}


