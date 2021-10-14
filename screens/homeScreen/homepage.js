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

    var arr = ["chat", "settings", "profile", "map", "home"]

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
      document.getElementById(heartId).querySelector('img').src='icons/heart.svg'
      document.getElementById(likeId).innerText = 'Like'
      document.getElementById(popoverId).innerText = 'No Likes Yet.'
    }
    else{
      document.getElementById(popoverId).innerHTML = '<b>Liked By:</b>'
      document.getElementById(popoverId).innerHTML += '<ul>'
      like_arr = response.data.likes.like_arr
      numLikes = like_arr.length
      like_str = numLikes + ' Likes'
      document.getElementById(numLikesId).innerText = like_str
      let checker = false
      for(ele of like_arr){
        document.getElementById(popoverId).innerHTML += `<li>`+ele+`</li>`
        if(ele == username){
          checker = true
        }
      }
      document.getElementById(popoverId).innerHTML += '</ul>'
      if(checker == true){
        document.getElementById(heartId).querySelector('img').src='icons/heart-fill.svg'
        document.getElementById(likeId).innerText = 'Liked'
      }
      else if(checker == false){
        document.getElementById(heartId).querySelector('img').src='icons/heart.svg'
        document.getElementById(likeId).innerText = 'Like'
      }
    }
    
    
  }, (error) => { console.log(error); });

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

// function reDirectToLogin(){
//   window.location.href = "/screens/welcomeScreen/login.html"; 
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

// post- choose files
var fileElement = document.getElementById("file")
fileElement.addEventListener("change", handleFiles, false);
function handleFiles(e) {
    var fileList = this.files; /* now you can work with the file list */
    if (fileList == "undefined")
    console.log(fileList)
}

// post- drag and drop files
// let dropbox;

// dropbox = document.getElementById("dropbox");
// dropbox.addEventListener("dragenter", dragenter, false);
// dropbox.addEventListener("dragover", dragover, false);
// dropbox.addEventListener("drop", drop, false);

// function dragenter(e) {
//     e.stopPropagation();
//     e.preventDefault();
//   }
  
// function dragover(e) {
//     e.stopPropagation();
//     e.preventDefault();
// }

// function drop(e) {
//     e.stopPropagation();
//     e.preventDefault();

//     const dt = e.dataTransfer;
//     const files = dt.files;

//     handleFiles(files); // above
// }

function showChat(ele){
    console.log(window.sessionStorage.userID)
    userID = window.sessionStorage.userID
    document.getElementById('chatSidebar').innerHTML = `<div class='card stick themebg rounded2 p-4 border border-0 shadow font-monospace chatSidebar'>
    <div>
        <button class='btn' onClick='backToContacts(this)'>Back</button>
    </div>
    <h1>Person</h1>
    <div class="card-body contacts_body">
      
    </div>
  </div>`
}

function backToContacts(ele){
    document.getElementById('chatSidebar').innerHTML = `<div class='card stick themebg rounded2 p-4 border border-0 shadow font-monospace chatSidebar'>
    <div class="input-group">
      <input type="text" placeholder="Search Chat..." name="" class="form-control search rounded1 ">
      <i class="fa fa-search icon position-absolute" style='right:20px; top:10px'></i>
    </div>
    <hr>
    <div class="card-body contacts_body">
      <ul class="contacts" id=contactList>
        <li class='float-start'>
          <button class="d-flex w-100 rounded2" onClick='showChat(this)'>
            <div class="img_cont">
              <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
            </div>
            <div class='col-2 d-block user_info my-auto'>
              <h5 id='friendName' class='text-start'>Gerald</h5>
            </div>
            <div class='col-5 my-auto text-end' style='height:38px'>
              <i class="fa fa-chevron-right mt-2" ></i>
            </div>   
          </button>
        </li>
     
        <li class='float-start'>
          <button class="d-flex w-100 rounded2" onClick='showChat(this)'>
            <div class="img_cont">
              <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
            </div>
            <div class='col-2 d-block user_info my-auto'>
              <h5 id='friendName' class='text-start'>Rou</h5>
            </div>
            <div class='col-5 my-auto text-end' style='height:38px'>
              <i class="fa fa-chevron-right mt-2" ></i>
            </div>    
          </button>
        </li>
        <li class='float-start'>
          <button class="d-flex w-100 rounded2" onClick='showChat(this)'>
            <div class="img_cont">
              <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
            </div>
            <div class='col-2 d-block user_info my-auto'>
              <h5 id='friendName' class='text-start'>Caleb</h5>
            </div>
            <div class='col-5 my-auto text-end' style='height:38px'>
              <i class="fa fa-chevron-right mt-2" ></i>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>`
}

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
      comment_arr = [[comment, username,newDate,newTime]]
    }
    else{
      response.data.comment_arr.push([comment, username,newDate,newTime])
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
          if(ele[2]!=null){
            date_year = ele[2].split(',')
          }
          else{
            date_year = ['Old data']
          }         
          document.getElementById(dom_id).innerHTML += `<div class="row">
                                                            <div class='col-8'><b>`+ele[1]+`:</b>`+` `+ele[0]+`</div>
                                                            <div class='col-4 text-end'>
                                                            <span class='d-sm-inline d-none'>`+date_year[0]+`</span> `+ele[3]+`</div>
                                                        </div>`
        }
      }
      else if(output.length > 3){  
        for(ele of output.slice(0,3)){
          if(ele[2]!=null){
            date_year = ele[2].split(',')
          }
          else{
            date_year = ['Old data']
          }
          document.getElementById(dom_id).innerHTML += `<div class="row">
                                                          <div class='col-8'><b>`+ele[1]+`:</b>`+` `+ele[0]+`</div>
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
          document.getElementById(collapse_id).innerHTML += `<div class="row">
                                                                <div class='col-8'><b>`+ele[1]+`:</b>`+` `+ele[0]+`</div>
                                                                <div class='col-4 text-end'
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
  console.log(ele.id)
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
            profilePictureUrl='/img/male_empty.png'
        }
        console.log("CHANGING POSTER PIC")
        console.log(document.getElementById('postPicture-'+postID).innerHTML)
        document.getElementById('postPicture-'+postID).src = profilePictureUrl

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
            profilePictureUrl='/img/male_empty.png'
        }
        console.log(document.getElementById('postPicture-'+postID).innerHTML)
        document.getElementById('postPicture-'+postID).src = profilePictureUrl

    })
}

