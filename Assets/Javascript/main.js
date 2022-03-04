const Accident_situation = document.getElementById("accident-situation");
const Accident_Situation_text = document.getElementById("accident-situation-text");
const Accident_Flag_Symbol = document.getElementById("Accident_Flag_Symbol");

const Button = document.querySelector("#button");
const Wrapper = document.getElementById("wrapper");

const AstonMartinSafetyCar = document.getElementById("AstonMartinSafetyCar");
const AstonMartinSafetyCarEnding = document.getElementById("AstonMartinSafetyCarEnding");



function ChangeToEnding() {

    Accident_situation.style.backgroundColor = "black";
    Accident_Situation_text.textContent = "ENDING";
    Accident_Situation_text.classList.add("accident-ending-text");
    Accident_Flag_Symbol.style.fill = "rgb(253, 211, 0)";
    Wrapper.style.border = "10px solid rgb(253, 211, 0)"

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


function ChangeToSC() {


    Accident_Situation_text.textContent = "INCIDENT";
    Accident_situation.style.backgroundColor = "rgb(253, 211, 0)";
    Accident_Situation_text.classList.remove("accident-ending-text");
    Accident_Flag_Symbol.style.fill = "black";
    Wrapper.style.border = "10px solid rgb(253, 211, 0)"

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



function ChangeToGreenFlag() {
    
}