profileHTML = `<a class="dropdown-item  hover-color3" href="/screens/user_profile.html?userid=` + window.sessionStorage.userID + `">My Profile</a>`
document.getElementById("profile").innerHTML = profileHTML

//get petID from url
// console.log(window.location.href)
var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var petID = parseInt(url.searchParams.get("petID"));
//get petID from url
// console.log("Pet loaded ", petID);
getPetByID(petID);
//run getpetID

function loadGoogleMaps(petLati, petLong) {
    //getting Userlocation from session
    // console.log(currentLocation)
    userLati = currentLocation.latitude
    userLong = currentLocation.longitude
    if (currentLocation != 'no location') {
        locationHTML = `<iframe width="100%" height="100%" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCJAU__BCNUmAKMUZCGIko6cbRPgodlkRU&origin=` + userLati + `,` + userLong + `&destination=` + petLati + `,` + petLong + `&mode=walking&maptype=roadmap&zoom=15"></iframe>`
    } else {
        locationHTML = `
                <div id="location">
                    <span id="location-msg" style="color: white">Please turn on your location services and refresh this page</span>
                </div>`
    }
    document.getElementById('locationbox').innerHTML = locationHTML
}

function getAddress(lati, long) {
    url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + lati + "%2C" + long + "&lang=en-US&apikey=1f5cJ82OkUvyuWK4_er_fJRfdH6YMfTxx5KdPmZ1Pyw"
    axios.get(url)
        .then((response) => {
            // console.log(response)
            address = response.data.items[0].title
            document.getElementById("lastseenaddress").innerText = address
        })
}
petData = null
clickedFeederData = {}
function getPetByID(petID) {
    // userID= toString(userID)
    tableName = "petProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + "/data/" + petID + ".json"
    output = null
    // console.log(url)
    axios.get(url)
        .then((response) => {
            output = response.data
            petData = response.data // global var
            // console.log(output)
            petName = output.petName;
            // console.log("pet page for: ", petName);
            // document.getElementById('profilename').innerText = user_name;
            document.title = "Pet Page - " + petName
            petPictureUrl = output.petPictureUrl;
            breed = output.breed;
            foundedDate = output.foundedDate;
            founder = output.founderName;
            pet_gender = output.gender;
            latitude = output.lastSeenLocation.latitude;
            longitude = output.lastSeenLocation.longitude;
            loadGoogleMaps(latitude,longitude)   //disabled to safe api calls
            getAddress(latitude,longitude)
            details1 = output.profileDetails.detailTitle1;
            details2 = output.profileDetails.detailTitle2;
            // var detailstr = 'No extra details for this pet yet'
            if (details1 == '' || details1 == null || details1=='null') {
                // detailstr = `No extra details for this pet yet`;
                document.getElementById('details').innerHTML = ``
            }
            else{
                document.getElementById('details').innerHTML = 
                `<b>More details: </b>` + details1
                // detailstr = details1
            }
            
            arr = foundedDate.split(',')
            string = arr[0] + ", " + arr[1]

            // document.getElementById('moredetails').innerHTML = detailstr;
            // document.getElementById('founded').innerHTML = '<span class="row"><b class="col-6 text-center mr-0 pr-0">Founded on: </b><span class="col-6" >' + string + `</span></span>`;
            document.getElementById('founded').innerHTML = '<span class="row"><span class="col-12 text-center"><b>Founded on: </b>&nbsp&nbsp&nbsp&nbsp' + string + '</span></span>'
            document.getElementById('founder').innerHTML = '<span class="row"><b class="col-6 text-end">Founder: </b><span class="col-6">' + founder + `</span></span>`;
            document.getElementById('petName').innerText = petName;
            document.getElementById('gender').innerHTML = '<span class="row"><b class="col-6 text-end">Gender: </b><span class="col-6">' + pet_gender + `</span></span>`;
            document.getElementById('petimg').src = petPictureUrl;
            document.getElementById('breed').innerHTML = '<span class="row"><b class="col-6 text-end">Breed: </b><span class="col-6">' + breed + `</span></span>`;
            //document.getElementById('lastseenaddress').innerText=lastSeenLocation;
            document.getElementById('feederapply').innerHTML = `<b>Mark ${petName} as fed</b>`;

            //Adding Past Feeders
            if (output.feeders == undefined) {

            } else {
                console.log("feeders")
                feeders = output.feeders.reverse()
                if (feeders.length > 3) {
                    feeders = feeders.slice(0, 3)
                }

                console.log(feeders)
                feederHtml = ''

                for (feeder of feeders) {
                    feedDate = feeder.feedDate
                    feedTime = feeder.feedTime
                    feederID = feeder.feederID
                    feederImg = feeder.feederImg
                    feederName = feeder.feederName
                    clickedFeederData[feederID] = [feedDate, feedTime, feederName, feederImg]
                    button = `<span><button onclick='reloadFeederModal("` + feederID + `")' class='btn btn-sm btn-outline-secondary rounded ms-lg-3 d-flex hover-color' data-bs-toggle="modal"
                            data-bs-target="#viewFeederDetails""><span style='color:blue'>View Image</span>
                        </button></span>`
                    htmlRow = `<li class='fsResponsive'>${feederName} at ${feedTime} ${feedDate} ${button}</li>`
                    feederHtml += htmlRow
                }
                document.getElementById('feederinfo').innerHTML = 
                `<b>Past Feeders: </b><br>` + feederHtml

            }

        },
            (error) => {
                console.log(error);
                output = error

            });
}

