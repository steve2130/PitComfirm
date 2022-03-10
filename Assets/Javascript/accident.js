/*For controlling Yellow Flag / VSC / SC / SC Ending / Green Flag situation.*/
/*A alert will appear at the bottom of the lap counter.*/
/*Border of drivers' positions will also change to match each situtaion.*/
/*Good luck on maintaining this JS :)*/


/*Entire flex container*/
const Wrapper = document.getElementById("wrapper");

/*Lap Counter */
const Accident_Text_in_Lap_Counter = document.getElementById("Accident_Text_in_Lap_Counter");
const Lap_Counter_wrapper = document.getElementById("Lap_Counter_wrapper");
const Lap_Text = document.getElementById("Lap_Text");
const Lap_Count = document.getElementById("Lap_Count");

/*Situation*/
const Accident_situation = document.getElementById("accident-situation");

const VSC_symbol = document.getElementById("VSC_symbol");
const Accident_Flag_Symbol = document.getElementById("Accident_Flag_Symbol");
const AstonMartinSafetyCar = document.getElementById("AstonMartinSafetyCar");
const AstonMartinSafetyCarEnding = document.getElementById("AstonMartinSafetyCarEnding");

const Accident_Situation_text = document.getElementById("accident-situation-text");


/**/

function section() {
    let max = 3;
    let min = 1;

    let randomNumber = Math.floor(Math.random()*(max - min + 1) + min);
    let randomNumberPlusONE = randomNumber + 1;

    if (randomNumberPlusONE >= 4) {
        return randomNumber;
    }

    if (randomNumber == 1 && randomNumberPlusONE == 2) {
        return randomNumber + " & " + randomNumberPlusONE;
    }

    else if (randomNumber == 2 && randomNumberPlusONE == 3) {
        return randomNumber + " & " + randomNumberPlusONE;
    }

    else{
        parseInt(randomNumber);
        return randomNumber;
    }

}








/*Change Bottom Column*/
function SituationNormal() {
    Wrapper.style.borderTop = "0px solid transparent"
    Wrapper.style.borderLeft = "0px solid transparent"
    Wrapper.style.borderRight = "0px solid transparent"

    Lap_Counter_wrapper.style.transform = "translateX(0px)";
    Accident_Text_in_Lap_Counter.style.opacity = "0";
    Accident_Text_in_Lap_Counter.style.width = "0";
    Accident_Text_in_Lap_Counter.textContent = "";
    Accident_Text_in_Lap_Counter.style.color = "transparent";

    Lap_Text.style.color = "white";
    Lap_Count.style.color = "white";

    Accident_situation.style.height = "0";
    Accident_situation.style.opacity = "0";

    Accident_Situation_text.style.opacity = "0";

    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }

    VSC_symbol.style.display = "none";
}



function ChangeToYellowFlag() {
    Wrapper.style.borderTop = "0px solid transparent"
    Wrapper.style.borderLeft = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderRight = "0px solid transparent"

    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";

    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "YELLOW FLAG"
    Accident_Text_in_Lap_Counter.style.color = "rgb(253, 211, 0)";
    Lap_Text.style.color = "rgb(253, 211, 0)";
    Lap_Count.style.color = "rgb(253, 211, 0)";

    Accident_situation.style.height = "40px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "rgb(253, 211, 0)";
    Accident_situation.classList.add("situation-box-collasped");

    if (Accident_situation.classList.contains("situation-box-expaned")) {
        Accident_situation.classList.remove("situation-box-expaned");
    }




    VSC_symbol.style.display = "none";
    Accident_Flag_Symbol.style.fill = "black";


    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }
    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }

    Accident_Situation_text.style.opacity = "1";
    Accident_Situation_text.style.color = "black";
    Accident_Situation_text.classList.add("shorten-lower-portion-description-text");


    /*Just to have both type of yellow flags showing*/
    let sectionNumber = section();

    if (typeof sectionNumber === "string") {
        Accident_Situation_text.textContent = "SECTORS\u00A0\u00A0"+ sectionNumber;
    }   /* "\u00A0" as plain space (" ") doesn't work*/

    else if (typeof sectionNumber === "number") {
        Accident_Situation_text.textContent = "SECTOR\u00A0\u00A0"+ sectionNumber;
    }



    /*Animation*/
    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCarEnding.classList.remove("Symbol_Animation");

    AstonMartinSafetyCar.style.opacity = "0";
    AstonMartinSafetyCar.classList.remove("Symbol_Animation");

    Accident_Flag_Symbol.classList.add("Fade-In");
    Accident_Situation_text.classList.add("Text_Animation");
    Accident_Situation_text.classList.add("Fade-In");

        setTimeout(function() {

            Accident_Flag_Symbol.classList.remove("Fade-In");
            Accident_Situation_text.classList.remove("Text_Animation");
            Accident_Situation_text.classList.remove("Fade-In");}, 300);


}







