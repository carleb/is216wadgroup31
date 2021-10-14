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

// myStorage = window.sessionStorage;
// if (myStorage.userID===undefined){
//     console.log("Not login")
//     // console.log(myStorage)
// }else{
//     // console.log("Login")
//     // console.log(myStorage)
//     user_id = myStorage.userID
//     // console.log(user_id)
// }

// function sendMessage(){
//     // get message
//     var message = document.getElementById("messages").value();
//     console.log({
//         "sender": myName,
//         "message": message
//     })

//     // save in database
//     firebase.database().ref("messages").push().set(
//         {
//             "sender": myName,
//             "message": message
//         }
//     );

//     //prevent form from submitting
//     return false;
// }

function sendMessage(){
    event.preventDefault() // prevent the form from redirecting to somewhere else
    var message = document.getElementById("message").value;
    tableName = "messages"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json"

    axios.put(url, {
        "sender": myName,
        "message": message
    }).then((response) => {
        // console.log(response)
    })

    return false;

}

// firebase.database().ref("messages").on("child_added", function snapshot(snapshot){
//     var html="";
//     // give each message a unique ID
//     html += "<li id='message-" + snapshot.key + "'>";

//     html += snapshot.val().sender + ": " + snapshot.val().message;
//     html += "</li>";

//     document.getElementById("messages").innerHTML += html;
// })

function showMessages(){

    tableName = "messages"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            // console.log(response)
            html = `<li>${response.data.sender}: ${response.data.message}</li>`

            document.getElementById("messages").innerHTML += html;
        })
}