function reloadFeederModal(feederID) {
    console.log(clickedFeederData[feederID])
    document.getElementById('feederName').innerText = "Fed By : " + clickedFeederData[feederID][2]
    document.getElementById('feederIMG').src = clickedFeederData[feederID][3]
    feedDesc = "Fed At : " + clickedFeederData[feederID][1] + ' ' + clickedFeederData[feederID][0]
    document.getElementById('feederTime').innerText = feedDesc


}

//reverse latitude and longtitude to address
function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            // console.log(results);
            var address = (results[0].formatted_address);
        }
    });
}


allPostIdPictureToUpdate = []
allPostId = []
oldData = ""
allPostData = ""

currentLocation = "no location";
oldData = "";
allPostData = "";
newcomment = true;
allPostIdPictureToUpdate = []
allPostId = []
oldData = ""
allPostData = ""

function get_pet_post_by_id(petID) {
    console.log('retrieving posts.....')
    allPostId = []
    // allPostIdPictureToUpdate = []
    var postcount = 0;
    allDateTimeOfPost = []
    tableName = "post"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    postFeedHTML = ""
    url = firebaseurl + tableName + ".json"
    cardList = document.getElementById('card-list')
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    axios.get(url)
        .then((response) => {
            allPostData = response.data.data
            // console.log(response.data.data)
            allPostData.reverse()
            for (postData of allPostData) {
                if (postData.tagged == petID) {
                    postcount += 1
                    userPicture = '/images/sample.png'
                    // console.log(postData)
                    type = postData.postType
                    postText = postData.postText
                    postedByID = postData.postedBy
                    postedOn = postData.postedOn
                    postedOnTime = postData.postedOnTime
                    dateTimeText = postedOn + " " + postedOnTime
                    allDateTimeOfPost.push(dateTimeText)
                    // document.getElementById('lastseentime').innerText = dateTimeText
                    document.getElementById('lastseentimemsg').style.display = 'none'
                    postedAtLocation = postData.postedAt
                    nameOfPoseter = postData.nameOfPoseter
                    nameOfTagged = postData.nameOfTagged
                    taggedPetID = postData.tagged
                    distanceFromPost = getDistanceFromLatLonInKm(currentLocation['latitude'], postedAtLocation['longitude'], postedAtLocation['latitude'], currentLocation['longitude'])
                    distanceFromPost = Math.round(distanceFromPost * 100) / 100
                    if (distanceFromPost == 0) {
                        distanceFromPost = "Nearby < 0.1km"
                    } else if (isNaN(distanceFromPost)) { distanceFromPost = "No location" }
                    else {
                        distanceFromPost = distanceFromPost + "km away"
                    }
                    postId = postData.postID
                    postComments(postId)
                    allPostIdPictureToUpdate.push([postId, postedByID, taggedPetID])

                    posterURL = "/screens/user_profile.html?userid=" + postedByID

                    //check if tagged is human or pet
                    if (nameOfTagged == undefined) {
                        titleHtml = `<h5 class='overflow-hidden'><a class='fw-bold text-decoration-none text-dark' href='` + posterURL + `' id='whichPerson'>` + nameOfPoseter + `</a>'s post</h5>`
                        profilePictureHTML = `<div class='row' id='profilePicturesOfPost'>
                                <a id='postee' class='col-6'>
                                <img id="postPicture-`+ postId + `" style='object-fit:cover;' class='rounded-circle shadow-1-strong ' width='70' height='70'
                                    src='/images/sample.png'>
                                </a>
                            </div>`
                    } else {
                        taggedURL = "/screens/petprofile.html?petID=" + taggedPetID
                        titleHtml = `<h5 class='overflow-hidden'><a class='fw-bold text-decoration-none text-dark' href='` + posterURL + `' id='whichPerson'>` + nameOfPoseter + `</a>'s post with <a
                            class='fw-bold text-decoration-none text-dark' id='whichAnimal' href='`+ taggedURL + `'>` + nameOfTagged + `</a></h5>`
                        profilePictureHTML = `<div class='row' id='profilePicturesOfPost'>
                                <a id='postee' class='col-6'>
                                <img id="postPicture-`+ postId + `" style='object-fit:cover;' class='rounded-circle shadow-1-strong ' width='70' height='70'
                                src='/images/male_empty.png'>
                                </a>
                                <a id='animal' class='col-6'>
                                <img id="postTagPicture-`+ postId + `" style='object-fit:cover;' class='rounded-circle shadow-1-strong' width='70' height='70'
                                    src='/images/male_empty.png'>
                                </a>
                            </div>`
                    }
                    if (type == "photo") {
                        firstPhotoUrl = postData.photoUrl[0]
                        newCardHTML = `<div style="max-width:800px;" id="postid-` + postId + `" class="card shadow border border-0 themebg font-monospace overflow-hidden rounded2 py-3 px-md-5 px-sm-4 px-3 mt-xl-4 mt-sm-3 mt-3 mx-auto mb-4">
                <!-- Who shared the post -->
                <div>
                `+ titleHtml + ` 
                </div>
                <hr>
                <!-- Who shared the post end -->
                <!-- Profile Images, Time, Location Div -->
                <div class='row mb-3'>
                    <!-- profile images -->
                    <div class='col-6 col-sm-3'>
                        `+ profilePictureHTML + `
                    </div>
                    <!-- profile images end -->
                    <!-- time, location -->
                    <div class='col-6 col-sm-9 text-end'>
                    <span class='d-block'><b>`+ postedOn + `</b></span>
                    <span class='d-block mt-3'>`+ distanceFromPost + `</span>
                    </div>
                    <!-- time, location end -->
                </div>
                <!-- Profile Images, Time, Location Div End-->
                <!-- Image -->
                <img class="card-img-top rounded2 shadow hover-zoom-img" style='max-height:500px; object-fit:cover' src="`+ firstPhotoUrl + `" alt="Card image cap">
                <!-- Image end -->
                <div class="card-body overflow-visible">
                    <!-- caption -->
                    <p class="card-text" id='caption'>`+ postText + `</p>
                    <!-- caption end-->
                    <!-- number of likes -->
                    <div class='popover__wrapper overflow-visible'>
                    <a class='text-decoration-none text-dark fw-bold' id='numLikes-`+ postId + `'></a>
                    <div class="popover__content">
                        <p class="popover__message" id="popLikes-`+ postId + `"></p>
                    </div>
                    </div>
                    <hr '>
                    <!-- number of likes end-->
                    <!-- like, comment, share -->
                    <div class='row d-flex mt-2'>
                    <div class='col-4'>
                        <a id="heart-`+ postId + `" onclick=fillHeart(this.id) style='width:200px' class='btn'><img 
                        class='float-start' width=32 height=32 src='/images/icons/heart.svg'><span id="like-`+ postId + `"
                            style='white-space:nowrap' class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Like</span></a>
                    </div>
                    <div class='col-4'>
                        <a id='commentButton-`+ postId + `' onClick='focusInput(this)' style='width:200px' class='btn'>
                        <img class='float-start' width=32 height=32
                            src='/images/icons/chat-left.svg'><span style='white-space:nowrap'
                            class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Comment</span></a>
                    </div>
                    <div class='col-4'>
                        <a id="share" onclick='copy("`+ postId + `")' style='width:200px' class='btn'><img class='float-start' width=32 height=32
                            src='/images/icons/share.svg'><span  style='white-space:nowrap'
                            class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Share</span></a>
                    </div> 
                    </ul>
                    </div>
                    <hr class='d-none d-sm-flex'>   
                    <div id='sharableLink-`+ postId + `' class='fw-bold' style='text-align:center;display:none'>
                    Shareable link copied to clipboard
                    </div>   
                        <div id="commentList-`+ postId + `">
                        </div> 
                    
                    
                    <!-- like, comment, share end-->
                </div>
                <!-- body end -->
                <!-- Comment field -->
                <div class="card-footer py-sm-3 py-0 border-0 themebg">
                    <div class="d-flex ">
                   
                    <div class=" w-100">
                        <input type='text' onkeypress='onEnter(this, event)' class="form-control rounded1" id="commentField-`+ postId + `" rows="1" placeholder="Add Comment...">
                    </div>      
                    <button id=post-`+ postId + `  onClick='processComment(this)' type="button" class="hover-zoom btn ms-2"><img src='/images/icons/symmetry-horizontal.svg' width=25></button>
                    </div>
                </div>
                </div>`
                        postFeedHTML = postFeedHTML + newCardHTML
                        getLikesToUpdateHTML(postId)
                        if (newcomment == true) {
                            postComments(postId)
                        }
                        // console.log(postFeedHTML)

                    } else if (type == "text") {
                        newCardHTML = `<div style="max-width:800px;" id="postid-` + postId + `" class="card shadow border border-0 themebg overflow-hidden font-monospace rounded2 py-3 px-md-5 px-sm-4 px-3 mt-xl-4 mt-sm-3 mt-3 mx-auto mb-4">
                <!-- Who shared the post -->
                <div>
                    `+ titleHtml + ` 
                </div>
                <hr>
                <!-- Who shared the post end -->
                <!-- Profile Images, Time, Location Div -->
                <div class='row mb-3'>
                    <!-- profile images -->
                    <div class='col-6 col-sm-3'>
                        `+ profilePictureHTML + `
                    </div>
                    <!-- profile images end -->
                    <!-- time, location -->
                    <div class='col-6 col-sm-9 text-end'>
                    <span class='d-block'><b>`+ postedOn + `</b></span>
                    <span class='d-block mt-3'>`+ distanceFromPost + `</span>
                    </div>
                    <!-- time, location end -->
                </div>
                <!-- Profile Images, Time, Location Div End-->
                <div class="card-body overflow-visible">
                    <!-- caption -->
                    <p class="card-text" id='caption'>`+ postText + `</p>
                    <!-- caption end-->
                
                    <!-- number of likes end-->
                    <div class='popover__wrapper overflow-visible'>
                    <a class='text-decoration-none text-dark fw-bold' id='numLikes-`+ postId + `'></a>
                    <div class="popover__content">
                        <p class="popover__message" id="popLikes-`+ postId + `"></p>
                    </div>
                    </div>
                    <hr>
                    <!-- number of likes end-->
                    <!-- like, comment, share -->
                    <div class='row d-flex mt-2'>
                    <div class='col-4'>
                        <a id="heart-`+ postId + `" onclick=fillHeart(this.id) style='width:200px' class='btn'><img 
                        class='float-start' width=32 height=32 src='/images/icons/heart.svg'><span id="like-`+ postId + `"
                            style='white-space:nowrap' class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Like</span></a>
                    </div>
                    <div class='col-4'>
                        <a id='commentButton-`+ postId + `' onClick='focusInput(this)' style='width:200px' class='btn'>
                        <img class='float-start' width=32 height=32
                            src='/images/icons/chat-left.svg'><span style='white-space:nowrap'
                            class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Comment</span></a>
                    </div>
                    <div class='col-4'>
                        <a id="share" onclick='copy("`+ postId + `")' style='width:200px' class='btn'><img class='float-start' width=32 height=32
                            src='/images/icons/share.svg'><span  style='white-space:nowrap'
                            class="font-monospace ms-2 float-start mt-1 d-none d-sm-inline">Share</span></a>
                    </div> 
                    </ul>
                    </div>
                    <hr class='d-none d-sm-flex'>   
                    <div id='sharableLink-`+ postId + `' class='fw-bold' style='text-align:center;display:none'>
                    Shareable link copied to clipboard
                    </div>   
                        <div id="commentList-`+ postId + `">
                        </div> 
                        
                        
                        <!-- like, comment, share end-->
                    </div>
                    <!-- body end -->
                    <!-- Comment field -->
                    <div class="card-footer py-sm-3 py-0 border-0 themebg">
                        <div class="d-flex ">
                       
                        <div class=" w-100">
                            <input type='text' onkeypress='onEnter(this, event)' class="form-control rounded1" id="commentField-`+ postId + `" rows="1" placeholder="Add Comment...">
                        </div>      
                        <button id=post-`+ postId + ` onClick='processComment(this)' type="button" class="hover-zoom btn ms-2"><img src='/images/icons/symmetry-horizontal.svg' width=25></button>
                        </div>
                    </div>
                    </div>`
                        postFeedHTML = postFeedHTML + newCardHTML
                        //   console.log(postFeedHTML)

                    }
                    getLikesToUpdateHTML(postId)
                    if (newcomment == true) {
                        postComments(postId)
                    }

                }
                // console.log(postFeedHTML)

            }

            document.getElementById('post-list').innerHTML = postFeedHTML
            // document.getElementById('postcount').innerHTML = `<h1>${postcount} Posts</h1>`
            document.getElementById('postcount').innerHTML = ``
            newcomment = false
            if (allPostData.length == oldData.length) {
                console.log('no changes')
            } else {
                console.log("change detected reloading posts")
                document.getElementById('post-list').innerHTML = postFeedHTML
                oldData = allPostData

                allDateTimeOfPost.push(dateTimeText)

                document.getElementById('lastseentime').innerText = allDateTimeOfPost[0]
                for (update of allPostIdPictureToUpdate) {
                    console.log(update)
                    postID = update[0]
                    posterID = update[1]
                    taggedID = update[2]
                    updatePosterPicture(posterID, postID)
                    if (taggedID != undefined) {
                        updatTaggedPicture(taggedID, postID)
                    }
                }
            }
        }, (error) => {
            console.log(error);
            output = error

        });
}

