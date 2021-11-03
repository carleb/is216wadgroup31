console.log("import functions from homepage.js")
function checkIfUserOnLocation(){
  if(currentLocation == 'no location'){
    console.log("no s a dsada d")
  }
} 

// change icons to fill (excluding post)
function fill(id) {
    if (document.getElementById(id).querySelector('img').src.indexOf("fill") == -1) {
        var src = document.getElementById(id).querySelector('img').src
        var lastIndex = src.lastIndexOf('.')
        document.getElementById(id).querySelector('img').src = src.substr(0, lastIndex) + "-fill" + src.substr(lastIndex)
    }

    var arr = ["chat", "profile", "home"]

    arr.forEach(e => {
        if (e != id) {
            document.getElementById(e).querySelector('img').src = document.getElementById(e).querySelector('img').src.replace("-fill", "")
        }
    });

}

// like
function fillHeart(id){
  postId = id.split('-')[1]
  like_id = "like-"+postId
  numLikes_id = 'numLikes-'+postId
    if (document.getElementById(id).querySelector('img').src.includes("fill")) {
        // console.log("remove fill")
        document.getElementById(id).querySelector('img').src = document.getElementById(id).querySelector('img').src.replace("-fill", "")
        document.getElementById(like_id).innerText = "Like"
        number = document.getElementById(numLikes_id).innerText.split(' ')[0]
        number = parseInt(number)-1
        document.getElementById(numLikes_id).innerText = number + ' Likes'
        updateLikes(postId)
    }
    else{
        // console.log("add fill")
        var src = document.getElementById(id).querySelector('img').src
        var lastIndex = src.lastIndexOf('.')
        document.getElementById(id).querySelector('img').src = src.substr(0, lastIndex) + "-fill" + src.substr(lastIndex)
        document.getElementById(like_id).innerText = "Liked"
        number = document.getElementById(numLikes_id).innerText.split(' ')[0]
        number = parseInt(number)+1
        document.getElementById(numLikes_id).innerText = number + ' Likes'
        updateLikes(postId)
    }
}

function updateLikes(postId){
  console.log('--updateLikes start--')
  username = window.sessionStorage.userName
  like_arr=[]
  tableName = "post"
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  url = firebaseurl + tableName + "/data/" + postId + ".json"
  url2 = firebaseurl + tableName + "/data/" + postId + '/likes/' + ".json"
  axios.get(url2).then((response) => {
    if(response.data == null){
      like_arr = [username]      
      axios.put(url2,{
      like_arr   
     })
    }
    else{
      let checker = false
      for( var i = 0; i < response.data.like_arr.length; i++){ 
    
        if ( response.data.like_arr[i] === username) { 
            response.data.like_arr.splice(i, 1); 
            like_arr = response.data.like_arr
            checker = true
        }
      }
      if(checker == true){
        axios.put(url2,{
          like_arr    
         })
      }
      else if(checker == false){
        response.data.like_arr.push(username)
        like_arr = response.data.like_arr
        axios.put(url2,{
          like_arr   
         })
      }
    }      
        }, (error) => {
        console.log(error);
        output = error
        
    });
    console.log('--updateLikes end--')
}

