const Accident_situation = document.getElementById("accident-situation");
const Accident_Situation_text = document.getElementById("accident-situation-text");
const Accident_Flag_Symbol = document.getElementById("Accident_Flag_Symbol");
const Button = document.querySelector("#button");


function ChangeToEnding() {
    Accident_situation.style.backgroundColor = "black";
    Accident_Situation_text.textContent = "ENDING";
    Accident_Situation_text.classList.add("accident-ending-text");
    Accident_Flag_Symbol.style.fill = "rgb(253, 211, 0)";

    Button.addEventListener("click", ChangeState);
}


function ChangeToSC() {
    Accident_Situation_text.textContent = "INCIDENT";
    Accident_situation.style.backgroundColor = "rgb(253, 211, 0)";
    Accident_Situation_text.classList.remove("accident-ending-text");
    Accident_Flag_Symbol.style.fill = "black";


}