function showpetfollowing() {

    var htmlstr = ``;
    var followercount = 0;
    console.log('get following list function is running');
    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json";
    // cardList = document.getElementById('card-list');
    axios.get(url)
        .then((response) => {
            allprofiles = response.data.data;
            // console.log("all profiles here: ", allprofiles);
            // console.log("num profiles: ", allprofiles.length);
            for (var i = 1; i < allprofiles.length; i++) {
                // console.log('innerloop running')
                profile = allprofiles[i]
                // console.log(allprofiles[i].name)
                if (profile.profileDetails == undefined || profile.profileDetails.followingPet == undefined) {
                    //Create followinguders in profiledetails with changes made to following user
                    // console.log('user not following any pet')
                }
                else if (profile.profileDetails.followingPet.includes(petID)) {
                    followercount += 1
                    user_name = profile.name;
                    user_id = profile.userID
                    var user_img = 'img/blank-background.jpeg';
                    // console.log(user_name, " is following.")
                    if (profile.profilePictureUrl != undefined) {
                        user_img = profile.profilePictureUrl;
                    }
                    htmlstr += `<div class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mb-3">
                    <div class="card rounded2">
                      <img src="${user_img}" class="card-img-top heightResponsive" alt="profileimage" style='width:100%;object-fit:cover;'>
                      <div class="card-body">
                        <h5 class="card-title fsResponsive text-center overflow-hidden">${user_name}</h5>
                        <a href="/screens/user_profile.html?userid=${user_id}" class="stretched-link"></a>
                      </div>
                    </div>
                  </div>`}
            }

            document.getElementById('followers-tab').innerHTML = `Followers <span class="badge" style="background-color: #7A6563">${followercount}</span>`;
            document.getElementById('followerslist').innerHTML = htmlstr;



        }, (error) => {
            console.log(error);
        });

}

