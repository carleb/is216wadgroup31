isChatOpen=false;
currentChatViewing = ""
prevContactDivID =""
chatData = {}
function openChatWindowDesktop(ele){
    console.log("element", ele)
    eleid = ele
    chatid = ele.split('-')[1]
    nameOfFriend = ele.split('-')[2]
    // console.log(chatid)
    chatBox = document.getElementById('chatbox')
    // console.log(isChatOpen)

    //Chaning color of contacts list
    if(prevContactDivID !=""){
        document.getElementById(prevContactDivID).style.background='#ffe7d9'
    }
    prevContactDivID = ele
    console.log(document.getElementById(ele))
    //
    if (isChatOpen == true && currentChatViewing==chatid){ //close
        console.log(`chatbox id :`+ele)
        chatBox.classList.remove("animate__bounceInRight");
        chatBox.classList.add("animate__bounceOutRight");
        isChatOpen=false;
        currentChatViewing = "";
    }else if (isChatOpen == false && currentChatViewing!=chatid){ //open new
        document.getElementById(ele).style.background='#f5d2bc'

        currentChatViewing=chatid;
        let classesToAdd = [ 'col-7', 'ms-3', 'shadow' ,'animate__animated' ,'animate__bounceInRight'];
        chatBox.classList.remove("animate__bounceOutRight");
        chatBox.classList.add(...classesToAdd);
        chatBox.style.backgroundColor = "#ffe7d9";
        // console.log(chatBox)
        isChatOpen=true;
        // console.log(currentChatData)
        chatHTML = `<div class='row shadow-sm'><h3 class='text-center my-3'>`+nameOfFriend+`</h3></div><div id='chatchat' class='scrollbar p-2' style='height:700px;overflow: scroll;overflow-x: hidden'>`

        if(chatData[chatid] != null){
            console.log("chat found")
            currentChatData = chatData[chatid].messages
            for(mes of currentChatData){
                message = mes.message
                sender = mes.sender

                if (sender == window.sessionStorage.userName){
                    chatMsgHtml = `<div class='row my-1'>
                                        <div class='col-7'></div>
                                        <div class='col-5'>
                                            <div style='background-color:#915d3c;color:white;font-size: 13px;' class='py-2 px-2 rounded2'>
                                                <h5 class='my-auto' style='overflow-wrap:break-word'>`+message+`</h5>
                                            </div>
                                        </div>
                                    </div>`
                }else{
                    chatMsgHtml = `<div class='row my-1'>
                                        <div class='col-5 '>
                                            <div style='background-color:#d98550;color:white;font-size: 13px;' class='py-2 px-2 rounded2'>
                                                <h5 class='my-auto' style='overflow-wrap:break-word'>`+message+`</h5>
                                            </div>
                                        </div>
                                        <div class='col-7'>
                                        </div>
                                    </div>`
                }
                chatHTML = chatHTML + chatMsgHtml
            }
            chatHTML = chatHTML + `</div><div id="send-message" class="input-group my-3">
                                    <input id="message" type="text" class="form-control rounded1" placeholder="enter message...">
                                    <button onclick="newMessage()" class="btn hover-zoom" style='border-radius:20px;' type="submit"><img src='/images/icons/symmetry-horizontal.svg' height=25 width=25></button>
                                </div>`
            chatBox.innerHTML=chatHTML

            var sendMessage = document.getElementById("message");
            sendMessage.addEventListener("keydown", function (e) {
                if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                    newMessage();
                }
            });
        }else{
            console.log("chat not found")
            chatBox.innerHTML = `<table style="height: 100%;width:100%">
            <tbody>
              <tr>
                <td class="align-text-top text-center pt-3">No chat record found Start One!</td>
              </tr>
              <tr>
                  <td class="align-bottom text-center pb-3"><button onclick="startNewChat('`+ele+`')" type='button' style='width:90%;background-color:#d69a74' class='btn p-2 fs-3' >Start Chat</button></td>
              </tr>
            </tbody>
          </table>`
        }


    }else{ //switch
        document.getElementById(ele).style.background='#f5d2bc'
        currentChatViewing=chatid;
        chatBox.classList.remove("animate__bounceInRight");
        chatBox.classList.add("animate__bounceOutRight");
        setTimeout(() => {
            // console.log("we waited 1000 ms to run this code, oh boy wowwoowee!");
            chatBox.classList.remove("animate__bounceOutRight");
            chatBox.classList.add("animate__bounceInRight");
            // chatBox.innerHTML=chatid
            chatHTML = `<div class='row shadow-sm'><h3 class='text-center my-3'>`+nameOfFriend+`</h3></div><div id='chatchat' class='scrollbar' style='height:700px;overflow: scroll;overflow-x: hidden'>`
            console.log(chatData)
            if(chatData[chatid] != null){
                console.log("chat found")
                currentChatData = chatData[chatid].messages
                for(mes of currentChatData){
                    message = mes.message
                    sender = mes.sender

                    if (sender == window.sessionStorage.userName){
                        chatMsgHtml = `<div class='row my-1'>
                                            <div class='col-7'></div>
                                            <div class='col-5'>
                                                <div style='background-color:#915d3c;color:white;font-size: 13px;' class='py-2 px-2 rounded2'>
                                                    <h5 style='overflow-wrap:break-word;'>`+message+`</h5>
                                                </div>
                                            </div>
                                        </div>`
                    }else{
                        chatMsgHtml = `<div class='row my-1'>
                                            <div class='col-5 '>
                                                <div style='background-color:#d98550;color:white;font-size: 13px;' class='py-2 px-2 rounded2'>
                                                    <h5 style='overflow-wrap:break-word;'>`+message+`</h5>
                                                </div>
                                            </div>
                                            <div class='col-7'>
                                            </div>
                                        </div>`
                    }
                    chatHTML = chatHTML + chatMsgHtml
                }
                chatHTML = chatHTML + `</div><div id="send-message" class="input-group my-3">
                                        <input id="message" type="text" class="form-control rounded1" placeholder="enter message...">
                                        <button onclick="newMessage()" class="btn hover-zoom" style='border-radius:20px;' type="submit"><img src='/images/icons/symmetry-horizontal.svg' height=25 width=25></button>
                                    </div>`
                chatBox.innerHTML=chatHTML

                var sendMessage = document.getElementById("message");
                sendMessage.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                        newMessage();
                    }
                });
            }else{
                console.log("chat not found")
                chatBox.innerHTML = `<table style="height: 100%;width:100%">
                <tbody>
                <tr>
                    <td class="align-text-top text-center pt-3">No chat record found Start One!</td>
                </tr>
                <tr>
                    <td class="align-bottom text-center pb-3"><button onclick="startNewChat('`+ele+`')" type='button' style='width:90%;background-color:#d69a74' class='btn p-2 fs-3' >Start Chat</button></td>
                </tr>
                </tbody>
            </table>`
            }
            

          }, 500);
        

    }
    

    
}


