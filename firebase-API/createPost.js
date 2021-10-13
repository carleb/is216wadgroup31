// check if user in login
function test(){
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
if (myStorage.userID===undefined){
    console.log("Not login")
    // console.log(myStorage)
}else{
    console.log("Login")
    // console.log(myStorage)
    user_id = myStorage.userID
    // console.log(user_id)
}


function createNewPost(){

    const file = document.getElementById("file").files[0]
    textInput = document.getElementById("post-text").value    
    if(textInput == ""){
        alert("text field in blank")
    }else{
        if(file === undefined){
        console.log("Creating Post with textonly")
        createNewPostTextOnly()
    }else{
        console.log("Creating Post with text and picture")
        createNewPostWithPhoto()
    }
    }
}

function createNewPostWithPhoto() {
tableName = "post"
firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";

url = firebaseurl + tableName + ".json"
axios.get(url)
    .then((response) => {
        console.log(response)
        if(response.data == null){
            newPostID = 0
        }
        else{
            newPostID = response.data.data.length
        }
        console.log(newPostID)
        const ref= firebase.storage().ref()
        const file = document.getElementById("file").files[0]
        const name = newPostID + "-"+file.name
        const metadata = {
            contentType:file.type
        }
        
        textInput = document.getElementById("post-text").value
        tagNameInput = document.getElementById("post-tag").value

        // need to add function to get tag name ID after tagName
        date = new Date();
        const [hour,seconds] = [date.getHours(), date.getMinutes()];
        date = date.toDateString()
        date = date.split(" ")
        newDate = date[1]+" "+date[2]+","+date[3]
        newTime = hour+":"+seconds
        const task = ref.child("postFiles/"+name).put(file,metadata)
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url =>{
            console.log(url)
            photoURL = url
            myStorage = window.sessionStorage;
            url = firebaseurl + tableName + "/data/" + newPostID + ".json"
            axios.put(url, {
                "postID":newPostID,
                "postType":"photo",
                "photoUrl": [photoURL],
                "postText":textInput,
                "postedBy": user_id,
                "postedOn": newDate,
                "postedOnTime": newTime,
                "postedAt": currentLocation,
                "nameOfPoseter":myStorage.userName,
                "nameOfTagged":tagNameInput,
                "tagged" : "petID",
                "comments":null,
                "like": null,
                "shareableURL":"string"
            }).then((response) => {
                console.log(response);
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
tagNameInput = document.getElementById("post-tag").value

url = firebaseurl + tableName + ".json"
axios.get(url)
    .then((response) => {
        newPostID = response.data.data.length
        console.log(newPostID)
        url = firebaseurl + tableName + "/data/" + newPostID + ".json"
        date = new Date();
        const [hour,seconds] = [date.getHours(), date.getMinutes()];
        date = date.toDateString()
        date = date.split(" ")
        newDate = date[1]+" "+date[2]+","+date[3]
        newTime = hour+":"+seconds
        myStorage = window.sessionStorage;
        axios.put(url, {
            "postID":newPostID,
            "postType":"text",
            "postText":textInput,
            "postedBy": user_id,
            "postedOn": newDate,
            "postedOnTime": newTime,
            "postedAt": currentLocation,
            "nameOfPoseter":myStorage.userName,
            "nameOfTagged":tagNameInput,
            "tagged" : "petID",
            "comments":null,
            "like": null,
            "shareableURL":"string"
        }).then((response) => {
            console.log(response);
            getAllPost();

        });
    }, (error) => {
        console.log(error);
        output = error

    });
}

function getAllPost(){
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