function showpetphotos(petID) {
    var pg = document.getElementById("photogallery");
    /*var msnry = new Masonry(pg, {
        // options
        percentPosition: true
    });*/
    var htmlstr = ``;
    var photocount = 0;
    console.log('show pet photos function is running');
    tableName = "post"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json";
    axios.get(url)
        .then((response) => {
            allPostData = response.data.data
            //console.log(response.data.data)
            allPostData.reverse()
            for (postData of allPostData) {
                console.log('single post data: ', postData)
                console.log('tag: ', postData.tagged == petID)
                console.log('phototrue: ', postData.type == "photo")
                if (postData.tagged == petID && postData.postType == "photo") {
                    photocount += 1
                    //console.log(postData)
                    firstPhotoUrl = postData.photoUrl[0]
                    var coldiv = document.createElement("div");
                    coldiv.setAttribute("class", "col-sm-6 col-lg-4 mb-4");
                    var cardiv = document.createElement("div");
                    cardiv.setAttribute("class", "card")
                    const cardimage = document.createElement('img');
                    cardimage.src = firstPhotoUrl;
                    cardimage.setAttribute("class", "card-img");
                    cardiv.appendChild(cardimage);
                    coldiv.appendChild(cardiv);
                    pg.appendChild(coldiv);
                    //msnry.appended(coldiv);

                }
            }

            document.getElementById('photos-tab').innerHTML = `Photos <span class="badge" style="background-color: #7A6563">${photocount}</span>`;
            //document.getElementById('photogallery').innerHTML = htmlstr;
            gallery = document.getElementById("photogallery");
            console.log('gallery: ', gallery);
            return gallery





        }, (error) => {
            console.log(error);
        });

}