function startNewChat(ele){
    console.log("start start NewChat")
    eleid = ele
    chatid = ele.split('-')[1]
    nameOfFriend = ele.split('-')[2]
    console.log(chatid)
    console.log(nameOfFriend)
    chatHTML = `<div class='row shadow-sm'><h3 class='text-center my-3'>`+nameOfFriend+`</h3></div><div id='chatchat' class='scrollbar p-2' style='height:700px;overflow: scroll;overflow-x: hidden'>`
    chatHTML = chatHTML + `</div><div id="send-message" class="input-group my-3">
                                        <input id="message" type="text" class="form-control rounded1" placeholder="enter message...">
                                        <button onclick="newMessage()" class="btn hover-zoom" style='border-radius:20px;' type="submit"><img src='/images/icons/symmetry-horizontal.svg' height=25 width=25></button>
                                    </div>`
    chatBox = document.getElementById('chatbox')
    chatBox.innerHTML = chatHTML
    var sendMessage = document.getElementById("message");
                sendMessage.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
                        newMessage();
                    }
                });

}
function newMessage(){
    chatID = prevContactDivID
    message = document.getElementById('message').value
    // console.log(chatID)
    // console.log(message)

    if (message!=""){
        // run function
        // Send new message
        firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
        chatUrl = firebaseurl + "chat/data/"+chatid+".json"
        axios.get(chatUrl)
        .then((response) => {
            if(response.data == undefined){
                console.log('new Chat')
                newChatData = [{"message":message ,"sender":window.sessionStorage.userName}]
                axios.put(chatUrl, {
                    "messages": newChatData
                }).then((response) => {
                    reloadChatMessages()
                })
            }else{
                chatDataGet = response.data.messages
                // chatData.push()
                console.log(chatDataGet)
                newMsg = {"message":message ,"sender":window.sessionStorage.userName}
                chatDataGet.push(newMsg)
                // console.log(chatData)
                axios.put(chatUrl, {
                    "messages": chatDataGet
                }).then((response) => {
                    reloadChatMessages()
                })
            }
            
        })
        // reloadChatMessages()
    }
    //clear sent msg
    document.getElementById('message').value = ""
}