function getLikesToUpdateHTML(postId){
  username = window.sessionStorage.userName
  tableName = "post"
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  url = firebaseurl + tableName + "/data/" + postId + ".json"
  axios.get(url)
  .then((response) =>{ 
    numLikesId = 'numLikes-'+postId
    heartId = 'heart-'+postId
    likeId = 'like-' + postId
    popoverId = 'popLikes-' + postId
    if(response.data.likes == null){
      numLikes = 0
      like_str = numLikes + ' Likes'
      document.getElementById(numLikesId).innerText = like_str
      document.getElementById(heartId).querySelector('img').src='/images/icons/heart.svg'
      document.getElementById(likeId).innerText = 'Like'
      document.getElementById(popoverId).innerText = 'No Likes Yet.'
    }
    else{
      document.getElementById(popoverId).innerHTML = '<b>Liked By:</b>'
      document.getElementById(popoverId).innerHTML += '<ul>'
      like_arr = response.data.likes.like_arr
      numLikes = like_arr.length
      if(numLikes == 1){
        like_str = numLikes + ' Like'
      }
      else{
        like_str = numLikes + ' Likes'
      }
      
      document.getElementById(numLikesId).innerText = like_str
      let checker = false
      for(ele of like_arr){
        document.getElementById(popoverId).innerHTML += `<li class='list-unstyled'>`+ele+`</li>`
        if(ele == username){
          checker = true
        }
      }
      document.getElementById(popoverId).innerHTML += '</ul>'
      if(checker == true){
        document.getElementById(heartId).querySelector('img').src='/images/icons/heart-fill.svg'
        document.getElementById(likeId).innerText = 'Liked'
      }
      else if(checker == false){
        document.getElementById(heartId).querySelector('img').src='/images/icons/heart.svg'
        document.getElementById(likeId).innerText = 'Like'
      }
    }
    
    
  }, (error) => { console.log(error); });

}

profileHTML = `<a class="dropdown-item  hover-color3" href="/screens/user_profile.html?userid=` + window.sessionStorage.userID + `">My Profile</a></li>`
document.getElementById("profile").innerHTML = profileHTML
// change post icon from pencil-square to pencil-fill
//GOT BUG keep causing an error
function fillPost(id){
    // if (document.getElementById(id).querySelector('img').src.indexOf("fill") == -1) {
    //     document.getElementById(id).querySelector('img').src = document.getElementById(id).querySelector('img').src.replace("-square", "-fill")
    // }

    // var arr = ["chat", "settings", "profile", "map", "home"]

    // arr.forEach(e => {
    //     if (e != id) {
    //         document.getElementById(e).querySelector('img').src = document.getElementById(e).querySelector('img').src.replace("-fill", "")
    //     }
    // });

}

// function reDirectToLogin(){
//   window.location.href = "/screens/login.html"; 
// }
// function disablePostIfNotLogin(){
//   disableHTML=`<div class="modal-dialog">
//   <div class="modal-content">
//     <div class="modal-header">
//       <h5 class="modal-title" id="exampleModalLabel">You need to be logged in to create a new post</h5>
//       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">

//       <!-- form start -->
//         <!-- drop files start-->
//         <div>
//           Thank you for using PetSociety, we hope you enjoy your time here.
//           <br>
//           However you must be logged in to create a new post.
//           <hr>
//           Click <span class='fw-bold'>Ok</span> a to be redirected to the login screen.
//         </div>

//         <!-- post text end -->

//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//       <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="reDirectToLogin()">Ok</button>
//     </div>
//     <!-- form end -->

//   </div>
// </div>`
// }

// for the "New Post" to appear
document.querySelector('#post')

var i = 0;
var txt = ' New Post'; /* The text */
var speed = 80; /* The speed/duration of the effect in milliseconds */
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("newpost").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function clearMessageInput(){
  document.getElementById("message").value = ""
}

function showChat(ele){
  event.preventDefault()
  // console.log(ele)
  username = window.sessionStorage.userName
  friend = ele
  // friend = ele.id
  // console.log(friend)
  
  document.getElementById("chat-header").innerHTML = 
  `
  <div class='col-4 text-start '>
    <button class='ms-3 btn hover-color2 rounded-circle' onclick="backToContacts(this)">
      <img src="/images/icons/chevron-left.svg" alt="Bootstrap">
    </button>
  </div>
  <div class='col-4 text-start'>
    <p class='mt-1'> `+friend+` </p>
  </div>
  <div class='col-4'>
  </div>
  
  `
  
  document.getElementById("chatSidebar").innerHTML =
  `
  <div id="convo" class="mx-3">
  </div>
  `
  document.getElementById('chat-send-div').innerHTML = `
  <div id="send-message" class="input-group mt-3" style='width:100%;'>
    <input id="message" type="text" class="form-control rounded1" placeholder="enter message...">
    <button class="btn hover-zoom ms-1" onclick="createChat(username, friend, document.getElementById('message').value); clearMessageInput();" style='border-radius:20px' type="submit"><img src='/images/icons/symmetry-horizontal.svg' height=25 width=25></button>
  </div>`
  //init chat
  createChat(username, friend, '')

  //sendMsg
  document.querySelector("#message").addEventListener("keypress", function (e) {
    if (e.key === "Enter"){
      createChat(username, friend, document.getElementById('message').value)
      clearMessageInput()
    }
  })
  startRefresh(username, friend)
}