function ChangeToGreenFlag() {

    Wrapper.style.borderTop = "0px solid transparent"
    Wrapper.style.borderLeft = "10px solid rgb(0, 210, 0)"
    Wrapper.style.borderRight = "0px solid transparent"



    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";
    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "GREEN FLAG"
    Accident_Text_in_Lap_Counter.style.color = "rgb(0, 210, 0)"
    Lap_Text.style.color = "white";
    Lap_Count.style.color = "white";



    Accident_situation.style.height = "40px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "rgb(0, 210, 0)";
    Accident_situation.classList.add("situation-box-collasped");

    if (Accident_situation.classList.contains("situation-box-expaned")) {
        Accident_situation.classList.remove("situation-box-expaned");
    }

    VSC_symbol.style.display = "none";
    Accident_Flag_Symbol.style.fill = "black";
    Accident_Situation_text.style.color = "black";

    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCar.style.opacity = "0";

    Accident_Situation_text.textContent = "TRACK CLEAR";
    Accident_Situation_text.style.opacity= "1";


    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }
    Accident_Situation_text.classList.add("shorten-lower-portion-description-text");


    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }


    /*Animation*/
    Accident_Flag_Symbol.classList.add("Fade-In");
    Accident_Situation_text.classList.add("Fade-In");

    setTimeout(function() {
        Accident_Flag_Symbol.classList.remove("Fade-In");
        Accident_Situation_text.classList.remove("Text_Animation");
        Accident_Situation_text.classList.remove("Fade-In");}, 300);
    
}








function ChangeToVSC() {
    Wrapper.style.borderTop = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderRight = "10px solid rgb(253, 211, 0)"

    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";

    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "VIRTUAL SAFETY CAR"
    Accident_Text_in_Lap_Counter.style.color = "rgb(253, 211, 0)";
    Lap_Text.style.color = "rgb(253, 211, 0)";
    Lap_Count.style.color = "rgb(253, 211, 0)";


    Accident_situation.style.height = "100px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "rgb(253, 211, 0)";
    Accident_situation.classList.add("situation-box-expaned");

    if (Accident_situation.classList.contains("situation-box-collasped")) {
        Accident_situation.classList.remove("situation-box-collasped");
    }

    VSC_symbol.style.display = "block";
    Accident_Flag_Symbol.style.fill = "black";


    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }
    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }

    Accident_Situation_text.style.opacity = "1";
    Accident_Situation_text.style.color = "black";
    Accident_Situation_text.textContent = "INCIDENT";
    Accident_Situation_text.classList.remove("accident-ending-text");



    /*Animation*/
    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCarEnding.classList.remove("Symbol_Animation");

    AstonMartinSafetyCar.style.opacity = "0";
    AstonMartinSafetyCar.classList.remove("Symbol_Animation");

    VSC_symbol.classList.add("Symbol_Animation");

    Accident_Flag_Symbol.classList.add("Symbol_Animation");
    Accident_Situation_text.classList.add("Text_Animation");

        setTimeout(function() {
            AstonMartinSafetyCar.classList.remove("Symbol_Animation");
            Accident_Flag_Symbol.classList.remove("Symbol_Animation");
            VSC_symbol.classList.remove("Symbol_Animation");
            Accident_Situation_text.classList.remove("Text_Animation");}, 300);

}





function ChangeToSC() {
    Wrapper.style.borderTop = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderRight = "10px solid rgb(253, 211, 0)"

    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";

    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "SAFETY CAR"
    Accident_Text_in_Lap_Counter.style.color = "rgb(253, 211, 0)";
    Lap_Text.style.color = "rgb(253, 211, 0)";
    Lap_Count.style.color = "rgb(253, 211, 0)";


    Accident_situation.style.height = "100px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "rgb(253, 211, 0)";
    Accident_situation.classList.add("situation-box-expaned");


    if (Accident_situation.classList.contains("situation-box-collasped")) {
        Accident_situation.classList.remove("situation-box-collasped");
    }


    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }

    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }

    Accident_Situation_text.style.color = "black";
    Accident_Situation_text.style.opacity = "1";
    Accident_Situation_text.textContent = "INCIDENT";

    VSC_symbol.style.display = "none";
    Accident_Flag_Symbol.style.fill = "black";



    /*Animation*/
    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCarEnding.classList.remove("Symbol_Animation");

    AstonMartinSafetyCar.style.opacity = "1";
    AstonMartinSafetyCar.classList.add("Symbol_Animation");

    Accident_Flag_Symbol.classList.add("Symbol_Animation");
    Accident_Situation_text.classList.add("Text_Animation");

        setTimeout(function() {
            AstonMartinSafetyCar.classList.remove("Symbol_Animation");
            Accident_Flag_Symbol.classList.remove("Symbol_Animation");
            Accident_Situation_text.classList.remove("Text_Animation");}, 300);

}



