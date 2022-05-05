/*For nav toggle expand / retract*/
{
    const NavButton = document.getElementById("nav_button");
    const NavSideBar = document.getElementById("nav_side_bar");
    const NavSideBarWrapper = document.getElementById("nav_side_bar_wrapper");


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
                case 46:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_TwoLiner");
                    break;

                case 69:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_ThreeLiner");
                    break;

                case 23:
                    CountriesText.classList.replace("circuitCountryText_TwoLiner", "circuitCountryText_OneLiner");
                    CountriesText.classList.replace("circuitCountryText_ThreeLiner", "circuitCountryText_OneLiner");
                    break;
                    
                default:
                    CountriesText.classList.replace("circuitCountryText_TwoLiner", "circuitCountryText_OneLiner");
                    CountriesText.classList.replace("circuitCountryText_ThreeLiner", "circuitCountryText_OneLiner");
                    break;
            }

        }
    })

    heightObserver.observe(CountriesText);
}

/*__________________________________________________________________________________________*/

    /*Grab Info from event-tracker.json*/
    var event_tracker_JSON = "";    /*Don't want to request the info from server everytime.*/

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

    async function Deliver_event_tracker() {
        let return_info = await GetData();
        event_tracker_JSON = return_info;
    }




        function GetCircultImage() {

            const circuit_country_text = document.getElementById("circuit_country_text");
            const circuit_image = document.getElementById("circuit_image");

            let circuit_image_title = event_tracker_JSON.circuitSmallImage.title;
            let circuit_image_url = event_tracker_JSON.circuitSmallImage.url;

            circuit_image_title = circuit_image_title.split(".")


            circuit_country_text.textContent = circuit_image_title[0].toUpperCase();
            circuit_image.src = circuit_image_url;
            
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

            let option = {hour12: false };

            let LocalDate = date.toLocaleTimeString("zh-TW", option);
            
            const timeCounter = document.getElementById("timeCounter");
            timeCounter.innerHTML = LocalDate;
        }

        setInterval(() => GETDateandTime(), 1000);
    }









let SessionCountDown = "";



