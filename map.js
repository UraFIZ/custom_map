const topoPlan = document.querySelector(".topo-plan");
const ThreeDPlan = document.querySelector(".threeD-map");
const mapId = document.getElementById("mapid");
const btns = document.querySelectorAll(".btn");
const mapWrapper = document.querySelector(".map_wrapper");

function togglePlans(btns=[]) {
    btns.forEach(item => {
        let counter = 0;
          if(item.classList.contains("topo-plan") && !item.classList.contains("hidden")){
             item.addEventListener("click", function(){
                if(counter < 1) {
                    createMap()
                }
                mapId.classList.remove("hidden");
                mapWrapper.classList.add("hidden")
                this.classList.add("hidden");
                this.parentElement.querySelector(".threeD-map").classList.remove("hidden")
                counter++;
             })
          }
           if(item.classList.contains("threeD-map")) {
            item.addEventListener("click", function() {
                mapId.classList.add("hidden");
                mapWrapper.classList.remove("hidden");
                this.classList.add("hidden")
                this.parentElement.querySelector(".topo-plan").classList.remove("hidden")
            })
          }
    })
}
togglePlans(btns)

function createMap() {
    var mymap = L.map('mapid').setView([45.573779, 6.77902], 15);
    createPinGroup(mymap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXJhZml6IiwiYSI6ImNrYWJ1Z2N3djFhMWEydG1rZ21iaGt3cXgifQ.SdNy6P6N5RA5qhrzEMvdlw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        zoom: 25,
        tileSize: 512,
        zoomOffset: -1,
        id: 'mapbox/streets-v11',
        tileSize: 512
    }).addTo(mymap);
    var marker = L.icon({ iconUrl: './assest/icon/marker-asr.png', iconSize: [51, 73]}); 
    var marker = L.marker([45.573779, 6.77902], { icon: marker }).addTo(mymap);
}

function createPinGroup(map) {
   const markerGroup =  Data.poiData.map(item => {
       const geo = item.geo;
        return L.marker([geo.lat, geo.lon]).addTo(map).bindPopup(item.title).openPopup();
    })
}