chatLength=0
reloadingChatID="new"
function reloadChatMessages(){
    if (isChatOpen == true){
        console.log("reloading chatMSG")
        chatid = prevContactDivID.split('-')[1]
        chatchat = document.getElementById('chatchat')
        firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
        chatUrl = firebaseurl + "chat/data/"+chatid+".json"
        axios.get(chatUrl)
        .then((response) => {
            console.log(response.data == null)
            if(response.data == null){
                console.log("Chat does not exist")
            }else{
                console.log("Chat exist")
                chatDataGet=response.data.messages
                console.log(chatLength)
                console.log(chatDataGet.length)
                if(chatDataGet.length!=chatLength){
                    console.log('new msg detected reloading')
                    chatLength = chatDataGet.length
                    newChatHTML = ""
                    for(mes of chatDataGet){
                        message = mes.message
                        sender = mes.sender

                        if (sender == window.sessionStorage.userName){
                            newChatMsgHtml = `<div class='row my-1'>
                                                <div class='col-7'></div>
                                                <div class='col-5'>
                                                    <div style='background-color:#915d3c;color:white;font-size: 13px;' class='py-2 px-2 rounded2'>
                                                        <h5 style='overflow-wrap:break-word;'>`+message+`</h5>
                                                    </div>
                                                </div>
                                            </div>`
                        }else{
                            newChatMsgHtml = `<div class='row my-1'>
                                                <div class='col-5 '>
                                                    <div style='background-color:#d98550;color:white;font-size: 13px;' class='py-2 px-2 rounded2'>
                                                        <h5 style='overflow-wrap:break-word;'>`+message+`</h5>
                                                    </div>
                                                </div>
                                                <div class='col-7'>
                                                </div>
                                            </div>`
                        }
                        newChatHTML = newChatHTML + newChatMsgHtml
                    }
                    chatchat.innerHTML = newChatHTML
                    elem = document.getElementById('chatchat');
                    elem.scrollTop = elem.scrollHeight;


                }else{
                    console.log("no newmsg")
                }
            }
        })
    }else{
        console.log('no chat window open')
    }
}

setInterval(function(){ 
    reloadChatMessages() 
}, 3000);

function loadChatDataOnStartUpDesktop(){
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
    chatUrl = firebaseurl + "chat/data.json"
    axios.get(chatUrl)
      .then((response) => {
        chatData=response.data
        // console.log(chatData)
      })
}

function loadContactsDesktop(){
    username = window.sessionStorage.userName
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
    profileUrl = firebaseurl + "userProfile/data" + ".json"
    output = null
    axios.get(profileUrl)
        .then((response) => {
            response = response.data
            html = ``
            for (let i = 1; i < response.length; i++) {
                const ele = response[i];
                friendName = ele.name
                if (friendName != username){
                    profilePic = ele.profilePictureUrl
                    // console.log(friendName)
                    // console.log(profilePic)
                    // chatId by alphabetical order
                    if (username < friendName){ 
                        chatId = username + friendName
                    }
                    else {
                        chatId = friendName + username
                    }
                    // console.log(chatId)
                    newHtml = `<div id='chatID-`+chatId+`-`+friendName+`' class='row' style='border-bottom: 2px solid #f5d2bc' onclick='openChatWindowDesktop(this.id)'>
                                    <div class='col-3'>
                                        <img src=${profilePic} class="rounded-circle my-2 " width=80 height=80>
                                    </div>
                                    <div class='col-9 my-auto'>
                                        <h3>`+friendName+`</h3>
                                    </div>
                                </div>
                                `

                    html = html +newHtml
                }
            }
            document.getElementById('userContactsList').innerHTML = html
            //scroll to the bottom
            
        }).catch(error => {
            console.log(error.message)}
        )
  }

