// import axios from 'axios'

firebaseUrl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";

testUrl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/.json?print=pretty"

console.log('import functions from connector.js')

// just a test function not to be used in MVP
function getWholeDataBase() {
    console.log("running getWholeDataBase()")
    url = firebaseUrl + ".json?print=pretty"
    output = "asd"
    axios.get(url)
        .then((response) => {
            console.log(response);
            output = response
        }, (error) => {
            console.log(error);
            output = error

        });
    return output;
}

function createUserProfile(inputName, inputEmail, inputAge, inputGender, inputPassword) {
    tableName = "userProfile"
    // firebaseurl= "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    // tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            newUserID = response.data.data.length
            console.log(newUserID)
            // output = response
            url = firebaseurl + tableName + "/data/" + newUserID + ".json"
            console.log(url)
            axios.put(url, {
                "userID": newUserID,
                "name": inputName,
                "email": inputEmail,
                "password": inputPassword,
                "age": inputAge,
                "gender": inputGender,
                "profilePictureUrl": '/img/male_empty.png',
                "profileDetails": {
                    "followingUsers": null,
                    "followedByUsers": null,
                    "followingPet": null
                },
                "posts": null,
                "postsWithPhotos": null
            }).then((response) => {
                console.log(response)
                console.log("usercreated sucessfully")
                window.location.href = "/screens/welcomeScreen/login.html";
            });
        }, (error) => {
            console.log(error);
            output = error

        });
}


function getAllUsers() {
    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            console.log(response);
            output = response
        }, (error) => {
            console.log(error);
            output = error

        });
    return true;
}

function getUsersByID(userID) {
    // userID= toString(userID)
    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + "/data/" + userID + ".json"
    output = null
    console.log(url)
    axios.get(url)
        .then((response) => {
            output = response.data
            console.log(output)
        }, (error) => {
            console.log(error);
            output = error

        });
    return output;
}

function login(email, password) {
    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json"
    axios.get(url)
        .then((response) => {
            data = response.data.data
            // console.log(data)
            data = data.splice(1, data.length)
            checker = true
            email_check = true
            password_check = true
            for (row of data) {
                console.log(row)
                dataEmail = row.email
                dataPassword = row.password
                userId = row.userID
                userName = row.name
                if (dataPassword == password && dataEmail == email) {
                    checker = false
                    email_check = false
                    password_check = false
                    myStorage = window.sessionStorage;
                    sessionStorage.setItem('userID', userId);
                    sessionStorage.setItem('userName', userName);
                    console.log(myStorage)
                    window.location.href = "/screens/homeScreen/homeScreen.html";
                }
                else if (dataEmail == email && dataPassword != password) {
                    email_check = false;
                    break;
                }
                else if (dataEmail != email && dataPassword == password) {
                    password_check = false;
                }


            }
            if (checker) {
                let error = "";
                // document.getElementById('failedlogin-prompt').style.display = 'block'
                // console.log("email/password invalid")

                if (email_check == true && password_check == true) {
                    error = "Incorrect Email and Password."
                }
                else if (email_check == false && password_check == true) {
                    error = "Incorrect Password."
                }
                else if (email_check == true && password_check == false) {
                    error = "Invalid Email."
                }

                document.getElementById('failedlogin').style.display = 'block';
                document.getElementById('failedlogin').innerText = error;

            }
        }, (error) => {
            console.log(error);
            output = error

        });
}