var globalvar = {refresh : "", len : 0}

function startRefresh(username, friend){
  globalvar.refresh = window.setInterval(function(){
    /// call your function here
    console.log("refresh")

    refreshChat(username, friend, len=globalvar.len)
  }, 1000);
}

function endRefresh(){
  clearInterval(globalvar.refresh)
}

// work in progress
function refreshChat(username, friend, len=globalvar.len){
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  if (username < friend){
    // chatId by alphabetical order
    chatId = username + friend
  }
  else {
    chatId = friend + username
  }
  url = firebaseurl + "chat/data/" + chatId + ".json"
  axios.get(url)
  .then((response) => {
    if (response.data != undefined){
      msgs = response.data.messages
      // if (len != msgs.length){
      //   diff = len-msgs.length
      //   // console.log("diff", diff)
      //   for (msg of msgs.slice(diff)) {
      //     if (msg["sender"] == friend){
      //       document.getElementById("convo").innerHTML += `<h6 class="text-start"><span class='fw-bold'>${friend}:</span> ${msg["message"]}</h6>`
      //     }
      //   }
      //   globalvar.len = msgs.length
      // }
    }
  })
}

function createChat(username, friend, message){
  document.getElementById('chatSidebar').style.maxHeight = '445px'
  document.getElementById('chatSidebar').style.height = '445px'
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  if (username < friend){
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
      data = {"sender": username, "message": message}
      if (response.data == undefined){
        messages = [data]
      }
      else {
        messages = response.data.messages;
        if(message !=''){
          messages.push(data)
        }
      }
      console.log(messages.length)
      
      for(chatData of messages){
        sender = chatData.sender
        chatmessage = chatData.message
        if(chatmessage == ''){continue}
        chatHTML += 
        `
        <h6 style='overflow-wrap:break-word;' class="text-start"><span class='fw-bold'>${sender}:</span> ${chatmessage}</h6>
        `
      }
      document.getElementById("convo").innerHTML = chatHTML
      if(message!=""){
        axios.put(url, {
          "messages": messages
        })
      }
    })

}

function liveChatSearch(){
  input = document.getElementById("live-chat-search-input").value
  console.log("input", input)
  if (input == ""){
    document.getElementById("live-chat-search-display").innerHTML = ""
  }
  else {
    input_lower = input.toLowerCase()
    html = ""
      firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
      profileUrl = firebaseurl + "userProfile/data" + ".json"
      axios.get(profileUrl)
          .then((response) => {
            data = response.data
            for (let i = 1; i < data.length; i++) {
              name1 = data[i].name
    
              // search is case insensitive
              name1_lower = name1.toLowerCase()
              
              if (name1_lower.indexOf(input_lower) != -1){
                html += "<li><span onclick='showChat(name1)'>" + name1 + "</span></li>"
              }
            }
            document.getElementById("live-chat-search-display").innerHTML = html
          })
  }

}

// function liveChatSearchDesktop(){
//   input = document.getElementById("search-input").value
//   // console.log("input", input)
//   username = window.sessionStorage.userName
//   if (input == ""){
//     document.getElementById("search-display").innerHTML = ""
//   }
//   else {
//     input_lower = input.toLowerCase()
//     html = ""
//       firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/"
//       profileUrl = firebaseurl + "userProfile/data" + ".json"
//       axios.get(profileUrl)
//           .then((response) => {
//             data = response.data
//             for (let i = 1; i < data.length; i++) {
//               name1 = data[i].name
    
//               // search is case insensitive
//               name1_lower = name1.toLowerCase()
              
