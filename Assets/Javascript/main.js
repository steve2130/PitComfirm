/*Entire flex container*/
const Wrapper = document.getElementById("wrapper");

/*Lap Counter */
const Accident_Text_in_Lap_Counter = document.getElementById("Accident_Text_in_Lap_Counter");
const Lap_Text = document.getElementById("Lap_Text");
const Lap_Count = document.getElementById("Lap_Count");

/*Situation*/
const Accident_situation = document.getElementById("accident-situation");

const Accident_Flag_Symbol = document.getElementById("Accident_Flag_Symbol");
const AstonMartinSafetyCar = document.getElementById("AstonMartinSafetyCar");
const AstonMartinSafetyCarEnding = document.getElementById("AstonMartinSafetyCarEnding");

const Accident_Situation_text = document.getElementById("accident-situation-text");


/**/
const Button = document.querySelector("#button");




function SituationNormal() {
    Wrapper.style.borderTop = "0px solid transparent"
    Wrapper.style.borderLeft = "0px solid transparent"
    Wrapper.style.borderRight = "0px solid transparent"

    


}



function ChangeToSC() {
    Wrapper.style.borderTop = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderRight = "10px solid rgb(253, 211, 0)"



    Accident_Text_in_Lap_Counter.textContent = "SAFETY CAR"
    Accident_Text_in_Lap_Counter.style.color = "rgb(253, 211, 0)";
    Lap_Text.style.color = "rgb(253, 211, 0)";
    Lap_Count.style.color = "rgb(253, 211, 0)";


    Accident_situation.style.backgroundColor = "rgb(253, 211, 0)";
    Accident_situation.classList.add("situation-box-expaned");

    if (Accident_situation.classList.contains("situation-box-collasped")) {
        Accident_situation.classList.remove("situation-box-collasped");
    }

    if (Accident_Situation_text.classList.contains("safety-car-in-text")) {
        Accident_Situation_text.classList.remove("safety-car-in-text");
    }


    Accident_Flag_Symbol.style.fill = "black";

    Accident_Situation_text.textContent = "INCIDENT";
    Accident_Situation_text.classList.remove("accident-ending-text");



    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCarEnding.classList.remove("Symbol_Animation");

    AstonMartinSafetyCar.style.opacity = "1";
    AstonMartinSafetyCar.classList.add("Symbol_Animation");

    Accident_Flag_Symbol.classList.add("Symbol_Animation");
    Accident_Situation_text.classList.add("Text_Animation");

        setTimeout(function() {
            Accident_Flag_Symbol.classList.remove("Symbol_Animation");
            Accident_Situation_text.classList.remove("Text_Animation");}, 300);

}



function ChangeToEnding() {
    Wrapper.style.borderTop = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(253, 211, 0)"
    Wrapper.style.borderRight = "10px solid rgb(253, 211, 0)"

    Accident_Text_in_Lap_Counter.textContent = "SAFETY CAR"
    Accident_Text_in_Lap_Counter.style.color = "rgb(253, 211, 0)";
    Lap_Text.style.color = "rgb(253, 211, 0)";
    Lap_Count.style.color = "rgb(253, 211, 0)";


    Accident_situation.style.backgroundColor = "black";
    Accident_situation.classList.add("situation-box-expaned");

    if (Accident_situation.classList.contains("situation-box-collasped")) {
        Accident_situation.classList.remove("situation-box-collasped");
    }
    

    Accident_Situation_text.textContent = "ENDING";
    Accident_Situation_text.classList.add("accident-ending-text");

    if (Accident_Situation_text.classList.contains("safety-car-in-text")) {
        Accident_Situation_text.classList.remove("safety-car-in-text");
    }


    Accident_Flag_Symbol.style.fill = "rgb(253, 211, 0)";

    AstonMartinSafetyCar.style.opacity = "0";
    AstonMartinSafetyCar.classList.remove("Symbol_Animation");

    AstonMartinSafetyCarEnding.style.opacity = "1";
    AstonMartinSafetyCarEnding.classList.add("Symbol_Animation");




    Accident_Flag_Symbol.classList.add("Symbol_Animation");
    Accident_Situation_text.classList.add("Text_Animation");

        setTimeout(function() {
            Accident_Flag_Symbol.classList.remove("Symbol_Animation");
            Accident_Situation_text.classList.remove("Text_Animation");}, 300);

    Button.addEventListener("click", ChangeState);   
}





function ChangeToGreenFlag() {

    Wrapper.style.borderTop = "10px solid rgb(0, 210, 0)"
    Wrapper.style.borderLeft = "10px solid rgb(0, 210, 0)"
    Wrapper.style.borderRight = "10px solid rgb(0, 210, 0)"




    Accident_Text_in_Lap_Counter.textContent = "GREEN FLAG"
    Accident_Text_in_Lap_Counter.style.color = "rgb(0, 210, 0)"
    Lap_Text.style.color = "white";
    Lap_Count.style.color = "white";

    Accident_situation.classList.add("situation-box-collasped");

    if (Accident_situation.classList.contains("situation-box-expaned")) {
        Accident_situation.classList.remove("situation-box-expaned");
    }

    Accident_Flag_Symbol.style.fill = "black";

    AstonMartinSafetyCarEnding.style.opacity = "0";
    AstonMartinSafetyCar.style.opacity = "0";

    Accident_Situation_text.textContent = "SAFETY CAR IN";
    Accident_Situation_text.classList.add("safety-car-in-text");
    if (Accident_Situation_text.classList.contains("accident-ending-text")) {
        Accident_Situation_text.classList.remove("accident-ending-text");
    }
    




}