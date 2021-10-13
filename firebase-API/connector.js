// import axios from 'axios'

firebaseUrl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";

testUrl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/.json?print=pretty"



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
                "profilePictureUrl": null,
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


// const getUserByID = async () => {
//     url = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/userProfile/data/1.json"
//     const response = await axios.get(url);
//     return response.data
// }


// (async () => {
//     const response = await getUserByID()
//     console.log(response)
// })();
// console.log(response)




// getUsersByID(1)