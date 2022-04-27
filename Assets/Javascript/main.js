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


const Session_HTML = document.getElementById("event_countdown_timer_session_column");
const day = document.getElementById("event_countdown_timer_days_column");
const hour = document.getElementById("event_countdown_timer_hours_column");
const minute = document.getElementById("event_countdown_timer_minutes_column");
const second = document.getElementById("event_countdown_timer_seconds_column");
let SessionCountDown = "";

    async function SessionCountdownTimer() {
        let SessionTimeInSecondArray = await GetSessionsTimeInSecond();

        let SecondNow;
        let CountdownTimerInSecond = [];
        let DayArray = [];
        let HourArray = [];
        let MinuteArray = [];
        let SecondArray = [];
        let DescriptionArray = [];
        let SessionArray = [];

        let P1 = [];
        let P2 = [];
        let P3 = [];
        let Race = [];
        let Qualifying = [];
        let Sprint = [];



        SessionCountDown = setInterval(() => {

                SecondNow = Math.round(Date.now() / 1000);
    
                for (i = 0; i < Object.keys(event_tracker_JSON.seasonContext.timetables).length; i++) {     /*God forgive me*/
                    CountdownTimerInSecond[i] = SessionTimeInSecondArray[i] - SecondNow;
    
                    SessionArray[i] = event_tracker_JSON.seasonContext.timetables[i].session;
                    DescriptionArray[i] = event_tracker_JSON.seasonContext.timetables[i].description;
                    DayArray[i] = Math.floor(CountdownTimerInSecond[i] / 86400);
                    HourArray[i] = Math.floor(CountdownTimerInSecond[i] % 86400 / 3600);
                    MinuteArray[i] = Math.floor(CountdownTimerInSecond[i] % 3600 / 60);
                    SecondArray[i] = Math.floor(CountdownTimerInSecond[i] % 60);
                } 

                for (j = 0; j < Object.keys(event_tracker_JSON.seasonContext.timetables).length; j++) {
                    switch (SessionArray[j]) {
                        case "p1":  /*Practice 1*/
                            P1 = [DescriptionArray[j], DayArray[j], HourArray[j], MinuteArray[j], SecondArray[j]];
                            DetermindWhichSessionIsHappening(P1, P1[0]);
                            break;

                        case "p2":  /*Practice 2*/
                            P2 = [DescriptionArray[j], DayArray[j], HourArray[j], MinuteArray[j], SecondArray[j]];
                            DetermindWhichSessionIsHappening(P2, P2[0]);
                            break;

                        case "p3":  /*Practice 3*/
                            P3 = [DescriptionArray[j], DayArray[j], HourArray[j], MinuteArray[j], SecondArray[j]];
                            DetermindWhichSessionIsHappening(P3, P3[0]);
                            break;
                    
                        case "q":  /*Qualifying*/
                            Qualifying = [DescriptionArray[j], DayArray[j], HourArray[j], MinuteArray[j], SecondArray[j]];
                            DetermindWhichSessionIsHappening(Qualifying, Qualifying[0]);
                            break;

                        case "r":  /*Race*/
                            Race = [DescriptionArray[j], DayArray[j], HourArray[j], MinuteArray[j], SecondArray[j]];
                            DetermindWhichSessionIsHappening(Race, Race[0]);
                            break;

                        case "s":  /*Sprint*/
                            Sprint = [DescriptionArray[j], DayArray[j], HourArray[j], MinuteArray[j], SecondArray[j]];
                            DetermindWhichSessionIsHappening(Sprint, Sprint[0]);
                            break;
                    }
                }
            }, 1000);

    }


    async function DetermindWhichSessionIsHappening(Session, Session_name) {
        // event_tracker_JSON.seasonContext.timetables.state: "upcoming started completed"
        // event_tracker_JSON.seasonContext.state: "COUNTDOWN-TO-SPRINT-QUALIFYING" / "SPRINT-QUALIFYING"
        //                                         "COUNTDOWN-TO-${session}"        / "${session}"
        
        // event_tracker_JSON.seasonContext.timetables.endTime


        switch (true) {

            case Session[1] && Session[2] && Session[3] && Session[4] < 0 :
                Session_HTML.textContent = Session_name;
                day.textContent = "Started";
                hour.textContent = "";
                minute.textContent = "";
                second.textContent = "";
                clearInterval(SessionCountDown);
                break;

            case Session[1] <= 0 :

                break;

            default:
                Session_HTML.textContent = Session_name;
                day.textContent = Session[1].toString().padStart(2, '0') + "D";
                hour.textContent = Session[2].toString().padStart(2, '0') + "H";
                minute.textContent = Session[3].toString().padStart(2, '0') + "M";
                second.textContent = Session[4].toString().padStart(2, '0') + "S";
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

