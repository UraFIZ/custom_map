const plus = document.querySelector("div.tool.plus");
const minus = document.querySelector("div.tool.minus");
const refreshbtn = document.querySelector(".refresh")
const map = document.querySelector(".map_img");
 //pins
 const pins = document.querySelectorAll(".pin");
 const pin_mountings = document.querySelector(".pin_mountings");
 const pin_close = document.querySelector(".pin_red--closer");
 const pin_elevator = document.querySelector(".pin_elevator");
 const pin_bag = document.querySelector(".pin_bag");
 const pin_in = document.querySelector(".pin_in-jan");
 const pin_farther = document.querySelector(".pin_red--farther");
 const pin_rhomb = document.querySelector(".pin_rhomb")

 //modal
const modal = document.querySelector(".modal");


pins.forEach((item) => {
    item.addEventListener("mouseover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        let x = e.clientX  - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop - 50;
        console.log("clinetX", e.clientX)
        console.log("clinetY", e.clientY)
        console.log("offsetLeft", e.target.offsetLeft)
        console.log("offsetTop", e.target.offsetTop)
        const first = this.querySelector("span .first").innerText;
        const second = this.querySelector("span .second").innerText;
        modal.querySelector(".first-p").innerText = first;
        modal.querySelector(".second-p").innerText = second
        modal.style.display = "block";
        modal.style.top = `${y}px`
        modal.style.left = `${e.clientX - 60}px`

    })
    item.addEventListener("mouseout", function(e) {
        modal.style.display = "none"; 
    })
})


function zoomIn() {
    let step = 273;
    let topStep = -75
    let leftStep = -120;
    plus.addEventListener("click", function(){
        map.style.width = `${map.clientWidth + step}px`
        map.style.top = `${map.offsetTop + topStep}px`
        map.style.left = `${map.offsetLeft + leftStep}px`
        changePinsPosition("zoomIn");

    })
}
zoomIn()

function zoomOut() {
    let step = 273;
    let topStep = 75;
    let leftStep = 120;
    minus.addEventListener("click", function() {
        if(map.clientWidth > 881) {
            map.style.width = `${map.clientWidth - step}px`
            map.style.top = `${map.offsetTop + topStep}px`
            map.style.left = `${map.offsetLeft + leftStep}px`
            changePinsPosition("zoomOut")
        }
    })
}
zoomOut()

function refresh() {
    refreshbtn.addEventListener("click", function() {
        map.style.width = "880px";
        map.style.top = "0px";
        map.style.left = "0px";
        changePinsPosition();
    })
}
refresh()

function changePinsPosition(arg) {
    if(arg == "zoomIn") {
        pin_mountings.style.top = `${pin_mountings.offsetTop - 9}px`
        pin_mountings.style.left = `${pin_mountings.offsetLeft + 51}px`

        pin_close.style.top = `${pin_close.offsetTop - 1}px`
        pin_close.style.left = `${pin_close.offsetLeft + 52}px`

        pin_elevator.style.top = `${pin_elevator.offsetTop - 20}px`
        pin_elevator.style.left = `${pin_elevator.offsetLeft + 54}px`

        pin_bag.style.top = `${pin_bag.offsetTop - 28}px`
        pin_bag.style.left = `${pin_bag.offsetLeft + 39}px`

        pin_in.style.top = `${pin_in.offsetTop - 18}px`
        pin_in.style.left = `${pin_in.offsetLeft + 33}px`

        pin_farther.style.top = `${pin_farther.offsetTop -17}px`
        pin_farther.style.left = `${pin_farther.offsetLeft + 22}px`

        pin_rhomb.style.top = `${pin_rhomb.offsetTop - 19}px`
        pin_rhomb.style.left = `${pin_rhomb.offsetLeft + 15}px`
    }else if (arg == "zoomOut"){
        pin_mountings.style.top = `${pin_mountings.offsetTop + 9}px`
        pin_mountings.style.left = `${pin_mountings.offsetLeft - 51}px`

        pin_close.style.top = `${pin_close.offsetTop + 1}px`
        pin_close.style.left = `${pin_close.offsetLeft - 52}px`

        pin_elevator.style.top = `${pin_elevator.offsetTop + 20}px`
        pin_elevator.style.left = `${pin_elevator.offsetLeft - 54}px`

        pin_bag.style.top = `${pin_bag.offsetTop + 28}px`
        pin_bag.style.left = `${pin_bag.offsetLeft - 39}px`

        pin_in.style.top = `${pin_in.offsetTop + 18}px`
        pin_in.style.left = `${pin_in.offsetLeft - 33}px`

        pin_farther.style.top = `${pin_farther.offsetTop +17}px`
        pin_farther.style.left = `${pin_farther.offsetLeft - 22}px`
        
        pin_rhomb.style.top = `${pin_rhomb.offsetTop + 19}px`
        pin_rhomb.style.left = `${pin_rhomb.offsetLeft - 15}px`
    } else {
        pin_mountings.style.top = "148.808px"
        pin_mountings.style.left = "534.738px"

        pin_close.style.top = "194.398px"
        pin_close.style.left = "536.53px"

        pin_elevator.style.top = "126.778px"
        pin_elevator.style.left = "531.378px"

        pin_bag.style.top = "87.494px"
        pin_bag.style.left = "478.57px"

        pin_in.style.top = "124.202px"
        pin_in.style.left = "470.198px"

        pin_farther.style.top = "129.998px"
        pin_farther.style.left = "437.354px"

        pin_rhomb.style.top = "122.27px"
        pin_rhomb.style.left = "414.17px"
    }

}

