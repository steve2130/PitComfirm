// Was going to use data from motorsportstat.com
// But their JSONs have an api key that cannot be found in HTTP header

// Here is an alternative source for calendar: https://github.com/sportstimes/f1/tree/main/_db
// The downside of this source is that it could be updated manually. 


/* Contain some functions that are the same as in main.js */
/* Just to let the error logs from the unused eventlistener not to be shown in console. */

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


async function GetCalendarData() {

    // https://github.com/sportstimes/f1/blob/main/_db/f1/2022.json
    let Formula1_Calendar = await GetData("https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/2022.json",
                                        "GET",
                                        {});

    // https://www.fiaformula2.com/Calendar
    let Formula2_Calendar = await GetData("https://api.formula1.com/v1/f2f3-fom-results/races?website=f2",
                                        "GET",
                                        {"apikey":"Ij4Lwi0yPPhuTstW1hhmmd9ntwTGhjNe"});

    // https://www.fiaformula3.com/Calendar
    let Formula3_Calendar = await GetData("https://api.formula1.com/v1/f2f3-fom-results/races?website=f3",
                                        "GET",
                                        {"apikey":"uwwf2TIPm5aMRFIAUfjwF5HQBMWAGSeE"});

    // https://github.com/sportstimes/f1/blob/main/_db/fe/2022.json                                          
    let FormulaE_Calendar = await GetData("https://raw.githubusercontent.com/sportstimes/f1/main/_db/fe/2022.json",
                                        "GET",
                                        {});
    
    return [Formula1_Calendar, Formula2_Calendar, Formula3_Calendar, FormulaE_Calendar];
}



/*__________________________________________________________________________________________*/



async function ProcessF1Calendar_Data(Formula1_Calendar_Raw_Data) {
    let GP_Name = [];  let GP_round = [];  let GP_location = [];  let GP_sessions = [];
    
    // For sorting different keys
    for (let i = 0; r = Formula1_Calendar_Raw_Data.length, r < i; i++) {
        GP_Name = Formula1_Calendar_Raw_Data[i].name;
        GP_round = Formula1_Calendar_Raw_Data[i].round;
        GP_location = Formula1_Calendar_Raw_Data[i].location;
        GP_sessions = Formula1_Calendar_Raw_Data[i].sessions;
    }

    // For getting the starting time of each session
    let SessionsTime = [];
    for (let i = 0; r = GP_sessions.length, r < i; i++) {
        SessionsTime[i] = Object.values(GP_sessions[i]);  // The result should be [{Time 1}, {Time 2}, {Time 3}, ...] for each event.
        new Date(endTimeArray[j]).getTime();
    }

}

async function ProcessF2CalendarData(Formula2_Calendar_RawData) {
    let GP_Round = [];  let CountryName = [];  let CircuitShortName = [];  let GP_Sessions = [];

    for (let i = 0; r = Formula2_Calendar_RawData.length, r < i; i++) {
        GP_Round = Formula2_Calendar_RawData.Races[i].RoundNumber;
        CountryName = Formula2_Calendar_RawData.Races[i].CountryName;
        CircuitShortName = Formula2_Calendar_RawData.Races[i].CircuitShortName;
        GP_Sessions = Formula2_Calendar_RawData.Races[i].Sessions;
    }


}






/*__________________________________________________________________________________________*/

window.onload = async() => {
   let Calendar_RawData = await GetCalendarData();

   ProcessF1Calendar_Data(Calendar_RawData[0]);
   ProcessF2CalendarData(Calendar_RawData[1])
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
