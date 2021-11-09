console.log('allpets js is being referenced');
const app = Vue.createApp({
    data() {
        return {
            petlist: [],
            petnumber: 0,
            numpages: 1,
            resultsperpage: 12,
            thispage: 1,
        }
    },
    methods: {
        getPetsList() {
            //var petcount = 0;
            console.log('getpetlist function is running');
            var url_string = window.location.href; //window.location.href
            var url = new URL(url_string);
            console.log('pageid condition: ', url.searchParams.get("page"))
            if (url.searchParams.get("page") != null) {
                var pageID = parseInt(url.searchParams.get("page"));
                this.thispage = pageID;
            }
            console.log('page: ', this.thispage)
            tableName = "petProfile"
            firebaseurl = "https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app/";
            url = firebaseurl + tableName + ".json"
            let output = null;

            // console.log(url)
            axios.get(url)
                .then((response) => {
                    output = response.data.data
                    //petData = response.data // global var
                    console.log(output)
                    for (result of output) {
                        petName = result.petName;
                        petPictureUrl = result.petPictureUrl;
                        petID = result.petID;
                        let uppercondition = Number(this.thispage) * this.resultsperpage >= Number(petID);
                        let lowercondition = (Number(this.thispage) - 1) * this.resultsperpage < Number(petID);
                        console.log('upper: ', Number(this.thispage) * this.resultsperpage);
                        console.log('lower: ', (Number(this.thispage) - 1) * this.resultsperpage);

                        if (lowercondition && uppercondition) {
                            let petobject = {};
                            petobject['petID'] = `/screens/petprofile.html?petID=${petID}`;
                            petobject['petName'] = petName;
                            petobject['petImage'] = petPictureUrl;
                            this.petlist.push(petobject);
                        }

                        this.petnumber += 1;
                        console.log('this petnumber: ', this.petnumber)
                    }
                    console.log(this.petlist);
                    //this.petnumber = 35; //test 
                    console.log('pets: ', this.petnumber)
                    console.log('resultsperpage: ', this.resultsperpage)
                    this.numpages = Math.ceil(this.petnumber / this.resultsperpage);
                    console.log('numpages', this.numpages)
                    //breed = output.breed;
                    //foundedDate = output.foundedDate;
                    //founder = output.founderName;
                    //pet_gender = output.gender;
                    //latitude = output.lastSeenLocation.latitude;
                    //longitude = output.lastSeenLocation.longitude;
                    // loadGoogleMaps(latitude,longitude)   //disabled to safe api calls
                    // getAddress(latitude,longitude)
                    //details1 = output.profileDetails.detailTitle1;
                    //details2 = output.profileDetails.detailTitle2;

                },
                    (error) => {
                        console.log(error);
                        output = error

                    });
        }
    },
    computed: {

    },
    created() {
        this.getPetsList();


    }
})
const vm = app.mount('#app')
