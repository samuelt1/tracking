import { Component } from "@angular/core";
import permissions = require("nativescript-permissions");
import geolocation = require("nativescript-geolocation");
import utils = require("utils/utils");
var ServiceHelper = require("./service-helper");
declare var android: any;

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public counter: number = 16;
    public long: number = 0;
    public lat: number = 0;

    private loc: any;
    private context:any = utils.ad.getApplicationContext();

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }

    public get longitude(): string {
        if (this.long == 0) {
            return "please press tap to get longitude";
        } else {
            return "longitude is: "+ this.long;
        }
    }

    public get latitude(): string {
        if (this.lat == 0) {
            return "please press tap to get latitude";
        } else {
            return "latitude is: "+ this.lat;
        }
    }
    
    public startServices(){
        console.log("setupGPS started");
        ServiceHelper.setupGPS(this.context);
        console.log("setupGPS ended");
    }

    public onTap() {
        // ServiceHelper.setupGPS(this.context);
        this.counter--;
        var _this = this
        permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, "I need these persions because I'm cool")
            .then(function(a) {
                console.log("Woo Hoo, I have the power!");
                _this.loc = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 200000, timeout: 20000});
                _this.loc.then(function(location){
                    if(location){
                        _this.long = location.longitude;
                        _this.lat = location.latitude;
                    }
                });
            })
            .catch(function(a) {
                console.log(a.message);
            });
    }
}
