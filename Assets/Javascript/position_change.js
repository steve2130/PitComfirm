const Position_Gain_Input = document.getElementById("Position_Gain_Input");
const Position_Loss_Input = document.getElementById("Position_Loss_Input");
const SubmitButton01 = document.getElementById("submitButton1");
const SubmitButton02 = document.getElementById("submitButton2");



function Position_Gain() {

    let RawPositionGain = Position_Gain_Input.value;
    let PositionGain = 0;

    if (RawPositionGain < 10 && RawPositionGain > 0) {
        PositionGain = "0" + RawPositionGain;
    }
    else {
        PositionGain = RawPositionGain;
    }

    document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place");
    document.getElementById("Position_Box" + PositionGain).classList.add("Gain-place");

    /*To do the Background-color disappearing animation;*/
    setTimeout(function() {
        document.getElementById("Position_Box" + PositionGain).classList.add("Gain-place-Animation");
        document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place");}, 2600);

    setTimeout(function() {
        document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place-Animation");}, 3200);


}



function Position_Loss() {

    let RawPositionLoss = Position_Loss_Input.value;
    let PositionLoss = "";

    if (RawPositionLoss < 10 && RawPositionLoss > 0) {
        PositionLoss = "0" + RawPositionLoss;
    }
    else {
        PositionLoss = RawPositionLoss;
    }

    document.getElementById("Position_Box" + PositionLoss).classList.remove("Gain-place");
    document.getElementById("Position_Box" + PositionLoss).classList.add("Lose-place");



    /*To do the Background-color disappearing animation;*/
    setTimeout(function() {
        document.getElementById("Position_Box" + PositionLoss).classList.add("Lose-place-Animation");}, 2600);

    setTimeout(function() {
        document.getElementById("Position_Box" + PositionLoss).classList.remove("Lose-place");
        document.getElementById("Position_Box" + PositionLoss).classList.remove("Lose-place-Animation");}, 3200);


}

SubmitButton01.addEventListener("click", Position_Gain);
SubmitButton02.addEventListener("click", Position_Loss);