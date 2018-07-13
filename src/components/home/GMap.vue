<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "@/firebase/init";

export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data();
          if(data.geolocation) {
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng,
              },
              map,
            });
            // add click event to marker
            marker.addListener('click', () => {
              this.$router.push({ name: 'ViewProfile', params: { id: doc.id }})
            })
          }
        })
      })
    }
  },
  // We want to create a map AFTER the DOM is created so we can touch it
  // => mounted() will satisfy
  mounted() {
    // get current user
    let user = firebase.auth().currentUser;

    // get geolocation
    if (navigator.geolocation) {
      // will prompt user to know location
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          // find user record
          db.collection('users').where('user_id', '==', user.uid).get()
          // returns a snapshot of the record
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection('users').doc(doc.id).update({
                  geolocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  }
                })
              });
            }).then(() => {
              // update geolocation
              this.renderMap();
            })

        },
        err => {
          console.log(err);
          this.renderMap();
        },
        {
          // looks for cached location of the user
          maximumAge: 6000,
          // if it fails then we will just render with default location
          timeout: 4500
        }
      );
    } else {
      this.renderMap();
    }
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
