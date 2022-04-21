/*For nav toggle expand / retract*/

const NavButton = document.getElementById("nav_button");
const NavSideBar = document.getElementById("nav_side_bar");
const NavSideBarWrapper = document.getElementById("nav_side_bar_wrapper");
const NavList = document.querySelectorAll("#navList");




NavButton.addEventListener("click", x => {
    NavSideBar.classList.replace("NavSideBar_Collapsed", "NavSideBar_Expanded");
    NavSideBarWrapper.classList.replace("NavSideBarWrapper_Collapsed", "NavSideBarWrapper_Expanded");
}, false);

NavSideBar.addEventListener("click", (e) => {
    /*PsiKai, https://stackoverflow.com/questions/69773505/prevent-overlay-click-for-elements-with-a-higher-z-index */
    if (e.target.classList.contains("NavSideBar")) {
        NavSideBar.classList.replace("NavSideBar_Expanded", "NavSideBar_Collapsed");
        NavSideBarWrapper.classList.replace("NavSideBarWrapper_Expanded", "NavSideBarWrapper_Collapsed");
    }

}, false);

/*__________________________________________________________________________________________ */
/*Detect height changes on the country text*/

const heightObserver = new ResizeObserver ((entries) => {
    console.log(entries)
})

const CountriesText = document.getElementById("circuit_country_text");
heightObserver.observe(CountriesText);
/*__________________________________________________________________________________________ */

    /*For the clock in nav bar*/
    function GETDateandTime() {
        let date = new Date();

        let option = { timeZone: 'UTC', hour12: false };

        let LocalDate = date.toLocaleTimeString("en-GB", option);
        

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
                        'apikey': 'qPgPPRJyGCIPxFT3el4MF7thXHyJCzAP',   /*Sniff your own*/
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



        function GetCircultImage(eventData) {

            let circuit_image_title = eventData.circuitSmallImage.title;
            let circuit_image_url = eventData.circuitSmallImage.url;

            circuit_image_title = circuit_image_title.split(".")

            return [circuit_image_title[0], circuit_image_url];
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

        const CircuitImage = document.getElementById("circuit_image");

        async function happystuff() {
            let return_info = await GetData();
            let time_countdown = TimeZoneProcess(return_info);
            let circuit_info = GetCircultImage(return_info);


            const circuit_country_text = document.getElementById("circuit_country_text");
            const circuit_image = document.getElementById("circuit_image");
            
            circuit_country_text.textContent = circuit_info[0].toUpperCase();
            circuit_image.src = circuit_info[1];
        

        }




/*__________________________________________________________________________________________*/

        async function CheckWebsocketOpen() {
            /*To check whether livetiming is available or not.*/
            const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/"; 
            try {
                let res = await axios
                    .get(cors_bypass + 'https://livetiming.formula1.com/static/StreamingStatus.json', {
                        method: 'GET',
                        headers: {
                            'Connection': 'keep-alive',
                            'Host': 'livetiming.formula1.com',
                            'Origin': 'https://www.formula1.com/',
                            'Referer': 'https://www.formula1.com/',
                        }
                    })
                    return res.data;
            }
    
            catch (error) {
                console.log(error);
            }
        }

        async function GetRaceResult() {
            /*To check whether livetiming is available or not.*/
            const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/"; 
            try {
                let res = await axios
                    .get(cors_bypass + `https://livetiming.formula1.com/static/2022/2022-04-10_Australian_Grand_Prix/2022-04-10_Race/SPFeed.json`, {
                        method: 'GET',
                        headers: {
                            'Connection': 'keep-alive',
                            'Host': 'livetiming.formula1.com',
                            'Origin': 'https://www.formula1.com/',
                            'Referer': 'https://www.formula1.com/',
                        }
                    })
                    console.log(res.data);
            }
    
            catch (error) {
                console.log(error);
            }
        }

        async function DecideWhatSourceToGetTiming() {
            let WebsocketStatus = await CheckWebsocketOpen();

            switch (WebsocketStatus.Status) {
                case "Offline":
                    GetRaceResult();
                    console.log("Websocket closed.");
                    break;
                
                case "Available":
                    console.log("Livetiming available.");
                    break;
                
                default:
                    console.log("Something is wrong with StreamingStatus.json!");
                    break;
            }

            
        }



/*__________________________________________________________________________________________*/
        


document.addEventListener('DOMContentLoaded', (event) => {
    happystuff();
});