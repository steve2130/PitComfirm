/*Ugly*/
const Position_Box01 = document.getElementById("Position_Box01");
const Position_Box02 = document.getElementById("Position_Box02");
const Position_Box03 = document.getElementById("Position_Box03");
const Position_Box04 = document.getElementById("Position_Box04");
const Position_Box05 = document.getElementById("Position_Box05");
const Position_Box06 = document.getElementById("Position_Box06");
const Position_Box07 = document.getElementById("Position_Box07");
const Position_Box08 = document.getElementById("Position_Box08");
const Position_Box09 = document.getElementById("Position_Box09");
const Position_Box10 = document.getElementById("Position_Box10");
const Position_Box11 = document.getElementById("Position_Box11");
const Position_Box12 = document.getElementById("Position_Box12");
const Position_Box13 = document.getElementById("Position_Box13");
const Position_Box14 = document.getElementById("Position_Box14");
const Position_Box15 = document.getElementById("Position_Box15");
const Position_Box16 = document.getElementById("Position_Box16");
const Position_Box17 = document.getElementById("Position_Box17");
const Position_Box18 = document.getElementById("Position_Box18");
const Position_Box19 = document.getElementById("Position_Box19");
const Position_Box20 = document.getElementById("Position_Box20");
const Position_Gain_Input = document.getElementById("Position_Gain_Input");
const Position_Loss_Input = document.getElementById("Position_Loss_Input");




function GetPositionValue() {


    let RawPositionGain = Position_Gain_Input.value;
    let RawPositionLoss = Position_Gain_Input.value;
    console.log(RawPositionLoss);
    console.log(RawPositionGain);

    // let PositionGain = 0;
    // let PositionLoss = 0;


    // if (RawPositionGain < 10) {
    //     PositionGain = "0" + RawPositionGain;
    // }



    // if (RawPositionLoss < 10) {
    //     PositionLoss = "0" + RawPositionLoss;
    // }






    // Which_Position.classList.remove("Lose-place");
    // Which_Position.classList.add("Gain-place");
    // Position_Box05.classList.add("Gain-place");

    
    // setTimeout(function() {
    //     Which_Position.classList.remove("Gain-place");}, 3000);

//     Position_Gain(PositionGain);
//     Position_Loss(PositionLoss);
}

Position_Box07.classList.add("Gain-place");


// function Position_Gain(PositionGain) {

//     let Which_Position = "Position_Box" + PositionGain;

//     Which_Position.classList.remove("Lose-place");
//     Which_Position.classList.add("Gain-place");
//     Position_Box05.classList.add("Gain-place");

    
//     setTimeout(function() {
//         Which_Position.classList.remove("Gain-place");}, 3000);


// }



// function Position_Loss(PositionLoss) {

//     let Which_Position = "Position_Box" + PositionLoss;
//     console.log(Which_Position);


//     Position_Box.classList.remove("Gain-place");
//     Position_Box.classList.add("Lose-place");

//     setTimeout(function() {
//         Which_Position.classList.remove("Lose-place");}, 3000);


// }

Position_Gain_Input.addEventListener("onchange", GetPositionValue());
Position_Loss_Input.addEventListener("change", GetPositionValue());