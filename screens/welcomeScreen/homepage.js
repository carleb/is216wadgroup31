function fill(id) {
    if (document.getElementById(id).querySelector('img').src.indexOf("fill") == -1){
        var src = document.getElementById(id).querySelector('img').src
        var lastIndex = src.lastIndexOf('.')
        document.getElementById(id).querySelector('img').src = src.substr(0, lastIndex )+ "-fill" + src.substr(lastIndex)
    }

    var arr = ["home", "chat", "settings", "profile", "map"]

    arr.forEach(e => {
        if (e != id){
            document.getElementById(e).querySelector('img').src = document.getElementById(e).querySelector('img').src.replace("-fill", "")
        }
    });

}
button = document.getElementsByClassName("navbar-toggler mx-1")
console.log(button)