function ChangeToSCEnding() {
    Wrapper.style.borderTop = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderRight = "10px solid rgb(253, 211, 0)"

    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";

    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "SAFETY CAR"
    Accident_Text_in_Lap_Counter.style.color = "rgb(253, 211, 0)";
    Lap_Text.style.color = "rgb(253, 211, 0)";
    Lap_Count.style.color = "rgb(253, 211, 0)";

    Accident_situation.style.height = "100px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "black";
    Accident_situation.classList.add("situation-box-expaned");

    VSC_symbol.style.display = "none";
    Accident_Flag_Symbol.style.fill = "rgb(253, 211, 0)";

    if (Accident_situation.classList.contains("situation-box-collasped")) {
        Accident_situation.classList.remove("situation-box-collasped");
    }
    

    Accident_Situation_text.textContent = "ENDING";
    Accident_Situation_text.classList.add("accident-ending-text");

    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }

    Accident_Situation_text.style.opacity = "1";
    Accident_Situation_text.style.color = "rgb(253, 211, 0)";


    /*Animation*/
    AstonMartinSafetyCar.style.opacity = "0";
    AstonMartinSafetyCar.classList.remove("Symbol_Animation");

    AstonMartinSafetyCarEnding.style.opacity = "1";
    AstonMartinSafetyCarEnding.classList.add("Symbol_Animation");

    Accident_Flag_Symbol.classList.add("Symbol_Animation");
    Accident_Situation_text.classList.add("Text_Animation");

        setTimeout(function() {
            AstonMartinSafetyCar.classList.remove("Symbol_Animation");
            Accident_Flag_Symbol.classList.remove("Symbol_Animation");
            Accident_Situation_text.classList.remove("Text_Animation");}, 300);

}









function ChangeToRedFlag() {
    Wrapper.style.borderTop = "10px solid rgb(204, 25, 25)"
    Wrapper.style.borderLeft = "10px solid rgb(204, 25, 25)"
    Wrapper.style.borderRight = "10px solid rgb(204, 25, 25)"

    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";

    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "RED FLAG"
    Accident_Text_in_Lap_Counter.style.color = "rgb(204, 25, 25)";
    Lap_Text.style.color = "rgb(204, 25, 25)";
    Lap_Count.style.color = "rgb(204, 25, 25)";

    Accident_situation.style.height = "100px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "rgb(204, 25, 25)";
    Accident_situation.classList.add("situation-box-expaned");


    if (Accident_situation.classList.contains("situation-box-collasped")) {
        Accident_situation.classList.remove("situation-box-collasped");
    }
    



    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }
    
    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }

    Accident_Situation_text.classList.add("accident-text");
    Accident_Situation_text.style.opacity = "1";
    Accident_Situation_text.textContent = "SESSION STOPPED";
    Accident_Situation_text.style.color = "white";


    VSC_symbol.style.display = "none";
    Accident_Flag_Symbol.style.fill = "white";

    AstonMartinSafetyCar.style.opacity = "0";
    AstonMartinSafetyCar.classList.remove("Symbol_Animation");

    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCarEnding.classList.remove("Symbol_Animation");

    /*Animation*/
    Accident_Flag_Symbol.classList.add("Symbol_Animation");
    Accident_Situation_text.classList.add("Text_Animation");

        setTimeout(function() {
            AstonMartinSafetyCar.classList.remove("Symbol_Animation");
            Accident_Flag_Symbol.classList.remove("Symbol_Animation");
            Accident_Situation_text.classList.remove("Text_Animation");}, 300);

}














function ChangeToSafetyCarIN() {

    Wrapper.style.borderTop = "10px solid rgb(0, 210, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(0, 210, 0)"
    Wrapper.style.borderRight = "10px solid rgb(0, 210, 0)"



    Lap_Counter_wrapper.style.transform = "translateX(calc(100vw - 246px))";
    Accident_Text_in_Lap_Counter.style.opacity = "1";
    Accident_Text_in_Lap_Counter.style.width = "fit-content";
    Accident_Text_in_Lap_Counter.textContent = "GREEN FLAG"
    Accident_Text_in_Lap_Counter.style.color = "rgb(0, 210, 0)"
    Lap_Text.style.color = "white";
    Lap_Count.style.color = "white";



    Accident_situation.style.height = "40px";
    Accident_situation.style.opacity = "1";
    Accident_situation.style.backgroundColor = "rgb(0, 210, 0)";
    Accident_situation.classList.add("situation-box-collasped");

    if (Accident_situation.classList.contains("situation-box-expaned")) {
        Accident_situation.classList.remove("situation-box-expaned");
    }

    VSC_symbol.style.display = "none";
    Accident_Flag_Symbol.style.fill = "black";
    Accident_Situation_text.style.color = "black";

    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCar.style.opacity = "0";

    Accident_Situation_text.textContent = "SAFETY CAR IN";
    Accident_Situation_text.style.opacity= "1";


    if (Accident_Situation_text.classList.contains("shorten-lower-portion-description-text")) {
        Accident_Situation_text.classList.remove("shorten-lower-portion-description-text");
    }

    Accident_Situation_text.classList.add("shorten-lower-portion-description-text");


    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }

    /*Animation*/
    Accident_Flag_Symbol.classList.add("Fade-In");
    Accident_Situation_text.classList.add("Fade-In");

    setTimeout(function() {
        Accident_Flag_Symbol.classList.remove("Fade-In");
        Accident_Situation_text.classList.remove("Text_Animation");
        Accident_Situation_text.classList.remove("Fade-In");}, 300);

}