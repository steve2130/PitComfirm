const Position_Gain_Input = document.getElementById("Position_Gain_Input");
const Position_Loss_Input = document.getElementById("Position_Loss_Input");
const SubmitButton01 = document.getElementById("submitButton1");
const SubmitButton02 = document.getElementById("submitButton2");
const SubmitButton03 = document.getElementById("submitButton3");


class Driver {
    constructor(data) {
        this.Three_letter_code = data.Three_letter_code;
        this.driver_shorten_name = data.driver_shorten_name;
        this.driver_full_name = data.driver_full_name;
        this.team_color = data.team_color;
    }
}

let HAM = new Driver({Three_letter_code: "HAM",
                      driver_shorten_name: "L. Hamiliton",
                      driver_full_name: "Lewis Hamiliton",
                      team_color: "#00D2BE"});

let BOT = new Driver({Three_letter_code: "BOT",
                      driver_shorten_name: "V. Bottas",
                      driver_full_name: "Valtteri Bottas",
                      team_color: "#00D2BE"});















function Position_Gain() {
    let RawPositionGain = Position_Gain_Input.value;
    let PositionGain = 0;


    if (RawPositionGain < 10 && RawPositionGain > 0) {
        PositionGain = "0" + RawPositionGain;
    }
    else if (RawPositionGain > 10 && RawPositionGain < 21) {
        PositionGain = RawPositionGain;
    }




    if (document.getElementById("Position_Box" + PositionGain).classList.contains("Lose-place")) {
        document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place");
        document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place-Animation");
    } 

    if (document.getElementById("Position_Box" + PositionGain).classList.contains("Lose-place-Animation")) {
        document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place");
        document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place-Animation");
    } 




    document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place");
    document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place");
    document.getElementById("Position_Box" + PositionGain).classList.add("Gain-place");

    /*To do the Background-color disappearing animation;*/



    /*```Please make it work when 1 car DNF and everyone overtake it``` */
    setTimeout(function() {
        document.getElementById("Position_Box" + PositionGain).classList.add("Gain-place-Animation");
        document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place");}, 2600);

    setTimeout(function() {
        document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place-Animation");}, 3000);


}



function Position_Loss() {

    let RawPositionLoss = Position_Loss_Input.value;
    let PositionLoss = "";

    if (RawPositionLoss < 10 && RawPositionLoss > 0) {
        PositionLoss = "0" + RawPositionLoss;
    }
    else if (RawPositionLoss > 10 && RawPositionLoss < 21) {
        PositionLoss = RawPositionLoss;
    }



    const classNames = ["Gain-place", "Lose-place"];
    let CHECKSUM = 0;
    
    while (CHECKSUM === 0) {

        if (!classNames.some(classNames => document.getElementById("Position_Box" + PositionLoss).classList.contains(classNames))) {
        
            document.getElementById("Position_Box" + PositionLoss).classList.add("Lose-place");
            document.getElementById("Position_Box" + PositionLoss).classList.add("Lose-place-Animation");
    
            CHECKSUM = 1;

            // setTimeout(function() {
            //     document.getElementById("Position_Box" + PositionLoss).classList.add("Lose-place-Animation");}, 2600);
        
            setTimeout(function() {
                document.getElementById("Position_Box" + PositionLoss).classList.remove("Lose-place");
                document.getElementById("Position_Box" + PositionLoss).classList.remove("Lose-place-Animation");}, 3000);

        } 

        else if (classNames.some(classNames => document.getElementById("Position_Box" + PositionLoss).classList.contains(classNames))) {
            document.getElementById("Position_Box" + PositionLoss).classList.remove("Gain-place");
            document.getElementById("Position_Box" + PositionLoss).classList.remove("Gain-place-Animation");

            CHECKSUM = 0;
        }
    }
}






Position_Gain_Input.addEventListener('change', function() {
    Position_Loss_Input.value = parseInt(Position_Gain_Input.value) + 1;
});


SubmitButton01.addEventListener("click", Position_Gain);
SubmitButton02.addEventListener("click", Position_Loss);

SubmitButton03.addEventListener("click", function() {
    Position_Gain();
    Position_Loss();
});