function createPetProfile() {
    console.log('----javascript is running-----')
    tableName = "petProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl + tableName + ".json"
    axios.get(url)
    .then((response) => {
        newPetID = response.data.data.length
        const ref= firebase.storage().ref()
        const file = document.getElementById("file").files[0]
        const name = newPetID + "-"+file.name
        const metadata = {
            contentType:file.type
        }

        // need to add function to get tag name ID after tagName
        date = new Date();
        const [hour,seconds] = [date.getHours(), date.getMinutes()];
        date = date.toDateString()
        date = date.split(" ")
        newDate = date[1]+" "+date[2]+","+date[3]
        newTime = hour+":"+seconds
        founderID = window.sessionStorage.userID
        founderName = window.sessionStorage.userName
        petName = document.getElementById('input-name').value
        petBreed = document.getElementById('input-breed').value
        petGender = document.getElementById('input-gender').value
        console.log(name)

        const task = ref.child("petProfilePictures/"+name).put(file,metadata)
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url =>{
            console.log(url)
            photoURL = url
            myStorage = window.sessionStorage;
            url = firebaseurl + tableName + "/data/" + newPetID + ".json"
            axios.put(url, {
                "petID": newPetID,
                "petName": petName,
                "petPictureUrl": photoURL,
                "breed": petBreed,
                "foundedDate": newDate,
                "founder": founderID,
                "founderName": founderName,
                "gender": petGender,
                "profileDetails": {
                    "detailTitle1": "null",
                    "detailTitle2": "null",
                },
                "lastSeenLocation": currentLocation,
            }).then((response) => {
                console.log(response);
        });
        })
    })
}
function updateProfilePicture() {
    // console.log('----javascript is running-----')
    tableName = "userProfile"
    currentUserID= window.sessionStorage.userID
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = `${firebaseurl + tableName}/data/${currentUserID}.json`
    // console.log(url)
    axios.get(url)
    .then((response) => {
        // console.log(response)

        // newPetID = response.data.data.length
        const ref= firebase.storage().ref()
        const file = document.getElementById("file").files[0]
        const name = currentUserID+"-profilePicture".name
        const metadata = {
            contentType:file.type
        }

        const task = ref.child("profilePicture/"+name).put(file,metadata)
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url =>{
            // console.log(url)
            photoURL = url
            myStorage = window.sessionStorage;
            url = `${firebaseurl + tableName}/data/${currentUserID}.json`
            document.getElementById('profilepic').src = photoURL

            axios.put(url, {
                "userID": currentUserID,
                "name": response.data.name,
                "email": response.data.email,
                "password": response.data.password,
                "age": response.data.age,
                "gender": response.data.gender,
                "profilePictureUrl": photoURL,
                "profileDetails": {
                    "followingUsers": null,
                    "followedByUsers": null,
                    "followingPet": null
                },
                "posts": null,
                "postsWithPhotos": null
            }).then((response) => {
                console.log(response);
        });
        })
    })
}

function getCurrentProfilePicture(currentUserID){
    console.log("loading profile picture"+currentUserID)
    tableName = "userProfile"
    firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = `${firebaseurl + tableName}/data/${currentUserID}.json`
    // console.log(url)
    axios.get(url)
    .then((response) => {
        profilePictureUrl = response.data.profilePictureUrl
        if (profilePictureUrl== undefined){
            profilePictureUrl='/img/male_empty.png'
        }
        document.getElementById('profilepic').src = profilePictureUrl
    })
}
// axios.get(url)
//     .then((response) => {
//         newPetID = response.data.data.length
//         // output = response
//         url = firebaseurl + tableName + "/data/" + newPetID + ".json"
//         console.log(url)
//         petName = document.getElementById('input-name')
//         petBreed = document.getElementById('input-breed')
//         petGender = document.getElementById('input-gender')
//         petName = document.getElementById('input-name')
//         axios.put(url, {
//             "petID": newPetID,
//             "petName": petName,
//             "petPictureUrl": detail[2],
//             "breed": petBreed,
//             "foundedDate": detail[4],
//             "founder": detail[5],
//             "gender": detail[6],
//             "profileDetails": {
//                 "detailTitle1": detail[7],
//                 "detailTitle2": detail[8],
//             },
//             "lastSeenLocation": detail[9],
//         }).then((response) => {
//             console.log(response)
//             console.log("pet profile created sucessfully")
//             window.location.href = "petprofile.html?PetID="+newPetID;
//         });
//     }, (error) => {
//         console.log(error);
//         output = error

//     });
// }

// function createPetProfileOld(detail) {
//     console.log('----javascript is running-----')
//     tableName = "petProfile"
//     firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
//     url = firebaseurl + tableName + ".json"
//     axios.get(url)
//         .then((response) => {
//             newPetID = response.data.data.length
//             // output = response
//             url = firebaseurl + tableName + "/data/" + newPetID + ".json"
//             console.log(url)
//             petName = document.getElementById('input-name')
//             petBreed = document.getElementById('input-breed')
//             petGender = document.getElementById('input-gender')
//             petName = document.getElementById('input-name')
//             axios.put(url, {
//                 "petID": newPetID,
//                 "petName": petName,
//                 "petPictureUrl": detail[2],
//                 "breed": petBreed,
//                 "foundedDate": detail[4],
//                 "founder": detail[5],
//                 "gender": detail[6],
//                 "profileDetails": {
//                     "detailTitle1": detail[7],
//                     "detailTitle2": detail[8],
//                 },
//                 "lastSeenLocation": {
//                     "latitude": detail[9],
//                     "longitude": detail[10],
//                 }
//             }).then((response) => {
//                 console.log(response)
//                 console.log("pet profile created sucessfully")
//                 window.location.href = "petprofile.html?PetID="+newPetID;
//             });
//         }, (error) => {
//             console.log(error);
//             output = error

//         });
// }