function createMasonry(galleryid) {
    var msnry = new Masonry(galleryid, {
        percentPosition: true,
    });

}



function followandunfollow() {

    let follow_action = document.getElementById('follow_or_unfollow').innerText;


    let my_user_id = parseInt(myStorage.userID);

    console.log('current UserID: ', my_user_id);

    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json";
    axios.get(url)
        .then((response) => {
            allprofiles = response.data.data;
            my_details = allprofiles[my_user_id];
            //user_details = allprofiles[the_user]

            console.log('my details ', my_details.profileDetails);
            //console.log(user_details.ProfileDetails)
            let url2 = firebaseurl + tableName + "/data/" + my_user_id + '/profileDetails/' + ".json";

            //followedByUsers = my_details.ProfileDetails.followedByUsers;

            if (follow_action == "Follow") {
                let followingPet = [];
                //let followedByUsers = [];
                // ME

                if (my_details.profileDetails == undefined || my_details.profileDetails.followingPet == undefined) {
                    //Create followingPet in profiledetails with changes made to following pet
                    followingPet = [petID];
                }
                else {
                    //add user into your following user list
                    my_details.profileDetails.followingPet.push(petID);
                    followingPet = my_details.profileDetails.followingPet
                }

                if (my_details.profileDetails == undefined || (my_details.profileDetails.followingUsers == undefined && my_details.profileDetails.followedByUsers == undefined)) {
                    axios.put(url2, {
                        "followingUsers": null,
                        "followedByUsers": null,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Updated my followingpet successfully");
                        })
                }
                else if (my_details.profileDetails.followingUsers == undefined) {
                    followedByUsers = my_details.profileDetails.followedByUsers;
                    axios.put(url2, {
                        "followingUsers": null,
                        "followedByUsers": followedByUsers,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Updated my followingpet successfully");
                        })
                }
                else if (my_details.profileDetails.followedByUsers == undefined) {
                    followingByUsers = my_details.profileDetails.followingUsers;
                    axios.put(url2, {
                        "followingUsers": followingByUsers,
                        "followedByUsers": null,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Updated my followingpet successfully");
                        })
                }

                else {
                    followingUsers = my_details.profileDetails.followingUsers;
                    followedByUsers = my_details.profileDetails.followedByUsers;
                    axios.put(url2, {
                        "followingUsers": followingUsers,
                        "followedByUsers": followedByUsers,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Updated my following pet successfully");
                        })
                }

                document.getElementById('follow_or_unfollow').innerHTML = `<i class="fa fa-user"></i> Following`;
                // document.getElementById('follow_or_unfollow').innerText = "Following"
                document.getElementById('follow_or_unfollow').style.backgroundColor = "#E37383";
                // document.getElementById('follow_or_unfollow').style.border = "0";
                document.getElementById('follow_or_unfollow').style.color = "white";
            }


            if (follow_action.trim() == "Following") {
                console.log(follow_action);
                //let followingUsers = my_details.ProfileDetails.followingUsers;
                //let followedByUsers = user_details.ProfileDetails.followedByUsers;
                // ME
                //remove pet from your following pet list
                followingPet = my_details.profileDetails.followingPet;
                const my_index = my_details.profileDetails.followingPet.indexOf(petID);
                if (my_index > -1) {
                    followingPet.splice(my_index, 1);

                }

                if (my_details.profileDetails == undefined || (my_details.profileDetails.followingUsers == undefined && my_details.profileDetails.followedByUsers == undefined)) {
                    axios.put(url2, {
                        "followingUsers": null,
                        "followedByUsers": null,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Removed pet from my following pet successfully");
                        })
                }
                else if (my_details.profileDetails.followingUsers == undefined) {
                    followedByUsers = my_details.profileDetails.followedByUsers;
                    axios.put(url2, {
                        "followingUsers": null,
                        "followedByUsers": followedByUsers,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Removed pet from my following pet successfully");
                        })
                }
                else if (my_details.profileDetails.followedByUsers == undefined) {
                    followingByUsers = my_details.profileDetails.followingUsers;
                    axios.put(url2, {
                        "followingUsers": followingByUsers,
                        "followedByUsers": null,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Removed pet from my following pet successfully");
                        })
                }

                else {
                    followingUsers = my_details.profileDetails.followingUsers;
                    followedByUsers = my_details.profileDetails.followedByUsers;
                    axios.put(url2, {
                        "followingUsers": followingUsers,
                        "followedByUsers": followedByUsers,
                        "followingPet": followingPet
                    })
                        .then(function (response) {
                            console.log("Removed pet from my following pet successfully");
                        })
                }

                document.getElementById('follow_or_unfollow').innerHTML = `Follow`;
                document.getElementById('follow_or_unfollow').style.backgroundColor = "";

            }


        })
}

