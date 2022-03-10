/*For nav toggle expand / retract*/
const navButton = document.getElementById("nav_button");
const navBar = document.getElementById("navBar");
const navList = document.querySelectorAll("#navList");

navButton.addEventListener("change", function() {
    if (navButton.checked) {
        navBar.style.height = "100px";

        for (let i = 0, length = navList.length; i < length; i++) {
            navList[i].classList.replace("nav_list", "nav_list_expanded");
        }
        
    }

    else {
        navBar.style.height = "38px";

        for (let i = 0, length = navList.length; i < length; i++) {
            navList[i].classList.replace("nav_list_expanded", "nav_list");
        }
        
    }
});

/*__________________________________________________________________________________________ */


    /*For the clock in nav bar*/
    function GETDateandTime() {
        let date = new Date();

        let option = { hour12: false };
        let HKT = "zh-HK"

        let LocalDate = date.toLocaleTimeString(HKT, option);
        

        const timeCounter = document.getElementById("timeCounter");
        timeCounter.innerHTML = LocalDate;
    }

    setInterval (GETDateandTime, 1000);

/*__________________________________________________________________________________________ */


    /*For switching from DAY / TIME / LAP on lap cpunter */

    