

export function initMap(){
        console.log("initMap");
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 8.48059, lng: -11.8085401},
          mapTypeId: 'terrain'
        });
        return map;
      }