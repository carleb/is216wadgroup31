// livechat js start

var globalVar = "no"

function backgroundColor(ele) {
  if (globalVar == "no") {
    globalVar = "yes"
    ele.style.backgroundColor = '#fef9f8'
  }
  else {
    globalVar = "no"
    ele.style.backgroundColor = '#FFFFFF'
  }
}

function clearMessageInput() {
  document.getElementById("message").value = ""
}

function showChat(ele) {
  document.getElementById('searchBar').innerHTML = ""
  // console.log(document.getElementById('searchBar').style.display)
  event.preventDefault()
  username = window.sessionStorage.userName
  friend = ele.id

  document.getElementById("chat-header").innerHTML =
    `
    <div class='d-flex flex-row mb-2'>
      <button class= 'btn' onclick="backToContacts(this)">
        <img class='rounded-circle themebg p-2' src="/images/icons/chevron-left.svg" alt="Bootstrap">
      </button>
    <p class='mt-3 fs-5' style="position: relative; left: 85px;"> `+ friend + ` </p>
    </div>
    `

  document.getElementById("chat-main").innerHTML =
    `
    <div id="convo" class="mx-3">
    </div>
    `
  document.getElementById('chat-send').innerHTML = `
    <div id="send-message" class="input-group py-3">
      <input id="message" type="text" class="form-control rounded1" placeholder="enter message...">
      <button class="btn hover-zoom" onclick="createChat(username, friend, document.getElementById('message').value); clearMessageInput();" style='border-radius:20px;' type="submit"><img src='/images/icons/symmetry-horizontal.svg' height=25 width=25></button>
    </div>`
  //init chat
  // createChat(username, friend, '')

  refreshChat()

  //sendMsg
  document.querySelector("#message").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      createChat(username, friend, document.getElementById('message').value)
      clearMessageInput()
    }
  })
}

intervalId = ""

function refreshChat() {
  console.log("refresh")
  intervalId = window.setInterval(function () {
    /// call your function here
    createChat(username, friend, '')
  }, 500);
}

function createChat(username, friend, message) {
  document.getElementById('chat-main').style.maxHeight = '570px'
  document.getElementById('chat-main').style.height = '570px'
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  if (username < friend) {
    // chatId by alphabetical order
    chatId = username + friend
  }
  else {
    chatId = friend + username
  }

  chatHTML = ""
  chatUrl = firebaseurl + "chat/data/" + chatId + ".json"
  axios.get(chatUrl)
    .then((response) => {
      data = { "sender": username, "message": message }
      if (response.data == undefined) {
        messages = [data]
        // console.log("messages", messages)
      }
      else {
        messages = response.data.messages;
        if (message != "") {
          messages.push(data)
        }
      }
      // console.log(messages.length)

      for (chatData of messages) {
        sender = chatData.sender
        chatmessage = chatData.message
        if (chatmessage == '') { continue }
        if (sender == username) {
          chatHTML +=
            `
              <div class='row my-1'>
                <div class='col-5'></div>
                <div class='col-7'>
                  <div style='background-color:#915d3c;color:white;font-size: 12px;' class='py-2 px-2 rounded2'>
                      <h6 style='overflow-wrap:break-word;overflow:hidden;'>`+ chatmessage + `</h6>
                  </div>
                </div>
              </div>
              `
          // <h6 style='overflow-wrap:break-word;overflow:hidden;'><span class='fw-bold'>${sender}:</span> ${chatmessage}</h6>
        }
        else {
          chatHTML +=
            `
            <div class='row my-1'>
            <div class='col-7 '>
              <div style='background-color:#d98550;color:white;font-size: 12px;' class='py-2 px-2 rounded2'>
                  <h6 style='overflow-wrap:break-word;overflow:hidden;'>`+ chatmessage + `</h6>
              </div>
            </div>
            <div class='col-5'>
            </div>
            </div>
            `
          // <h6 style='overflow-wrap:break-word;'<span class='fw-bold'>${sender}:</span> ${chatmessage}</h6>
        }
      }
      document.getElementById("convo").innerHTML = chatHTML
      if (message != "") {
        axios.put(chatUrl, {
          "messages": messages
        })
      }
    })

}

function backToContacts() {
  console.log("--- start backToContacts ---")
  document.getElementById('chat-main').scrollTop = 0
  document.getElementById('searchBar').innerHTML =
    `
    <input type="search" class="form-control rounded1 m-4" id="search-input-mobile" onkeyup="liveChatSearchMobile()"
      placeholder="Search for Users">
      <ul class='rounded2 themebg position-fixed mt-2 shadow' id="search-display-mobile"
        style='list-style-type: none; padding: 0; margin: 0; border:0;'>
      </ul>
    `
  document.getElementById("chat-header").innerHTML = ""
  if (document.getElementById("send-message") != undefined) {
    document.getElementById("send-message").innerHTML = ""
    document.getElementById("convo").innerHTML = ""
  }
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
        if (friendName != username) {
          profilePic = ele.profilePictureUrl
          // document.getElementById('chat-main').style.maxHeight = '100%'
          // document.getElementById('chat-main').style.height = '100%'
          id = friendName + 'a'
          html +=
            `
                <div class='py-2 hold' id='${id}'>
                <a id= '${friendName}' onclick="showChat(this)" href='#' class='text-decoration-none text-dark'>
                <div id="friendName${i}" class='row' style='white-space:nowrap'>
                  <div class='col-4 text-end'>
                  <img src=${profilePic} class="rounded-circle" width=80 height=80>
                  </div>
                  <div class='col-8 my-auto text-start'>
                  <span class="fs-5">${friendName}</span>
                  <img src="/images/icons/chevron-right.svg" alt="Bootstrap" >
                  </div>
                </div>
                </a>
                <hr>
                </div>
                `
        }
      }
      html = html.slice(0, -21) // slice off the  last hr
      document.getElementById('chat-main').innerHTML = html

      document.getElementById('chat-main').style.maxHeight = '800px'
      document.getElementById('chat-main').style.height = '800px'

    }).catch(error => {
      console.log(error.message)
    }
    )
  console.log("--- end backToContacts ---")
  // endRefresh()

  if (intervalId != "") {
    clearInterval(intervalId)
  }

  console.log("--- end backToContacts ---")
  // endRefresh()

  if (intervalId != "") {
    clearInterval(intervalId)
  }
}
// livechat js end

function logout() {
  window.location.href = "/screens/login.html";
  window.sessionStorage.redirect = 'loggingout'
}

function fill() {
  // document.getElementById("fill").src = "/images/icons/person-fill.svg"
}

function liveChatSearchMobile() {
  input = document.getElementById("search-input-mobile").value
  input_lower = input.toLowerCase()
  console.log("input", input)
  username = window.sessionStorage.userName
  arr = document.querySelectorAll('.hold')
  console.log("arr", arr)
  for (let i = 0; i < arr.length; i++) {
    id = arr[i].id
    // console.log("id", id)
    friendname = id.slice(0, -1)
    friendname_lower = friendname.toLowerCase()
    if (friendname_lower.indexOf(input_lower) == -1) {
      document.getElementById(id).style.display = "none"
    }
    else {
      document.getElementById(id).style.display = "block"
    }
  }
}