//               if (name1_lower.indexOf(input_lower) != -1){
//                 ele = "chatID-" + username + 
//                 html += "<li><span onclick='openChatWindowDesktop(ele)'>" + name1 + "</span></li>"
//               }
//             }
//             document.getElementById("search-display").innerHTML = html
//           })
//   }

// }

function backToContacts(){
  console.log("--- start backToContacts ---")
  document.getElementById("chat-header").innerHTML = `
  <div class="mb-2">Live Chat</div><br>
  <div class="d-flex justify-content-center">
    <input type="search" class="form-control rounded1 mx-4" id="live-chat-search-input"
    placeholder="Search for Users">
    <ul class='rounded2 themebg position-fixed mt-2 shadow' id="live-chat-search-display"
              style='list-style-type: none; padding: 0; margin: 0; border:0;'>
    </ul>
  </div>`
  document.getElementById('live-chat-search-input').addEventListener('input', liveChatSearch)
  if (document.getElementById("send-message") != undefined){
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
          for (let i = 1; i < response.length; i++) {
            const ele = response[i];
            friendName = ele.name
            if (friendName != username){
              profilePic = ele.profilePictureUrl
              document.getElementById('chatSidebar').style.maxHeight = '100%'
              document.getElementById('chatSidebar').style.height = '100%'
              document.getElementById('chatSidebar').innerHTML += 
              `
              <div class='hover-color2 py-2'>
              <a id= '${friendName}' onclick="showChat(this.id)" href='#' class='text-decoration-none text-dark'>
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
              </div>`
            }

            }
      }).catch(error => {
        console.log(error.message) }
      )
  // console.log("--- end backToContacts ---")
  endRefresh()
}
// livechat js end