async function GetSessionsTimeInSecond() {
    return new Promise ((resolve) => {

        let event_tracker_JSON_timetables_length = Object.keys(event_tracker_JSON.seasonContext.timetables).length;
        let GMTOffset = event_tracker_JSON.seasonContext.timetables[0].gmtOffset;
        let startTimeArray = [];
        let endTimeArray = [];

        for (i = 0; i < event_tracker_JSON_timetables_length; i++) {
            startTimeArray[i] = event_tracker_JSON.seasonContext.timetables[i].startTime + GMTOffset;
            startTimeArray[i] = new Date(startTimeArray[i]).getTime();
            startTimeArray[i] = Math.round(startTimeArray[i] / 1000);
        }

        for (j = 0; j < event_tracker_JSON_timetables_length; j++) {
            endTimeArray[j] = event_tracker_JSON.seasonContext.timetables[j].endTime + GMTOffset;
            endTimeArray[j] = new Date(endTimeArray[j]).getTime();
            endTimeArray[j] = Math.round(endTimeArray[j] / 1000);
        }
        
        resolve([startTimeArray, endTimeArray]);
    })

}


    async function SessionCountdownTimer() {
        const SessionTime = await GetSessionsTimeInSecond();
        let SessionStartTimeInSecondArray = SessionTime[0];
        let SessionEndTimeInSecondArray = SessionTime[1];

        let SecondNow = 0;
        

        let CountdownTimerInSecond = [];
        let DayArray = [];
        let HourArray = [];
        let MinuteArray = [];
        let SecondArray = [];
        let DescriptionArray = [];
        let SessionArray = [];


        SessionCountDown = setInterval(async () => {

                SecondNow = Math.round(Date.now() / 1000);
    
                let CloestSession = await DetermindCurrentSession(SessionEndTimeInSecondArray, SecondNow);


                for (i = 0; i < Object.keys(event_tracker_JSON.seasonContext.timetables).length; i++) {     /*God forgive me*/
                    CountdownTimerInSecond[i] = SessionStartTimeInSecondArray[i] - SecondNow;
    
                    SessionArray[i] = event_tracker_JSON.seasonContext.timetables[i].session;
                    DescriptionArray[i] = event_tracker_JSON.seasonContext.timetables[i].description;
                    DayArray[i] = Math.floor(CountdownTimerInSecond[i] / 86400);
                    HourArray[i] = Math.floor(CountdownTimerInSecond[i] % 86400 / 3600);
                    MinuteArray[i] = Math.floor(CountdownTimerInSecond[i] % 3600 / 60);
                    SecondArray[i] = Math.floor(CountdownTimerInSecond[i] % 60);
                } 


                    Session = [DescriptionArray[CloestSession], DayArray[CloestSession], HourArray[CloestSession], MinuteArray[CloestSession], SecondArray[CloestSession]];
                    DisplaySession(Session, Session[0]);


            }, 1000);
    }



    async function DetermindCurrentSession(SessionEndTimeArray, SecondNow) {
        // event_tracker_JSON.seasonContext.timetables.state: "upcoming started completed"
        // event_tracker_JSON.seasonContext.state: "COUNTDOWN-TO-SPRINT-QUALIFYING" / "SPRINT-QUALIFYING" 
        //                                         "COUNTDOWN-TO-P1" / "P1" ?
        //                                         "COUNTDOWN-TO-${session}"        / "${session}"
        
        // event_tracker_JSON.seasonContext.timetables.endTime


        let SecondDifference = [];
        let seasonContext_timetables_state = [];
        let seasonContext_state = event_tracker_JSON.seasonContext.state;
        let timetables_session = event_tracker_JSON.seasonContext.timetables.session;



        for (i = 0; i < Object.keys(event_tracker_JSON.seasonContext.timetables).length; i++) { 
            SecondDifference = SessionEndTimeArray[i] - SecondNow;
            // seasonContext_timetables_state = event_tracker_JSON.seasonContext.timetables.state[i];
        }

        let min = Math.min(...SessionEndTimeArray);
        let smallest_index = SessionEndTimeArray.indexOf(min); 
        // Find the index of the element in the SessionEndTimeArray where it is the smallest element in the array.


        return smallest_index;
    }





    async function DisplaySession(Session, Session_name) {

        const Session_HTML = document.querySelector(".EventCountdownTimerSessionColumn");
        const Content = document.querySelectorAll(".EventCountdownTimerColumn_Content");
        const Unit = document.querySelectorAll(".EventCountdownTimerColumn_Unit");

        switch (true) {

            case Session[1] && Session[2] && Session[3] && Session[4] < 0 :
                Session_HTML.textContent = Session_name;
                day.textContent = "Started";
                hour.textContent = "";
                minute.textContent = "";
                second.textContent = "";
                clearInterval(SessionCountDown);
                break;



            case Session[1] <= 0 :  /*0 Day*/
                Session_HTML.textContent = Session_name;
                Content[0].textContent = Session[2].toString().padStart(2, '0'); // H
                Content[1].textContent = Session[3].toString().padStart(2, '0'); // M
                Content[2].textContent = Session[4].toString().padStart(2, '0'); // S

                Unit[0].textContent = "H";
                Unit[1].textContent = "M";
                Unit[2].textContent = "S";
                break;



            default:
                Session_HTML.textContent = Session_name;

                Content[0].textContent = Session[1].toString().padStart(2, '0');
                Content[1].textContent = Session[2].toString().padStart(2, '0');
                Content[2].textContent = Session[3].toString().padStart(2, '0');

                Unit[0].textContent = "D";
                Unit[1].textContent = "H";
                Unit[2].textContent = "M";
                break;
            
        }
    }






/*__________________________________________________________________________________________*/
        
async function LoadedAfterDOMLoaded() {
    DecideWhatSourceToGetTiming();
    await Deliver_event_tracker();
    SessionCountdownTimer();
    GetCircultImage();
}

document.addEventListener('DOMContentLoaded', () => {
    LoadedAfterDOMLoaded();
}, false);