function get_user_details(petid, me) {
    console.log('get user detail function is running');
    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json";
    // cardList = document.getElementById('card-list');
    axios.get(url)
        .then((response) => {
            allprofiles = response.data.data
            me_details = allprofiles[me]
            // followings = me_details.ProfileDetails['followingUsers']
            // console.log(followings);
            if (me_details.profileDetails == undefined || me_details.profileDetails.followingPet == undefined) {
                //Create followinguders in profiledetails with changes made to following user
                document.getElementById('follow_or_unfollow').innerHTML = `<i class="fa fa-user"></i> Follow`;
            }
            else {
                followings = me_details.profileDetails.followingPet;
                console.log('Your followings: ', followings);
                if (followings.includes(parseInt(petID))) {
                    document.getElementById('follow_or_unfollow').innerHTML = `<i class="fa fa-user"></i> Following`;
                    // document.getElementById('follow_or_unfollow').innerText = "Following"
                    document.getElementById('follow_or_unfollow').style.backgroundColor = "#E37383";
                    document.getElementById('follow_or_unfollow').style.color = "white";

                }

            }


        }, (error) => {
            console.log(error);
        });

}

function onboarding() {
    console.log('running onboarding function')
    // start session manager
    myStorage = window.sessionStorage;
    if (myStorage.userID === undefined) {
        console.log("Not login")
        // console.log(myStorage)
        myStorage.redirect = 'fromLoginNoAccount'
        window.location.href = "/screens/login.html";
    } else {
        console.log("Login")
        // console.log(myStorage)
        my_user_id = myStorage.userID
    }

    // start profile identification
    //const queryString = window.location.search;
    // console.log(queryString.split("?")[1].split("=")[1])

    // console.log(queryString);
    //userid = queryString.split("?")[1].split("=")[1]
    //console.log(typeof (userid))
    console.log('Your user ID: ', my_user_id);

    get_user_details(petID, my_user_id);

    showpetfollowing();
    get_pet_post_by_id(petID);

    //document.getElementById('follow_or_unfollow').style.display = 'block'
    //get_user_post_by_id(userid)
}
var gallery = showpetphotos(petID);
//Mark Pet As Fed
//Timeout to wait for async request to complete
setTimeout(function () {
    console.log(petData)
    // console.log(my_user_id)
    document.getElementById('feederFormBody').innerHTML += `
    <h5 class='overflow-hidden'>To mark ${petData.petName} as fed, you need to first upload an image as proof.</h5><hr>
    <h5 class='overflow-hidden'>Please ensure that your image includes:</h5>
    <ul>
        <li class='fs-6'>Yourself</li>
        <li  class='fs-6'>Pet consuming the food</li>
    </ul>
    <button type="button" class="btn themebg hover-color2 rounded2 mb-1"> <label id='uploadFeederImageLabel'
    for="feederImg">Upload an Image</label></button>
    <input type="file" class="button button-secondary m-2" style="display:none" id="feederImg"
        accept="image/png, image/jpeg, image/heic" name="file" multiple onchange="loadFeederImageDisplay(event)">
    </div>
    <div class='ml-3'>
        <img id="feederImgOutput" class="card-img-top rounded2 shadow" style='max-height:500px; object-fit:cover'>
    </div>
    `
    // console.log(petData.feeders)
    if (petData.feeders == undefined) {
        document.getElementById('lastFed').innerHTML = `<span class="fs-4" >Be the first to feed ${petData.petName}!</span>`
        document.getElementById('recommendedFeeding').innerText = `No Feeding Data Yet`
    }
    else {

        lastFedTime = petData.feeders[0].feedTime
        lastFedPerson = petData.feeders[0].feederName
        document.getElementById('lastFed').innerHTML = `<b>Last Fed: </b><span>${lastFedTime} by ${lastFedPerson}</span>`
        lastFedTime24 = petData.feeders[0].feedTime24

        lastFedDate = petData.feeders[0].feedDate + ' ' + lastFedTime24
        now = new Date()
        var diff = Math.abs(new Date(now) - new Date(lastFedDate));
        seconds = diff / 1000
        seconds = seconds.toFixed(0)
        minutes = seconds / 60
        minutes = minutes.toFixed(0)
        hours = minutes / 60
        hours = hours.toFixed(0)
        days = hours / 24
        days = days.toFixed(0)
        document.getElementById('lastFed').innerHTML = 'Last Fed: ' + lastFedTime + ' by ' + lastFedPerson
        if (seconds < 60) {
            document.getElementById('recommendedFeeding').innerText = `Fed ${seconds} seconds ago`
        }
        else if (seconds < 3600) {
            if (minutes == 1) {
                document.getElementById('recommendedFeeding').innerText = `Fed ${minutes} minute ago`
            }
            else {
                document.getElementById('recommendedFeeding').innerText = `Fed ${minutes} minutes ago`
            }

        }
        else if (seconds < 86400) {
            if (hours == 1) {
                document.getElementById('recommendedFeeding').innerText = `Fed ${hours} hour ago`
            }
            else {
                document.getElementById('recommendedFeeding').innerText = `Fed ${hours} hours ago`
            }
        }
        else if (seconds < 2678400) {
            if (days == 1) {
                document.getElementById('recommendedFeeding').innerText = `Fed ${days} day ago`
            }
            else {
                document.getElementById('recommendedFeeding').innerText = `Fed ${days} days ago`
            }
        }
        else if (seconds < 31536000) {
            months = days / 30.416667
            months = months.toFixed(0)
            if (months == 1) {
                document.getElementById('recommendedFeeding').innerText = `Fed ${months} month ago`
            }
            else {
                document.getElementById('recommendedFeeding').innerText = `Fed ${months} months ago`
            }
        }
        else if (seconds >= 31536000) {
            years = days / 30.416667 / 12
            years = years.toFixed(0)
            if (years == 1) {
                document.getElementById('recommendedFeeding').innerText = `Fed ${years} year ago`
            }
            else {
                document.getElementById('recommendedFeeding').innerText = `Fed ${years} years ago`
            }
        }




    }

}, 1000)
function feedingProof(ele) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    minutes = today.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    seconds = today.getSeconds()
    if (seconds < 10) {
        seconds = '0' + seconds
    }


    var time24 = today.getHours() + ":" + minutes + ":" + seconds;
    var H = today.getHours()
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    time = h + ':' + today.getMinutes() + ampm;

    const ref = firebase.storage().ref()
    const file = document.getElementById("feederImg").files[0]
    if (file == undefined) {
        document.getElementById('feederInfoComplete').innerText = 'Please upload an image of proof'
        return
    }
    photoName = petID + "-" + time24 + "-" + file.name
    const metadata = {
        contentType: file.type
    }
    // need to add function to get tag name ID after tagName
    taskUpload = ref.child("feederProof/" + photoName).put(file, metadata)

    taskUpload
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            // console.log(url)
            tableName = "petProfile"
            firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
            petUrl = firebaseurl + tableName + "/data/" + petID + ".json"
            output = null
            input = [{ 'feederImg': url, 'feedTime': time, 'feedTime24': time24, 'feedDate': date, 'feederID': my_user_id, 'feederName': myStorage.userName }]

            if (petData.feeders == undefined) {
                petData.feeders = input
            }
            else {
                petData.feeders.push(input[0])

            }
            axios.put(petUrl, {
                "petID": petData.petID,
                "petName": petData.petName,
                "petPictureUrl": petData.petPictureUrl,
                "breed": petData.breed,
                "foundedDate": petData.foundedDate,
                "founder": petData.founder,
                "founderName": petData.founderName,
                "gender": petData.gender,
                'feeders': petData.feeders,
                "profileDetails": petData.profileDetails,
                "lastSeenLocation": petData.lastSeenLocation,
            }).then((response) => {

                location.reload()

                console.log(response);
            });



        })
        .catch(error => {
            document.getElementById('feederInfoComplete').innerText = error
        })
    document.getElementById('feederInfoComplete').innerText = 'Adding Feeding Information to our database...'

}
function loadFeederImageDisplay(event) {
    var image = document.getElementById('feederImgOutput');
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('uploadFeederImageLabel').innerText = 'Change image'
    document.getElementById('feederInfoComplete').innerText = ''


}
console.log(myStorage.userName)

//Load pet photos

function processLoadImages() {
    var imgLoad = imagesLoaded(gallery);
    setTimeout(function () {
        imgLoad.on('always', createMasonry(gallery))
    }, 500)
    //setTimeout(function(){
    //imagesLoaded(gallery,createMasonry(gallery))
    //},1000)
}