function processComment(ele){
  // console.log('--processComment start--')
  postId = ele.id.split('-')[1]
  comment = ele.previousElementSibling.children[0].value
  if(comment == ''){
    alert('Comments cannot be blank')
  }
  else if(comment.length >100){
    alert('Maximum comment length is 100 characters')
  }
  else{
    create_comment(postId, comment)
    ele.previousElementSibling.children[0].value = ''

    console.log('Comment: '+ comment +' is posted on post ID: '+ postId)
  }
  
  // console.log('--processComment end--')
}
function covert24Hrto12Hr(time) {
  // if (time.length == 7){
  //   // time = "0"+time
  // }
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    // console.log(time)
    time[3] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

function create_comment(postId, comment){
  let comment_arr = []
  username = window.sessionStorage.userName
  userId = window.sessionStorage.userID
  tableName = "post"
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  url = firebaseurl + tableName + "/data/" + postId + ".json"
  url2 = firebaseurl + tableName + "/data/" + postId + '/comments/' + ".json"

  //geting Time in human readable format
  date = new Date();
  [hour,seconds] = [date.getHours(), date.getMinutes()];
  date = date.toDateString()
  date = date.split(" ")
  newDate = date[1]+" "+date[2]+","+date[3]
  hourstr = ""+hour+""
  secondsstr = ""+seconds+""
  if(hourstr.length==1){hourstr="0"+hourstr}
  if(secondsstr.length==1){secondsstr="0"+secondsstr}
  newTime = hourstr+":"+secondsstr+":00"
  newTime = covert24Hrto12Hr(newTime)
  // end of  : geting Time in human readable format

  axios.get(url2).then((response) => {
    if(response.data == null){
      comment_arr = [[comment, username,newDate,newTime, userId]]
    }
    else{
      response.data.comment_arr.push([comment, username,newDate,newTime, userId])
      comment_arr = response.data.comment_arr
    }
    axios.put(url2,{
      comment_arr
      }).then((response2=>{
          newcomment =true
          postComments(postId)
      }))
      }, (error) => {
      console.log(error);
      output = error
        
    });
}

function postComments(postId){
  // console.log('--postComments start--')
  tableName = "post"
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  url = firebaseurl + tableName + "/data/" + postId + '/comments/' + ".json"
  output = null
  axios.get(url).then((response) => {
  dom_id = 'commentList-'+postId
    if(response.data == null){
      document.getElementById(dom_id).style.display = 'none'
    }
    else{
      // console.log("writing comment html postid"+postId)
      document.getElementById(dom_id).style.display = 'block'
      output = response.data.comment_arr
      output.reverse()
      document.getElementById(dom_id).innerHTML = ''
      date_year = ''
      if(output.length <=4){
        for(ele of output){
          if(ele[4]!=null){
            posterId = ele[4]
            posterURL = "/screens/user_profile.html?userid="+posterId
          }
          else{
            posterURL=''
          }         
          if(ele[2]!=null){
            date_year = ele[2].split(',')
          }
          else{
            date_year = ['Old data']
          }
          document.getElementById(dom_id).innerHTML += `<div class="row">
                                                            <div class='col-8'><a class='text-decoration-none text-dark fw-bold' href=`+posterURL+`>`+ele[1]+`:</a>`+` `+ele[0]+`</div>
                                                            <div class='col-4 text-end'>
                                                            <span class='d-sm-inline d-none'>`+date_year[0]+`</span> `+ele[3]+`</div>
                                                        </div>`
        }
      }
      else if(output.length > 3){  
        for(ele of output.slice(0,3)){
          if(ele[4]!=null){
            posterId = ele[4]
            posterURL = "/screens/user_profile.html?userid="+posterId
          }
          else{
            posterURL=''
          }
          if(ele[2]!=null){
            date_year = ele[2].split(',')
          }
          else{
            date_year = ['Old data']
          }
          document.getElementById(dom_id).innerHTML += `<div class="row">
                                                          <div class='col-8'><a class='text-decoration-none text-dark fw-bold' href=`+posterURL+`>`+ele[1]+`:</a>`+` `+ele[0]+`</div>
                                                          <div class='col-4 text-end'>
                                                          <span class='d-sm-inline d-none'>`+date_year[0]+`</span> `+ele[3]+`</div>
                                                      </div>`
        }
        document.getElementById(dom_id).innerHTML += `
        <a id='commentlist-postid-`+postId+`'onClick='showMore(this)' class='text-decoration-none text-muted' data-bs-toggle="collapse" href="#collapseExample`+postId+`" role="button" aria-expanded="false" aria-controls="collapseExample">
          Show older comments
        </a>
        <div class="collapse" id="collapseExample`+postId+`">
          <div id=collapse-`+postId+`>
          
          </div>
        </div>`
      collapse_id = 'collapse-'+postId
        for(ele of output.slice(3,output.length)){
          if(ele[4]!=null){
            posterId = ele[4]
            posterURL = "/screens/user_profile.html?userid="+posterId
          }
          else{
            posterURL=''
          }
          if(ele[2]!=null){
            date_year = ele[2].split(',')
          }
          else{
            date_year = ['Old data']
          }
          document.getElementById(collapse_id).innerHTML += `<div class="row">
                                                                <div class='col-8'><a class='text-decoration-none text-dark fw-bold' href=`+posterURL+`>`+ele[1]+`:</a>`+` `+ele[0]+`</div>
                                                                <div class='col-4 text-end'>
                                                                <span class='d-sm-inline d-none'>`+date_year[0]+`</span> `+ele[3]+`</div>
                                                            </div>`
        }
        document.getElementById(collapse_id).innerHTML += `<a onClick='showLess(`+postId+`)' class='text-decoration-none text-muted' data-bs-toggle="collapse" href="#collapseExample`+postId+`" role="button" aria-expanded="false" aria-controls="collapseExample">
          Show less comments
        </a>`
      }      
    }
    // getAllPost()
    // console.log("dsa")
  }, (error) => {
    console.log(error);
    output = error
  
});
// console.log('--postComments end--')

}

function showLess(postId){
  console.log("commentlist-postid-"+postId)
  ele = document.getElementById("commentlist-postid-"+postId)
  ele.style.display='block'
}

function showMore(ele){
  ele.style.display='none'
  // parrent = ele.parrentNode
  // console.log(parrent)
  // ele = document.getElementById("commentlist-postid-"+postId)

}
function focusInput(ele) {
  // console.log(ele.id)
  postId = ele.id.split('-')[1]
  id = "commentField-"+postId
  document.getElementById(id).focus();
}

function updatePosterPicture(userID,postID){
  tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = `${firebaseurl + tableName}/data/${userID}.json`
    // console.log(url)
    axios.get(url)
    .then((response) => {
        profilePictureUrl = response.data.profilePictureUrl
        if (profilePictureUrl== undefined){
            profilePictureUrl='/images/male_empty.png'
        }
        // console.log("CHANGING POSTER PIC")
        // console.log(document.getElementById('postPicture-'+postID).innerHTML)
        document.getElementById('postPicture-'+postID).src = profilePictureUrl

    })
}

function updatTaggedPicture(petID,postID){
  tableName = "petProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = `${firebaseurl + tableName}/data/${petID}.json`
    // console.log(url)
    axios.get(url)
    .then((response) => {
      
        if (response.data== null){
          petPictureUrl='/images/male_empty.png'
        }
        else{
          petPictureUrl = response.data.petPictureUrl
        }
        // console.log("CHANGING POSTER PIC")
        // console.log(document.getElementById('postPicture-'+postID).innerHTML)
        document.getElementById('postTagPicture-'+postID).src = petPictureUrl

    })
}

/// not in used yet
function updateTaggedPicture(userID,postID){
  tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = `${firebaseurl + tableName}/data/${userID}.json`
    // console.log(url)
    axios.get(url)
    .then((response) => {
        profilePictureUrl = response.data.profilePictureUrl
        if (profilePictureUrl== undefined){
            profilePictureUrl='/images/male_empty.png'
        }
        console.log(document.getElementById('postPicture-'+postID).innerHTML)
        document.getElementById('postPicture-'+postID).src = profilePictureUrl

    })
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function logout(){
  window.location.href = "/screens/login.html";
  window.sessionStorage.redirect = 'loggingout'
}

// On enter, comments will post
function onEnter(ele, e){
      if (e.keyCode === 13) {
        ele.parentElement.nextElementSibling.click()
      }
  }
  


function loadImageDisplay(event){
  var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
  document.getElementById('uploadImageLabel').innerText = 'Change image'
}

// Sidebar
function populateSideBar() {
  // userID= toString(userID)
  tableName = "petProfile"
  firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
  url = firebaseurl + tableName + "/data/" + ".json"
  output = null
  axios.get(url)
      .then((response) => {
        all_pets_arr= []
        let i=0
        for(let pet of response.data){
          if(pet == null){
            petID = i
            petDeleted = true
          }
          else{
            petID = pet.petID
            petBreed = pet.breed
            petName = pet.petName;
            petImage = pet.petPictureUrl
            petLocation = pet.lastSeenLocation
            distanceFromPet = getDistanceFromLatLonInKm(currentLocation['latitude'], petLocation['longitude'], petLocation['latitude'], currentLocation['longitude'])
            distanceFromPet=Math.round(distanceFromPet * 100) / 100
            petDeleted = false
          }
          
          i++
          // console.log(distanceFromPet)
          if(!isNaN(distanceFromPet)){
            if(petDeleted == false){
              pet_arr = [distanceFromPet,petName, petBreed ,petImage,petID]
              all_pets_arr.push(pet_arr)
            }  
          } 
        }
        //sort array by distance
        all_pets_arr.sort((a,b) => a[0] - b[0])
        
        document.getElementById('petsDiv').innerHTML =`
        <div id='addPetDiv' class='mx-2 mx-xl-0 py-xl-3 mt-4 mt-xl-0 ms-4 ms-xl-0' style='white-space:nowrap'>
          <a href="/screens/newPetForm.html" class='justify-content-center my-auto d-xl-flex d-block text-decoration-none text-dark'>
            <div id='addPetIcon' class="img_cont2 rounded-circle ms-3 ms-xl-1">
              <img src="/images/icons/plus-circle.svg" class="rounded-circle user_img2">
            </div>
            <div class=' fw-bold  ms-xl-2'>
              Add Pet
            </div>
          </a>
        </div>`
        // console.log(all_pets_arr)
       
        for(arr of all_pets_arr){
          
          petLocation = arr[0]
          petLocation = petLocation.toFixed(0) + 'km away'
          petName = arr[1]
          petBreed = arr[2]
          petImage = arr[3]
          petID = arr[4]
          urlLink ='/screens/petprofile.html?petID='+petID
          document.getElementById('petsDiv').innerHTML += `
          <div id='nearbyPet' class='mx-xl-2 rounded2'>
          <a href='`+urlLink+`' class='text-decoration-none text-dark'>
            <div class=' row d-none d-xl-flex' style='white-space:nowrap'>       
              <div class='col-xl-4 my-auto'>
                <div class="img_cont mx-auto rounded-circle shadow d-flex">
                  <img src="`+petImage+`" class="rounded-circle user_img">
                </div>
              </div>
              <div class='col-xl-4 text-center'>
                  <p class='fw-bold mt-3'>`+petName+`</p>
                  <p>`+petBreed+`</p>
                </div>
              <div class='col-xl-4 text-center'>
                <p style='margin-top:35px'>`+petLocation+`</p>
              </div>
            </div>
          </a>
        
          <div class='mx-xl-auto d-flex d-xl-none overflow-visible mb-4' style='white-space:nowrap '>
            <a href='`+urlLink+`' class='text-decoration-none text-dark d-flex overflow-visible ms-3'>
              <div class='text-center overflow-visible'>
                <span class='fw-bold'>`+petName+`</span>
                <div class="img_cont mx-auto rounded-circle shadow d-flex">
                  <img src="`+petImage+`" class="rounded-circle user_img">
                </div>
                <span class=''>`+petLocation+`</span>
              </div>
            </a>
          </div> 
        </div>
          `
           
        }
       
        // <div class="font-monospace text-center  mx-2 my-3 py-2 bg-white border rounded-2">Nearby Pet 2</div>
          
      }, 
      (error) => {
          console.log(error);
          output = error
          
      });
}


function loadWebSearch(){
  input = document.getElementById("websearchInput");
  filter = input.value.toUpperCase();
  // console.log(filter)
  ul = document.getElementById("webSearchDisplay");
  li = ul.getElementsByTagName("li");
  if(filter == ''){
    // console.log("empty")
    ul.style.display='none'
  }else{
    ul.style.display='block'
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "block";
      } else {
          li[i].style.display = "none";
      }
    }
  }
}

