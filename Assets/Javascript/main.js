/*For nav toggle expand / retract*/

const navButton = document.getElementById("nav_button");
const navBar = document.getElementById("navBar");
const navList = document.querySelectorAll("#navList");
const CircuitImage = document.getElementById("circuit_image");

navButton.addEventListener("change", x => {



    if (navButton.checked) {
        navBar.style.height = "100px";
        CircuitImage.style.height= "40px";

        for (let i = 0, length = navList.length; i < length; i++) {
            navList[i].classList.replace("nav_list", "nav_list_expanded");
        }
    }

    else {
        navBar.style.height = "38px";
        CircuitImage.style.height= "20px";

        for (let i = 0, length = navList.length; i < length; i++) {
            navList[i].classList.replace("nav_list_expanded", "nav_list");
        }
    }
}, false);

/*__________________________________________________________________________________________ */


    /*For the clock in nav bar*/
    function GETDateandTime() {
        let date = new Date();

        let option = { hour12: false };
        let HKT = "zh-HK"

        let LocalDate = date.toLocaleTimeString(HKT, option);
        

        const timeCounter = document.getElementById("timeCounter");
        timeCounter.innerHTML = LocalDate;
    }

    setInterval(fun => GETDateandTime(), 1000);

/*__________________________________________________________________________________________ */




    

/*__________________________________________________________________________________________*/

    /*Grab Info from event-tracker.json*/
    async function GetData() {
        const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/";  /*should use express.js, this is just a temporary fix*/
        try {
            let res = await axios
                .get(cors_bypass + 'https://api.formula1.com/v1/event-tracker', {
                    method: 'GET',
                    headers: {
                        'apikey': 'qPgPPRJyGCIPxFT3el4MF7thXHyJCzAP',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
                        'Connection': 'keep-alive',
                        'Origin': 'https://www.formula1.com/',
                        'Referer': 'https://www.formula1.com/',
                        'locale': 'en'  /*Essential?*/
                    }
                })
                return res.data;
            }

        catch (error) {
            console.log(error);
        }
    }

    GetData().then(res => {
        console.log(res);
    });



        function GetCircultImage(eventData) {
            console.log(eventData);

            let circuit_image_title = eventData.race.meetingCountryName;
            let circuit_image_url = eventData.circuitSmallImage.url;

            console.log(circuit_image_title);
            console.log(circuit_image_url);

            return [circuit_image_title, circuit_image_url];
        }

        function GetCountryTimezoneOffset(eventData) {
            let GMToffset = eventData.seasonContext.timetables[0].gmtOffset; /*Grab the offset from race column*/
            GMToffset = GMToffset.split(":");

            let hourOffset = GMToffset[0];
            let minuteOffset = GMToffset[1];

            return [hourOffset, minuteOffset];
        }

        function TimeZoneProcess(return_info) {
            /*Use GMT at backend!*/

            let GMToffset = GetCountryTimezoneOffset(return_info);
            let GMToffsetInSeoncd = (parseInt(GMToffset[0]) * 3600) + (parseInt(GMToffset[1]) * 60);

            console.log(GMToffsetInSeoncd);

        }


        async function happystuff() {
            let return_info = await GetData();
            let time_countdown = TimeZoneProcess(return_info);
            let circuit_info = GetCircultImage(return_info);


            const circuit_country_text = document.getElementById("circuit_country_text");
            const circuit_image = document.getElementById("circuit_image");
            
            circuit_country_text.textContent = circuit_info[0].toUpperCase();
            circuit_image.src = circuit_info[1];
        

        }




        document.addEventListener('DOMContentLoaded', (event) => {
            happystuff();
            navButton.checked = false;  /*Love you firefox */
        });