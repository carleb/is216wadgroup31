// check if user in login
function test() {
    console.log("imported sucessfully")
}

const firebaseConfig = {
    apiKey: "AIzaSyAX0HnHSqWsEsiD9jIkiPxlf0wQKhPUIr0",
    authDomain: "wadgroup31-e83d0.firebaseapp.com",
    databaseURL: "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wadgroup31-e83d0",
    storageBucket: "wadgroup31-e83d0.appspot.com",
    messagingSenderId: "335704215919",
    appId: "1:335704215919:web:84be6b73640053f4f9d89a",
    measurementId: "G-LB3RXZXQ34"
};

firebase.initializeApp(firebaseConfig);

myStorage = window.sessionStorage;
if (myStorage.userID === undefined) {
    console.log("Not login")
    // console.log(myStorage)
} else {
    console.log("Login")
    // console.log(myStorage)
    user_id = myStorage.userID
    // console.log(user_id)
}


function createNewPost() {

    const file = document.getElementById("file").files[0]
    console.log(file)
    textInput = document.getElementById("post-text").value
    if (textInput == "") {
        alert("Please enter a caption!")
    } else {
        if (file === undefined) {
            console.log("Creating Post with textonly")
            createNewPostTextOnly()
        } else {
            console.log("Creating Post with text and picture")
            createNewPostWithPhoto()
        }
    }
    setTimeout(function () {
        document.getElementById("post-body").innerHTML = `<div class="input-group">
        <button type="button" class="btn themebg hover-color2 rounded2 mb-1"> <label id='uploadImageLabel' for="file">Upload an Image</label></button> 
        <input type="file" class="button button-secondary m-2" style="display:none" id="file"
          accept="image/png, image/jpeg, image/heic" name="file" multiple onchange="loadImageDisplay(event)">
      </div>
      <div class='ml-3'>
         <img id="output" class="card-img-top rounded2 shadow" style='max-height:500px; object-fit:cover'>  
      </div>

      <!-- drop files end-->

      <!-- post text start -->
      <label class='ms-2' for='post-text'>Caption:</label>
      <div class="input-group m-2">
        <textarea placeholder="Post Caption" id="post-text" name="text" type="textbox" class="form-control"></textarea>
      </div>
      <label class='ms-2' for='tagsearchInput'>Tag:</label>
      <form class='input-group m-2' autocomplete="off">
         <input placeholder="Who are you with?" id='tagsearchInput' onkeyup="loadTagSearch()" onclick="loadTagSearchList()" name="Tag" type="Tag" class="form-control ml-3">
        <!-- <input class="form-control rounded1 me-2 d-sm-inline d-none" type="search" placeholder="Search for Users or Pets" aria-label="Search" id='websearchInput'onkeyup="loadWebSearch()" onclick="loadWebSearchList()"> -->
      </form>
      <ul id="tagSearchDisplay" class='themebg rounded2' style='position:fixed;z-index: 100;list-style-type: none; padding: 0; margin: 0;'>
      </ul>`
    }, 3000)

}

function createNewPostWithPhoto() {
    tableName = "post"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";

    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            console.log(response)
            if (response.data == null) {
                newPostID = 0
            }
            else {
                newPostID = response.data.data.length
            }
            console.log(newPostID)
            const ref = firebase.storage().ref()
            const file = document.getElementById("file").files[0]
            const name = newPostID + "-" + file.name
            const metadata = {
                contentType: file.type
            }

            textInput = document.getElementById("post-text").value
            tagNameInput = document.getElementById("tagsearchInput").value

            // need to add function to get tag name ID after tagName
            date = new Date();
            const [hour, seconds] = [date.getHours(), date.getMinutes()];
            date = date.toDateString()
            date = date.split(" ")
            newDate = date[1] + " " + date[2] + "," + date[3]
            hourstr = "" + hour + ""
            secondsstr = "" + seconds + ""
            if (hourstr.length == 1) { hourstr = "0" + hourstr }
            if (secondsstr.length == 1) { secondsstr = "0" + secondsstr }
            newTime = hourstr + ":" + secondsstr + ":00"
            newTime = covert24Hrto12Hr(newTime)
            const task = ref.child("postFiles/" + name).put(file, metadata)
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    console.log(url)
                    photoURL = url
                    myStorage = window.sessionStorage;
                    url = firebaseurl + tableName + "/data/" + newPostID + ".json"
                    if (tagNameInput != "") {
                        tagNameInput = tagNameInput.split(" - ")
                        taggedPetName = tagNameInput[0]
                        taggedPetID = tagNameInput[2]
                        taggedPetID = taggedPetID.split(" : ")
                        taggedPetID = taggedPetID[1]
                    } else {
                        taggedPetID = null
                        taggedPetName = null
                    }
                    axios.put(url, {
                        "postID": newPostID,
                        "postType": "photo",
                        "photoUrl": [photoURL],
                        "postText": textInput,
                        "postedBy": user_id,
                        "postedOn": newDate,
                        "postedOnTime": newTime,
                        "postedAt": currentLocation,
                        "nameOfPoseter": myStorage.userName,
                        "nameOfTagged": taggedPetName,
                        "tagged": taggedPetID,
                        "comments": null,
                        "like": null,
                        "shareableURL": "string"
                    }).then((response) => {
                        console.log(response);
                        if (tagNameInput != "") {
                            updatePetLocation(taggedPetID, currentLocation);
                        }
                        getAllPost();

                    });
                })
        }, (error) => {
            console.log(error);
            output = error

        });
}

function createNewPostTextOnly() {
    tableName = "post"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    textInput = document.getElementById("post-text").value
    tagNameInput = document.getElementById("tagsearchInput").value

    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            newPostID = response.data.data.length
            console.log(newPostID)
            url = firebaseurl + tableName + "/data/" + newPostID + ".json"
            date = new Date();
            const [hour, seconds] = [date.getHours(), date.getMinutes()];
            date = date.toDateString()
            date = date.split(" ")
            newDate = date[1] + " " + date[2] + "," + date[3]
            hourstr = "" + hour + ""
            secondsstr = "" + seconds + ""
            if (hourstr.length == 1) { hourstr = "0" + hourstr }
            if (secondsstr.length == 1) { secondsstr = "0" + secondsstr }
            newTime = hourstr + ":" + secondsstr + ":00"
            newTime = covert24Hrto12Hr(newTime)
            myStorage = window.sessionStorage;
            if (tagNameInput != "") {
                tagNameInput = tagNameInput.split(" - ")
                taggedPetName = tagNameInput[0]
                taggedPetID = tagNameInput[2]
                taggedPetID = taggedPetID.split(" : ")
                taggedPetID = taggedPetID[1]
            } else {
                taggedPetID = null
                taggedPetName = null
            }
            axios.put(url, {
                "postID": newPostID,
                "postType": "text",
                "postText": textInput,
                "postedBy": user_id,
                "postedOn": newDate,
                "postedOnTime": newTime,
                "postedAt": currentLocation,
                "nameOfPoseter": myStorage.userName,
                "nameOfTagged": taggedPetName,
                "tagged": taggedPetID,
                "comments": null,
                "like": null,
                "shareableURL": "string"
            }).then((response) => {
                console.log(response);
                if (tagNameInput != "") {
                    updatePetLocation(taggedPetID, currentLocation);
                }
                getAllPost();


            });
        }, (error) => {
            console.log(error);
            output = error

        });
}

function getAllPost() {
    tableName = "post"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";

    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            allPostData = response.data.data
            console.log(allPostData)
        }, (error) => {
            console.log(error);
            output = error

        });
}