// function getAllPost() {
//   console.log()
//   tableName = "post"
//   firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
//   postFeedHTML = ""
//   url = firebaseurl + tableName + ".json"
//   cardList = document.getElementById('card-list')

//   axios.get(url)
//     .then((response) => {
//       allPostData = response.data.data
//       // console.log(response.data.data)
//       allPostData.reverse()
//       for(postData of allPostData){
//         type = postData.postType
//         if (type == "photo"){
//           firstPhotoUrl = postData.photoUrl[0]
//           postText = postData.postText
//           postedByID = postData.postedByID
//           postedOn = postData.postedOn
//           postedAtLocation = postData.postedAt
//           postId = postData.postID
//           postComments(postId)
//           newCardHTML = `<div style="max-width:800px;" class="card shadow border border-0 themebg font-monospace rounded2 py-3 px-md-5 px-sm-4 px-3 mt-xl-5 mt-sm-3 mt-3 mx-auto fadein">
//                 <!-- Who shared the post -->
//                 <div>
//                   <a class='fw-bold text-decoration-none text-dark' id='whichPerson'>Name</a> and <a
//                     class='fw-bold text-decoration-none text-dark' id='whichAnimal'>Name</a> shared a post together
//                 </div>
//                 <hr>
//                 <!-- Who shared the post end -->
//                 <!-- Profile Images, Time, Location Div -->
//                 <div class='row mb-3'>
//                   <!-- profile images -->
//                   <div class='col-3'>
//                     <div class='row'>
//                       <a id='postee' class='col-6'>
//                         <img style='object-fit:cover;' class='rounded-circle shadow-1-strong' width='70' height='70'
//                           src='images/sample.png'>
//                       </a>
//                       <a id='animal' class='col-6'>
//                         <img style='object-fit:cover;' class='rounded-circle shadow-1-strong' width='70' height='70'
//                           src='images/sample.png'>
//                       </a>
//                     </div>
//                   </div>
//                   <!-- profile images end -->
//                   <!-- time, location -->
//                   <div class='col-9 text-end'>
//                     <span class='d-block'>Time : `+postedOn+`</span>
//                     <span class='d-block mt-3'>Location</span>
//                   </div>
//                   <!-- time, location end -->
//                 </div>
//                 <!-- Profile Images, Time, Location Div End-->
//                 <!-- Image -->
//                 <img class="card-img-top rounded2 shadow" style='max-height:500px; object-fit:cover' src="`+firstPhotoUrl+`" alt="Card image cap">
//                 <!-- Image end -->
//                 <div class="card-body">
//                   <!-- caption -->
//                   <p class="card-text" id='caption'>`+postText+`</p>
//                   <!-- caption end-->
//                   <!-- number of likes -->
//                   <p class='fw-bold my-auto' id='numLikes'>15 Likes</p>
//                   <!-- number of likes end-->
//                   <hr>
//                   <!-- like, comment, share -->
//                   <div class='row d-flex mt-2'>
//                     <div class='col-4'>
//                       <a id="heart" onclick=fillHeart(this.id) id="like" style='width:200px' class='btn'><img
//                           class='float-start' width=32 height=32 src='icons/heart.svg'><span id="like"
//                           style='white-space:nowrap' class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Like</span></a>
//                     </div>
//                     <div class='col-4'>
//                       <a style='width:200px' class='btn'>
//                         <img class='float-start' width=32 height=32
//                           src='icons/chat-left.svg'><span id="like" style='white-space:nowrap'
//                           class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Comments</span></a>
//                     </div>
//                     <div class='col-4'>
//                       <a id="share" style='width:200px' class='btn'><img class='float-start' width=32 height=32
//                           src='icons/share.svg'><span id="like" style='white-space:nowrap'
//                           class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Share</span></a>
//                     </div>    
//                     <ul class='list-unstyled mt-3' id="commentList-`+postId+`">
//                     </ul>
//                   </div>
//                   <!-- like, comment, share end-->
                  
