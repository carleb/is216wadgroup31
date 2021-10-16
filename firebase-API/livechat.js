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

// function createChat(user1, user2){
//     tableName = "chat"
//     firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
//     url = firebaseurl + tableName + ".json"
//     axios.get(url)
//         .then((response) => {
//             newChatId = user1 + user2
//             url = firebaseurl + tableName + "/data/" + newChatId + ".json"
//             axios.put(url, {
//                 "user1": user1,
//                 "user2": user2,
//                 "messages": []
//             }). then((response) => {
//                 console.log(response)               
//             })
//         })
// }

function sendMessage(user1, user2){
    event.preventDefault() // prevent the form from redirecting to somewhere else
    if (document.getElementById("message1").value){
        var message = document.getElementById("message1").value
        var sender = user1
    }
    else{
        var message = document.getElementById("message2").value
        var sender = user2
    }
    tableName = "chat"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    newChatId = user1 + user2
    url = firebaseurl + tableName + "/data/" + newChatId + ".json"

    axios.get(url)
        .then((response) => {
            // console.log(response)
            newData = {"sender": sender, "messages": message}
            // console.log(response.data)

            if(response.data == undefined){
                console.log("newChat")
                messages = [newData];
            }
            else{
                messages = response.data.messages;
                messages.push(newData)
            }

            axios.put(url, {
                "user1": user1,
                "user2": user2,
                "messages": messages
            })
        })
    showMessages(message, sender)
    return false;

}

// showMessages does not need to pull directly from the database
function showMessages(message, sender){
    // var message = document.getElementById("message").value;
    // tableName = "chat"
    // firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    // newChatId = user1 + user2
    // url = firebaseurl + tableName + "/data/" + newChatId + ".json"
    // axios.get(url)
    //     .then((response) => {
    //         console.log(response)
    //         msgs = response.data.messages
    //         html = ""
    //         for (let i = 0; i < msgs.length; i++) {
    //             html += `<li>${msgs[i]["sender"]}: ${msgs[i]["msg"]}</li>`                              
    //         }

    //         document.getElementById("messages").innerHTML = html;
    //     })
    html = `<li>${sender}: ${message}</li>`
    document.getElementById("messages").innerHTML += html
}

// function getContacts(){
//     firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
//     tableName = "userProfile"
//     url = firebaseurl + tableName + "/data.json"
//     axios.get(url)
//         .then((response) => {
//             // console.log(response.data)
//             response = response.data
//             for (let i = 1; i < response.length; i++) {
//                 const ele = response[i];
//                 // console.log(ele)
//                 // console.log(ele.name)
//                 name = ele.name
                
//             }
//         })
// }





