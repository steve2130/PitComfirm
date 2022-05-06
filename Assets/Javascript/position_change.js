const Position_Gain_Input = document.getElementById("Position_Gain_Input");
const Position_Loss_Input = document.getElementById("Position_Loss_Input");
const SubmitButton01 = document.getElementById("submitButton1");
const SubmitButton02 = document.getElementById("submitButton2");
const SubmitButton03 = document.getElementById("submitButton3");
const Position_Order = document.querySelectorAll(".position-order");



function Position_Gain() {
    let PositionGain = "";

    PositionGain = Position_Gain_Input.value - 1;


    const classNames = ["Gain-place", "Lose-place"];
    let CHECKSUM = 0;
    
    while (CHECKSUM === 0) {    // Don't know any other way. This is slow.

        if (!Position_Order[PositionGain].classList.contains(classNames)) {
        
            Position_Order[PositionGain].classList.add("Gain-place");
            Position_Order[PositionGain].classList.add("Gain-place-Animation");
    
            

            // setTimeout(function() {
            //     document.getElementById("Position_Box" + PositionLoss).classList.add("Gain-place-Animation");}, 2600);
        
            setTimeout(function() {
                Position_Order[PositionGain].classList.remove("Gain-place");
                Position_Order[PositionGain].classList.remove("Gain-place-Animation");}, 3000);
        break;  // For the while loop
        } 

        else if (Position_Order[PositionGain].classList.contains(classNames)) {
            Position_Order[PositionGain].classList.remove("Lose-place");
            Position_Order[PositionGain].classList.remove("Lose-place-Animation");

            CHECKSUM = 0;
        }
    }
}



function Position_Loss() {

    let PositionLoss = "";
    PositionLoss = Position_Loss_Input.value - 1;





    const classNames = ["Gain-place", "Lose-place"];
    let CHECKSUM = 0;
    
    while (CHECKSUM === 0) {

        if (!Position_Order[PositionLoss].classList.contains(classNames)) {
        
            Position_Order[PositionLoss].classList.add("Lose-place");
            Position_Order[PositionLoss].classList.add("Lose-place-Animation");
    
            CHECKSUM = 1;

            // setTimeout(function() {
            //     document.getElementById("Position_Box" + PositionLoss).classList.add("Lose-place-Animation");}, 2600);
        
            setTimeout(function() {
                Position_Order[PositionLoss].classList.remove("Lose-place");
                Position_Order[PositionLoss].classList.remove("Lose-place-Animation");}, 3000);
            
        break;
        } 

        else if (Position_Order[PositionLoss].classList.contains(classNames)) {
            Position_Order[PositionLoss].classList.remove("Gain-place");
            Position_Order[PositionLoss].classList.remove("Gain-place-Animation");

            CHECKSUM = 0;
        }
    }
}




function Failed_To_Finish() {
    /*DNF / DNS / Driver is out of the race / session */
    






}




Position_Gain_Input.addEventListener('change', () => {
    Position_Loss_Input.value = parseInt(Position_Gain_Input.value) + 1;
});



SubmitButton01.addEventListener("click", Position_Gain);
SubmitButton02.addEventListener("click", Position_Loss);

SubmitButton03.addEventListener("click", () => {
    Position_Gain();
    Position_Loss();
}, false);