function loadWebSearchList(){
  // console.log("load")
  display = document.getElementById('webSearchDisplay')
  // styling = `style='border: 1px solid #ddd;margin-top: -1px;background-color: #f6f6f6;padding: 12px;text-decoration: none;font-size: 18px;color: black;display: none' onMouseOver="this.style.color='#eee'" onMouseOut="this.style.color='#f6f6f6'"`
  console.log("searchData", searchData)
  newHTML = ``
  for(searchdataID in searchData){
     data = searchData[searchdataID]
    //  console.log(searchdataID)
    //  console.log(data)
     id = data[0]
     nameDisplay = data[1]
     type = data[2]
     pictureUrl = data[3]
     if (type=='user'){
       urlLink = '/screens/user_profile.html?userid='+id
     }else{
       urlLink ='/screens/petprofile.html?petID='+id
     }
     display_text = `<span class='fw-bold'>`+ nameDisplay + `</span>` +" - "+type

     liHtml = `<li class='rounded2 hover-color2 p-3 themebg font-monospace'><a href="`+urlLink+`" class='text-decoration-none text-dark' style='white-space:nowrap;'>`+display_text+`</a></li>`
     newHTML = newHTML + liHtml
  }
  display.innerHTML=newHTML
}

function loadMobileSearch(){
  input = document.getElementById("mobilesearchInput");
  filter = input.value.toUpperCase();
  // console.log(filter)
  ul = document.getElementById("mobileSearchDisplay");
  li = ul.getElementsByTagName("li");
  if(filter ==''){
    // console.log("empty")
    ul.style.display='none'
  }else{
    ul.style.display='block'
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "block";
      } else {
          li[i].style.display = "none";
      }
    }
  }
}

