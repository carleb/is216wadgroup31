// change icons to fill (excluding post)
function fill(id) {
    if (document.getElementById(id).querySelector('img').src.indexOf("fill") == -1) {
        var src = document.getElementById(id).querySelector('img').src
        var lastIndex = src.lastIndexOf('.')
        document.getElementById(id).querySelector('img').src = src.substr(0, lastIndex) + "-fill" + src.substr(lastIndex)
    }

    var arr = ["chat", "settings", "profile", "map", "home"]

    arr.forEach(e => {
        if (e != id) {
            document.getElementById(e).querySelector('img').src = document.getElementById(e).querySelector('img').src.replace("-fill", "")
        }
    });

}
button = document.getElementsByClassName("navbar-toggler mx-1")
console.log(button)

// like
function fillHeart(id){
    if (document.getElementById("heart").querySelector('img').src.includes("fill")) {
        // console.log("remove fill")
        document.getElementById("heart").querySelector('img').src = document.getElementById("heart").querySelector('img').src.replace("-fill", "")
        document.getElementById("like").innerText = "Like"
    }
    else{
        // console.log("add fill")
        var src = document.getElementById("heart").querySelector('img').src
        var lastIndex = src.lastIndexOf('.')
        document.getElementById("heart").querySelector('img').src = src.substr(0, lastIndex) + "-fill" + src.substr(lastIndex)
        document.getElementById("like").innerText = "Liked"
    }
}


// change post icon from pencil-square to pencil-fill
function fillPost(id){
    if (document.getElementById(id).querySelector('img').src.indexOf("fill") == -1) {
        document.getElementById(id).querySelector('img').src = document.getElementById(id).querySelector('img').src.replace("-square", "-fill")
    }

    var arr = ["chat", "settings", "profile", "map", "home"]

    arr.forEach(e => {
        if (e != id) {
            document.getElementById(e).querySelector('img').src = document.getElementById(e).querySelector('img').src.replace("-fill", "")
        }
    });

}

// for the "New Post" to appear
document.querySelector('#post')

var i = 0;
var txt = 'New Post'; /* The text */
var speed = 100; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("newpost").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

// post- choose files
var fileElement = document.getElementById("file")
fileElement.addEventListener("change", handleFiles, false);
function handleFiles(e) {
    var fileList = this.files; /* now you can work with the file list */
    if (fileList == "undefined")
    console.log(fileList)
}

// post- drag and drop files
let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files); // above
}
