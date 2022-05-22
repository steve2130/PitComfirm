/*For nav toggle expand / retract*/
{
    const NavButton = document.getElementById("nav_button");
    const NavSideBar = document.getElementById("nav_side_bar");
    const NavSideBarWrapper = document.getElementById("nav_side_bar_wrapper");
    const NavBarHambuger = document.getElementById("navbar_Hambuger_wrapper");

    NavButton.addEventListener("click", () => {

        NavBarHambuger.classList.toggle("NavBarHambuger_Open");
        NavSideBar.classList.toggle("NavSideBar_Expanded");
        NavSideBarWrapper.classList.toggle("NavSideBarWrapper_Expanded");
    }, false);


    NavSideBar.addEventListener("click", (e) => {
        /*PsiKai, https://stackoverflow.com/questions/69773505/prevent-overlay-click-for-elements-with-a-higher-z-index */
        if (e.target.classList.contains("NavSideBar")) {
            NavBarHambuger.classList.toggle("NavBarHambuger_Open");
            NavSideBar.classList.toggle("NavSideBar_Expanded");
            NavSideBarWrapper.classList.toggle("NavSideBarWrapper_Expanded");
        }

    }, false);


    

    // Changed 
    const Event_Countdown_Timer_Clock = document.querySelector(".EventCountdownTimerColumn_Wrapper");
    Event_Countdown_Timer_Clock.addEventListener('click', () => {

    })
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
                    CountriesText.classList.replace("circuitCountryText_ThreeLiner", "circuitCountryText_TwoLiner");
                    break;

                case 52:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_TwoLiner");
                    CountriesText.classList.replace("circuitCountryText_ThreeLiner", "circuitCountryText_TwoLiner");
                    break;




                case 69:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_ThreeLiner");
                    CountriesText.classList.replace("circuitCountryText_TwoLiner", "circuitCountryText_ThreeLiner");
                    break;

                case 78:
                    CountriesText.classList.replace("circuitCountryText_OneLiner", "circuitCountryText_ThreeLiner");
                    CountriesText.classList.replace("circuitCountryText_TwoLiner", "circuitCountryText_ThreeLiner");
                    break;




                case 26:
                    CountriesText.classList.replace("circuitCountryText_TwoLiner", "circuitCountryText_OneLiner");
                    CountriesText.classList.replace("circuitCountryText_ThreeLiner", "circuitCountryText_OneLiner");
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

    /*Grab Info from the different JSON*/

    async function GetData(url, method, headers) {
        const cors_bypass = "https://cors-anywhere-proxy-fork.herokuapp.com/";  /*should use express.js, this is just a temporary fix*/
                             /*Please deploy your own.*/
        
        try {
            let res = await axios
                .get(cors_bypass + url, {
                    method: method,
                    headers: headers
                })
                return res.data;
            }

        catch (error) {
            console.log(error);
        }
    }

    /*Don't want to request the info from server everytime.*/

        // To get the info for current or next race info.
        var event_tracker_JSON = "";    

        /*To check whether livetiming is available or not.*/
        var Streaming_Status_JSON = "";


        /*To grab the details of previous race.*/
        var Session_Info_JSON = "";

        
        /*To get the SPFeed.json when websocket is closed.*/
        var SPFeed_JSON = "";

/*__________________________________________________________________________________________*/
    
    /*Data Processing */

    async function Deliver_event_tracker() {
        event_tracker_JSON = await GetData("https://api.formula1.com/v1/event-tracker", 
                                           "GET", 
                                          {'apikey': 'qPgPPRJyGCIPxFT3el4MF7thXHyJCzAP',   /*Sniff your own*/
                                           'locale': 'en'  /*Essential?*/});
    }

        // 
        // https://livetiming.formula1.com/static/2022/2022-04-10_Australian_Grand_Prix/2022-04-10_Race/SPFeed.json


        async function DecideWhatSourceToGetTiming() {

            let LatestSessionReplayPath = "";
            let SessionInProcess = false;
        
                    // The url from SessionInfo changes when the session starts
                    // And SPFeed.json cannot be accessed during the session (?)
                    // This is an alternative method from getting the SPFeed.json of previous session

                    for (i = 0; i < Object.keys(event_tracker_JSON.seasonContext.timetables).length; i++) {
                        // Detect whether a session is ongoing or not 
                        switch(event_tracker_JSON.seasonContext.timetables[i].state) {
                            case "started":
                                SessionInProcess = true;
                                break;

                            default:
                                SessionInProcess = false;
                                break;
                        }
                    }

                    if (SessionInProcess === true) {  // Event-tracker
                        let LastArrayElement = Object.keys(event_tracker_JSON.sessionLinkSets.replayLinks).length() - 1;
                        LatestSessionReplayPath = event_tracker_JSON.sessionLinkSets.replayLinks[LastArrayElement].url;
                        SPFeed_JSON = await GetData( LatestSessionReplayPath + "SPFeed.json", 
                                                    "GET",
                                                    {});

                        const Processed_Data = ProcessingSPFeedData(SPFeed_JSON);
                        DisplaySPFeed(Processed_Data);
                    }

                    else {  // SessionInfo
                        let PreviousSessionPath = await GetData( "https://livetiming.formula1.com/static/SessionInfo.json", 
                                                                "GET",
                                                                {});

                        SPFeed_JSON = await GetData( "https://livetiming.formula1.com/static/" + PreviousSessionPath.Path + "SPFeed.json", 
                                                    "GET",
                                                    {});

                        const Processed_Data = ProcessingSPFeedData(SPFeed_JSON);
                        DisplaySPFeed(Processed_Data);
                    }




            let WebsocketStatus = await GetData( "https://livetiming.formula1.com/static/StreamingStatus.json",
                                                 "GET",
                                                {});


            switch (WebsocketStatus.Status) {
                case "Offline":
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




        function GetCircultImage() {

            const circuit_country_text = document.getElementById("circuit_country_text");
            const circuit_image = document.getElementById("circuit_image");

            let circuit_image_title = event_tracker_JSON.circuitSmallImage.title;
            let circuit_image_url = event_tracker_JSON.circuitSmallImage.url;

            circuit_image_title = circuit_image_title.split(".")


            circuit_country_text.textContent = circuit_image_title[0].toUpperCase();
            circuit_image.src = circuit_image_url;
            
        }



        function ProcessingSPFeedData(SPFeed) {
            let Drivers_Name = [];  let Drivers_Initials = [];  let Drivers_Color = [];  let Drivers_Team = [];
            let FreeData_Initials = [];  let FreeData_BestLapTime = [];  let FreeData_Position = []; let FreeData_Gap = [];
    
    
            const Drivers = SPFeed.init.data.Drivers;
            
            for (i = 0; i < Drivers.length; i++) {
                Drivers_Name[i] = Drivers[i].Name;
                Drivers_Initials[i] = Drivers[i].Initials;
                Drivers_Color[i] = Drivers[i].Color;
                Drivers_Team[i] = Drivers[i].Team;
            }
    
             
            const FreeData = SPFeed.free.data.DR;
    
            for (j = 0; j < FreeData.length; j++) {
                FreeData_Initials[j] = FreeData[j].F[0];
                FreeData_BestLapTime[j] = FreeData[j].F[1];
                FreeData_Position[j] = FreeData[j].F[3];
                FreeData_Gap[j] = FreeData[j].F[4];
            }
    
            return [Drivers_Name, FreeData_Initials, Drivers_Team, Drivers_Color, FreeData_Position, FreeData_BestLapTime, FreeData_Gap];
        }



        function DisplaySPFeed(SPFeed_ProcessedData) {
            const Drivers_Name = SPFeed_ProcessedData[0];  const FreeData_Initials = SPFeed_ProcessedData[1];  const Drivers_Team = SPFeed_ProcessedData[2];
            const Drivers_Color = SPFeed_ProcessedData[3];  let FreeData_Position = SPFeed_ProcessedData[4];  const FreeData_BestLapTime = SPFeed_ProcessedData[5];  const FreeData_Gap = SPFeed_ProcessedData[6];

            

            const LeaderboardRow_DriverColumn = document.querySelectorAll(".driver-name");

            for (i = 0; i < LeaderboardRow_DriverColumn.length; i++) {
                FreeData_Position[i] = FreeData_Position[i] - 1;

                LeaderboardRow_DriverColumn[FreeData_Position[i]].textContent = FreeData_Initials[i];
                LeaderboardRow_DriverColumn[FreeData_Position[i]].style.borderColor = "#" + Drivers_Color[i];
            }
            

            const Leaderboard_Column_1 = document.querySelectorAll(".Leaderboard_Column_1");
            const Leaderboard_Column_2 = document.querySelectorAll(".Leaderboard_Column_2");
            const Leaderboard_Column_1_text = document.querySelector(".Leaderboard_Column_1_text");

            Leaderboard_Column_1_text.textContent = "Best";

            for (i = 0; i < LeaderboardRow_DriverColumn.length; i++) {
                Leaderboard_Column_1[FreeData_Position[i]].textContent = FreeData_BestLapTime[i];
                // Leaderboard_Column_2[FreeData_Position[i]].textContent = FreeData_Gap[i];
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


        SessionCountDown = setInterval(async() => {

            GETDateandTime(); // The clock, so that it is synced.

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
            SecondDifference[i] = SessionEndTimeArray[i] - SecondNow;

                if (SecondDifference[i] < 0) {
                    SecondDifference[i] = 999999999999999;  // empty string doesn't work, so...
                }
            // seasonContext_timetables_state = event_tracker_JSON.seasonContext.timetables.state[i];
        }


        let min = Math.min(...SecondDifference);
        let smallest_index = SecondDifference.indexOf(min); 
        // Find the index of the element in the SessionEndTimeArray where it is the smallest element in the array.


        return smallest_index;
    }





    async function DisplaySession(Session, Session_name) {

        const Session_HTML = document.querySelector(".EventCountdownTimerSessionColumn");
        const Content = document.querySelectorAll(".EventCountdownTimerColumn_Content");
        const Unit = document.querySelectorAll(".EventCountdownTimerColumn_Unit");
        const Live_Status = document.querySelector(".EventCountdownTimerSessionColumn_LiveStatus");

        switch (true) {

            case Session[1] && Session[2] && Session[3] && Session[4] < 0 :

                if (Session[0] == "P1" || "P2" || "P3") {
                    Session_HTML.textContent = Session_name;
                    Live_Status.classList.remove("display_none");
                }

                Content[0].textContent = "Started";
                Content[1].textContent = "";
                Content[2].textContent = "";

                Unit[0].textContent = "";
                Unit[1].textContent = "";
                Unit[2].textContent = "";


                break;



            case Session[1] <= 0 :  /*0 Day*/
                Session_HTML.textContent = Session_name;
                Content[0].textContent = Session[2].toString().padStart(2, '0'); // H
                Content[1].textContent = Session[3].toString().padStart(2, '0'); // M
                Content[2].textContent = Session[4].toString().padStart(2, '0'); // S


                // if (Session[4] >= 10 && Session[4] <= 19) {
                    // Content[2].classList.remove("EventCountdownTimerColumn_Second");
                // }
                // else {
                    Content[2].classList.add("EventCountdownTimerColumn_Second");
                // }
                Live_Status.classList.add("display_none");

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

                Live_Status.classList.add("display_none");
                    

                break;
        }
    }






    function DataLoading_PageOverlay_Animation() {
        const Group = document.querySelectorAll(".StartingLight_Group");
        const Overlay = document.querySelector(".Loading_Overlay");


        let Displayed = false;
    
        setTimeout(() => {
            Group[0].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Group[1].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Group[2].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Group[3].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
        }, 0);

        setTimeout(() => {
            Group[4].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Group[5].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
        }, 400);



        setTimeout(() => {
            Group[6].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Group[7].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
        }, 800);

        setTimeout(() => {
            Group[8].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Group[9].classList.toggle("Loading_Overlay_Starting_Lights_Actived");
            Displayed = true;


        // Very Anti pattern
            const Timer = setInterval(() => {
                if (SPFeed_JSON && Displayed === true) {
                    setTimeout(() => {
                        for (i = 0; i < 10; i++) {
                            Group[i].classList.remove("Loading_Overlay_Starting_Lights_Actived");
                        }
                    }, 600);   
                    
                    setTimeout(() => {
                        Overlay.classList.add("Loading_Overlay_Hidden");
                        clearInterval(Timer);
                    }, 1000);

                    setTimeout(() => {
                        Overlay.classList.add("display_none");
                    }, 1700);
                }


                else {
                        // It will active no matter the condition above, 
                        // as the function will active every 200ms. 
                        // So one of the conditions will be matched.
                    setTimeout(() => {
                        for (i = 0; i < 10; i++) {
                            Group[i].classList.remove("Loading_Overlay_Starting_Lights_Actived");
                        }
                    }, 5000);

                    setTimeout(() => {
                        Overlay.classList.add("Loading_Overlay_Hidden");
                        // console.log("Oh no! Something is wrong with loading the data!");
                        clearInterval(Timer);
                    }, 5600);

                    setTimeout(() => {
                        Overlay.classList.add("display_none");
                    }, 6100);
                }
            }, 200);
        }, 1200);

        setTimeout(() => {
            if (!SPFeed_JSON) {
                console.log("Oh no! Something is wrong with loading the data!");
            }
            
        }, 6800);
    }






    



/*__________________________________________________________________________________________*/

// Chrome mobile's vh problem

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/


/*__________________________________________________________________________________________*/

document.addEventListener('DOMContentLoaded', () => {
    DataLoading_PageOverlay_Animation();
}, false);

window.onload = async () => {
    await Deliver_event_tracker();
    DecideWhatSourceToGetTiming();
    SessionCountdownTimer();
    GetCircultImage();
}