function loadMobileSearchList(){
  console.log("Searchin mobile list")
  display = document.getElementById('mobileSearchDisplay')
  // styling = `style='border: 1px solid #ddd;margin-top: -1px;background-color: #f6f6f6;padding: 12px;text-decoration: none;font-size: 18px;color: black;display: none' onMouseOver="this.style.color='#eee'" onMouseOut="this.style.color='#f6f6f6'"`
  // console.log(searchData)
  newHTML = ``
  for(searchdataID in searchData){
     data = searchData[searchdataID]
    //  console.log(searchdataID)
    //  console.log(data)
     id = data[0]
     nameDisplay = data[1]
     type = data[2]
     pictureUrl = data[3]
     if (type=='user'){
       urlLink = '/screens/user_profile.html?userid='+id
     }else{
       urlLink ='/screens/petprofile.html?petID='+id
     }
     display_text = `<span class='fw-bold'>` + nameDisplay+'</span>'  +" - "+type

     liHtml = `<li class='rounded2 hover-color2 p-2 themebg font-monospace text-center'><a href="`+urlLink+`" class='text-decoration-none text-dark' style='white-space:nowrap;'>`+display_text+`</a></li>`
     newHTML = newHTML + liHtml
  }
  display.innerHTML=newHTML
}


function loadTagSearch(){
  input = document.getElementById("tagsearchInput");
  filter = input.value.toUpperCase();
  // console.log(filter)
  ul = document.getElementById("tagSearchDisplay");
  li = ul.getElementsByTagName("li");
  if(filter ==''){
    // console.log("empty")
    ul.style.display='none'
  }else{
    ul.style.display='block'
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "block";
      } else {
          li[i].style.display = "none";
      }
    }
  }
}

