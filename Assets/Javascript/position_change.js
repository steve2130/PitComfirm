const Position_Gain_Input = document.getElementById("Position_Gain_Input");
const Position_Loss_Input = document.getElementById("Position_Loss_Input");
const SubmitButton01 = document.getElementById("submitButton1");
const SubmitButton02 = document.getElementById("submitButton2");
const SubmitButton03 = document.getElementById("submitButton3");



function Position_Gain() {
    let PositionGain = "";

    PositionGain = Position_Gain_Input.value;
    PositionGain = PositionGain.toString().padStart(2, '0'); //It is a fucking string, stop changing it!


    const classNames = ["Gain-place", "Lose-place"];
    let CHECKSUM = 0;
    
    while (CHECKSUM === 0) {    // Don't know any other way. This is slow.

        if (!classNames.some(classNames => document.getElementById("Position_Box" + PositionGain).classList.contains(classNames))) {
        
            document.getElementById("Position_Box" + PositionGain).classList.add("Gain-place");
            document.getElementById("Position_Box" + PositionGain).classList.add("Gain-place-Animation");
    
            

            // setTimeout(function() {
            //     document.getElementById("Position_Box" + PositionLoss).classList.add("Gain-place-Animation");}, 2600);
        
            setTimeout(function() {
                document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place");
                document.getElementById("Position_Box" + PositionGain).classList.remove("Gain-place-Animation");}, 3000);

            break;  // Is it better than CHECKSUM = 1; ?
                
        } 

        else if (classNames.some(classNames => document.getElementById("Position_Box" + PositionGain).classList.contains(classNames))) {
            document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place");
            document.getElementById("Position_Box" + PositionGain).classList.remove("Lose-place-Animation");

            CHECKSUM = 0;
        }
    }
}



function Position_Loss() {

    let PositionLoss = "";
    PositionLoss = Position_Loss_Input.value;

    PositionLoss = PositionLoss.toString().padStart(2, '0'); //It is a fucking string, stop changing it!




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
            
            break;
        } 

        else if (classNames.some(classNames => document.getElementById("Position_Box" + PositionLoss).classList.contains(classNames))) {
            document.getElementById("Position_Box" + PositionLoss).classList.remove("Gain-place");
            document.getElementById("Position_Box" + PositionLoss).classList.remove("Gain-place-Animation");

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



