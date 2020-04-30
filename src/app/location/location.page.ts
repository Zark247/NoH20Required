import { Component, OnInit } from '@angular/core';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker, MyLocation, GoogleMapsAnimation, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latPosition
  longPosition
  map
  mapType

  constructor(public geoLocation:Geolocation,
    public platform:Platform,
    public router:Router) {}

  async ngOnInit() {

    this.mapType = GoogleMapsMapTypeId.ROADMAP

    await this.geoLocation.getCurrentPosition().then(pos => {
      this.latPosition = pos.coords.latitude
      this.longPosition = pos.coords.longitude
    }).catch((error) => {
      console.log("Error getting location", error)
      alert("Error getting location: "+error)
    })
    
    await this.platform.ready().then(() => 
      this.loadMap())
  }

  home() {
    this.router.navigate(['/home'])
  }

  sendLoc() {
    console.log("Latitude: "+this.latPosition)
    console.log("Longitude: "+this.longPosition)
    alert("Coordinates: "+this.latPosition+" x "+this.longPosition+" sent to friend.")
    this.router.navigate(['/home'])
  }

  async onTypeSelect(type) {
    this.mapType = (<HTMLSelectElement>document.getElementById("mapType")).value
    await this.platform.ready().then(() => 
      this.loadMap())
  }

  loadMap() {
    this.map = GoogleMaps.create('map', {
      mapType: this.mapType
    })
    this.map.one(GoogleMapsEvent.MAP_READY).then((data:any) => {
      /* const coordinates:LatLng = new LatLng(this.latPosition, this.longPosition)
      map.setCameraTarget(coordinates)
      map.setCameraZoom(15) */

      this.map.getMyLocation().then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
        let marker: Marker = this.map.addMarkerSync({
          title: 'Your Location',
          //snippet: 'This plugin is awesome!',
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        })
        marker.showInfoWindow()
      })
    })
  }

}