function loadTagSearchList(){
  console.log("load tag list")
  display = document.getElementById('tagSearchDisplay')
  // styling = `style='border: 1px solid #ddd;margin-top: -1px;background-color: #f6f6f6;padding: 12px;text-decoration: none;font-size: 18px;color: black;display: none' onMouseOver="this.style.color='#eee'" onMouseOut="this.style.color='#f6f6f6'"`
  // console.log(searchData)
  newHTML = ``
  for(searchdataID in searchData){
     data = searchData[searchdataID]
    //  console.log(searchdataID)
    //  console.log(data)
     id = data[0]
     nameDisplay = data[1]
     type = data[2]
     pictureUrl = data[3]

     if (type!='user'){
      display_text =  nameDisplay +" - "+type
      display_text = display_text.split(" - ")
      display_text_html = `<span class='fw-bold'>`+display_text[0]+ `</span>` + " - "+display_text[2] + " - Pet ID : "+id
      display_text = display_text[0] + " - "+display_text[2] + " - Pet ID : "+id
      liHtml = `<li class='rounded2 hover-color2 p-3 themebg font-monospace text-start' onclick='replaceTagSearch("`+display_text+`")'><a href="#" class='text-decoration-none text-dark'>`+display_text_html+`</a></li>`
      newHTML = newHTML + liHtml
     }
     
  }
  display.innerHTML=newHTML
}

function replaceTagSearch(input){
  document.getElementById('tagsearchInput').value = input
  document.getElementById("tagSearchDisplay").style.display='none'
}

function getUserFollowing(){
  
}

function getShareURL(postID){
    Event.clipboardData.setData("text/plain", "dhsadh ashdjk lasld");
    console.log(Event.clipboardData.getData("text"))

}

function copy(postID){
  console.log("added TO clip board")
  text = "https://is216wadgroup31.vercel.app/screens/post.html?postID="+postID
  console.log(text)
  var inp =document.createElement('input');
  document.body.appendChild(inp)
  inp.value =text
  inp.select();
  document.execCommand('copy',false);
  inp.remove();

  document.getElementById('sharableLink-'+postID).style.display='block'
  document.getElementById('sharableLink-'+postID).classList.add("animate__animated");
  document.getElementById('sharableLink-'+postID).classList.add("animate__bounceIn");
  setTimeout(function() { 
    document.getElementById('sharableLink-'+postID).style.display='none'
  }, 4000);
}

