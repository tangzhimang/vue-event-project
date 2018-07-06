<template>
      <!-- start content -->
  <div class="content">
            <!-- start block -->		
        <div class="block">
          <div class="container">
              <h2 class="headline">Google Map</h2>
                <span class="line">
                  <span class="sub-line"></span>
                </span>
          <div class="row">
            <div class="col-md-12">
                <h3>The Google Map Sample Demo</h3>
                <br /><br />
                <p>
                    <GmapMap
                    ref="mapRef"
                    :center="position"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 500px; height: 300px"
                    >
                    <!-- <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                    /> -->
                    <GmapMarker
                    :position="{lat: 1.38, lng: 103.80}"
                    :clickable="true"
                    :draggable="true"
                    @click="center={lat: 1.38, lng: 103.80}"
                    />
                     <GmapMarker ref="myMarker"
                        :position="google && new google.maps.LatLng(1.9, 103.8)" />
                    </GmapMap>
                </p>
          </div>
            <div class="col-md-6">  
          </div>
          </div> 
        </div>
        </div>
        <!-- end block -->  
  </div>
  <!-- end content -->
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
export default {
     name: 'index',
     data() {
       return {
         position: {lat:22.321971, lng:114},
         markers: [ 
           {
             m:{
               position: {lat:22.321971, lng:114}
               },
            index: 1
           },
           {
             m:{
               position: {lat:1.38, lng:103.80}
               },
            index: 2
           }
         ]
       }
     },
     computed: {
       google: gmapApi
     },
     mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat: 1.38, lng: 103.80})
      console.log('map:'+map.getMapTypeId())
    })
  }
     
}
</script>

<style scoped>

</style>
