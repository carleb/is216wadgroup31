function createUserProfile(){
    tableName = "userProfile"
    firebaseurl= "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    data = {
        "1":{
            "userID": "1",
            "name":"Gerald Lee Jie Ren",
            "email":"handsomegerald@gmail.com",
            "age":"23",
            "gender":"Male",
            "profilePictureUrl":"https://firebasestorage.googleapis.com/v0/b/wadgroup31-e83d0.appspot.com/o/userProfilePictures%2Fuserid-01.jpg?alt=media&token=765b1300-89ab-49f1-934b-82ec74f2e055",
            "profileDetails":{
                "followingUsers":null,
                "followedByUsers":null,
                "followingPet":null
            },
            "posts" : null,
            "postsWithPhotos":null
        }
    }
    // tableName = "userProfile"
    firebaseurl= "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url = firebaseurl+tableName+".json"
    axios.get(url)
            .then((response) => {
            console.log(response);
            // output = response
            // url = firebaseurl+tableName+".json"
            // axios.put(url, { data }).then((response)=>{
            //     console.log(response)
            // });
            }, (error) => {
            console.log(error);
            output = error

            });

    
}