//                 </div>
                
//                 <!-- body end -->
//                 <!-- Comment field -->
//                 <div class="card-footer py-3 border-0 themebg">
//                   <div class="d-flex ">
//                     <img class="rounded-circle shadow-1-strong me-3 d-sm-flex d-none" src="images/sample.png" alt="avatar" width="40"
//                       height="40" />
//                     <div class=" w-100">
//                       <input type='text' class="form-control rounded1" id="commentField" rows="1" placeholder="Add Comment...">
//                     </div>      
//                     <button id=post-`+postId+` onClick='processComment(this)' type="button" class="btn ms-2"><img src='icons/symmetry-horizontal.svg' width=25></button>
//                   </div>
//                 </div>
//               </div>`
//               postFeedHTML = postFeedHTML + newCardHTML
//         }
//       }
//       cardList.innerHTML = postFeedHTML
//     }, (error) => {
//       console.log(error);
//       output = error

//     });
// }


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
  window.location.href = "/screens/welcomeScreen/login.html";
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
        for(let pet of response.data){
          petBreed = pet.breed
          petName = pet.petName;
          petImage = pet.petPictureUrl
          petLocation = pet.lastSeenLocation
          distanceFromPet = getDistanceFromLatLonInKm(currentLocation['latitude'], petLocation['longitude'], petLocation['latitude'], currentLocation['longitude'])
          distanceFromPet=Math.round(distanceFromPet * 100) / 100
          console.log(distanceFromPet)
          if(!isNaN(distanceFromPet)){
              pet_arr = [distanceFromPet,petName, petBreed ,petImage]
              all_pets_arr.push(pet_arr)
          } 
        }
        //sort array by distance
        all_pets_arr.sort((a,b) => a[0] - b[0])
        document.getElementById('petsDiv').innerHTML +=`
        <div id='addPetDiv' class='mx-4 mx-xl-0 mb-xl-3 mt-4 mt-xl-0'>
          <a href="/screens/petprofile/netPetForm.html" class='justify-content-center my-auto d-xl-flex d-block text-decoration-none text-dark'>
            <div id='addPetIcon' class="img_cont2 rounded-circle ms-3 ms-xl-1">
              <img src="icons/plus-circle.svg" class="rounded-circle user_img2">
            </div>
            <div class=' fw-bold  ms-xl-2'>
              Add Pet
            </div>
          </a>
        </div>`
        console.log(all_pets_arr)
        for(arr of all_pets_arr){
          
          petLocation = arr[0]
          petLocation = petLocation.toFixed(0) + 'km away'
          petName = arr[1]
          petBreed = arr[2]
          petImage = arr[3]
          document.getElementById('petsDiv').innerHTML += `
        <div class='row-cols-xl-3' style='white-space:nowrap'>
          <div class='d-xl-flex d-block'>
            <span class='d-xl-none ms-3 fw-bold'>`+petName+`</span>
            <div class="img_cont ms-3 ms-xl-0 mb-xl-0 rounded-circle shadow">
              <img src="`+petImage+`" class="rounded-circle user_img">
            </div>
            <span class='d-xl-none ms-2 ms-xl-0' style='font-size: 15px;'>`+petLocation+`</span>
            <div class='ms-3 text-start my-auto'>
              <p class='d-xl-flex d-none mt-2 fw-bold'>`+petName+`</p>
              <p class='d-xl-flex d-none mt-2'>Breed</p>
            </div>
            <div class='ms-3 my-auto'>
              <p class='d-xl-flex d-none mt-2'>`+petLocation+`</p>
            </div>
          </div>   
        </div>
          `
           
        }
       
        // <div class="font-monospace text-center  mx-2 my-3 py-2 bg-white border rounded-2">Nearby Pet 2</div>
          
      }, 
      (error) => {
          console.log(error);
          output = error
          
      });}

