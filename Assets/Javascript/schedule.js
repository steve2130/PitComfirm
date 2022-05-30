

async function a() {
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

    console.log(Formula1_Calendar.races);
    console.log(Formula2_Calendar);
    console.log(Formula3_Calendar);
}

                                    