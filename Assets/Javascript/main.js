/*For nav toggle expand / retract*/
{
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
}

/*__________________________________________________________________________________________ */
/*Detect height changes on the country text*/
{
    const CountriesText = document.getElementById("circuit_country_text");
    const heightObserver = new ResizeObserver (entries => {
        

        for (let entry of entries) {
            const cr = entry.contentRect;

            switch (cr.height) {
                case 48:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_TwoLiner");
                    break;

                case 72:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_ThreeLiner");
                    break;
                    
                default:
                    CountriesText.classList.replace("circuitCountryText_TwoLiner", "circuitCountryText_OneLiner");
                    break;
            }

        }
    })

    heightObserver.observe(CountriesText);
}

/*__________________________________________________________________________________________*/

    /*Grab Info from event-tracker.json*/
    var event_tracker_JSON = "";

    async function GetData() {
        const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/";  /*should use express.js, this is just a temporary fix*/
                             /*Please deploy your own.*/
        
        try {
            let res = await axios
                .get(cors_bypass + 'https://api.formula1.com/v1/event-tracker', {
                    method: 'GET',
                    headers: {
                        'apikey': 'qPgPPRJyGCIPxFT3el4MF7thXHyJCzAP',   /*Sniff your own*/
                        'locale': 'en'  /*Essential?*/
                    }
                })
                return res.data;
            }

        catch (error) {
            console.log(error);
        }
    }



    /*To check whether livetiming is available or not.*/
    var Streaming_Status_JSON = "";

    async function CheckWebsocketOpen() {
        
        const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/"; 
        try {
            let res = await axios
                .get(cors_bypass + 'https://livetiming.formula1.com/static/StreamingStatus.json', {
                    method: 'GET',
                    headers: {
                        /*Seems like nothing needed.*/
                    }
                })
                return res.data;
        }

        catch (error) {
            console.log(error);
        }
    }



    /*To get the SPFeed.json when websocket is closed.*/
    var SPFeed_JSON = "";

    async function GetRaceResult() {
        
        const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/"; 
        try {
            let res = await axios
                .get(cors_bypass + `https://livetiming.formula1.com/static/2022/2022-04-10_Australian_Grand_Prix/2022-04-10_Race/SPFeed.json`, {
                    method: 'GET',
                    headers: {
                        /*Seems like nothing needed.*/
                    }
                })
                return res.data;
        }

        catch (error) {
            console.log(error);
        }
    }


/*__________________________________________________________________________________________*/
    
    /*Data Processing */
        function GetCircultImage(eventData) {

            let circuit_image_title = eventData.circuitSmallImage.title;
            let circuit_image_url = eventData.circuitSmallImage.url;

            circuit_image_title = circuit_image_title.split(".")

            return [circuit_image_title[0], circuit_image_url];
        }


        async function happystuff() {
            let return_info = await GetData();
            event_tracker_JSON = return_info;

            let circuit_info = GetCircultImage(return_info);


            const circuit_country_text = document.getElementById("circuit_country_text");
            const circuit_image = document.getElementById("circuit_image");
            
            circuit_country_text.textContent = circuit_info[0].toUpperCase();
            circuit_image.src = circuit_info[1];
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
/*Event Counterdown Timer*/


    /*For the clock in nav bar*/
    {
        function GETDateandTime() {
            let date = new Date();

            let option = { timeZone: 'UTC', hour12: false };

            let LocalDate = date.toLocaleTimeString("en-GB", option);
            
            const timeCounter = document.getElementById("timeCounter");
            timeCounter.innerHTML = LocalDate;
        }

        setInterval(() => GETDateandTime(), 1000);
    }


    async function GetSessionsTimeInSecond() {
        return new Promise ((resolve) => {

            let event_tracker_JSON_timetables_length = Object.keys(event_tracker_JSON.seasonContext.timetables).length;
            let GMTOffset = event_tracker_JSON.seasonContext.timetables[0].gmtOffset;
            let dateArray = [];
    
            for (i = 0; i < event_tracker_JSON_timetables_length; i++) {
                dateArray[i] = event_tracker_JSON.seasonContext.timetables[i].startTime + GMTOffset;
                dateArray[i] = new Date(dateArray[i]).getTime();
                dateArray[i] = Math.round(dateArray[i] / 1000);
            }
            
            resolve(dateArray);
        })

    }



    async function SessionCountdownTimer() {
        let SessionTimeInSecondArray = await GetSessionsTimeInSecond();
 

        let SecondNow;
        let CountdownTimerInSecond = [];
        let DayArray = [];
        let HourArray = [];
        let MinuteArray = [];
        let SecondArray = [];


        setInterval(() => {
            SecondNow = Math.round(Date.now() / 1000);

            for (i = 0; i < Object.keys(event_tracker_JSON.seasonContext.timetables).length; i++) {
                CountdownTimerInSecond[i] = SessionTimeInSecondArray[i] - SecondNow;

                DayArray[i] = Math.floor(CountdownTimerInSecond[i] / 86400);
                HourArray[i] = Math.floor(CountdownTimerInSecond[i] % 86400 / 3600);
                MinuteArray[i] = Math.floor(CountdownTimerInSecond[i] % 3600 / 60);
                SecondArray[i] = Math.floor(CountdownTimerInSecond[i] % 60);

                console.log(`${DayArray[i]} Day    ${HourArray[i]} Hour     ${MinuteArray[i]} Minute     ${SecondArray[i]} Second`);
            } 

        }, 1000);
    }





    // let secondNow = Math.round(Date.now() / 1000);
    // let eventTime = new Date("2022-04-24T17:00:00+02:00");
    // console.log(eventTime);
    // eventTime = eventTime.getTime() / 1000;
    // eventTime = eventTime + GMToffsetInSeoncd;
    // console.log(eventTime);
/*__________________________________________________________________________________________*/
        


document.addEventListener('DOMContentLoaded', () => {
    happystuff();
    DecideWhatSourceToGetTiming();
    

});