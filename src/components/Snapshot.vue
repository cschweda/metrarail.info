<template>
  <div class="mt-5">
    <div class="text-xs-right" style="font-size: 12px; font-weight: bold;">
      Data polled: {{fetched}}
      <br>
      <span style="color: #999">Metra's GTFS API provides updated data every 30 seconds.</span>
    </div>
    <GmapMap
      :center="center"
      :zoom="9"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      class="mt-2"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
      <gmap-marker
        :key="i"
        v-for="(m,i) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfoWindow(m,i)"
      ></gmap-marker>
    </GmapMap>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    positions: {
      type: Array
    },
    tripUpdates: {
      type: Array
    }
  },
  created() {},
  mounted() {
    this.setMarkers();
    this.fetched = moment().format("ddd, MMMM DD, YYYY hh:mm:ss a");
  },
  data() {
    return {
      fetched: "",

      isLoadingPositions: false,
      center: {
        lat: 41.881832,
        lng: -87.98177
      },
      infoContent: "",
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },

      markers: null
    };
  },
  computed: {},
  methods: {
    setMarkers() {
      this.markers = [];
      this.positions.forEach(p => {
        let obj = {};
        obj["infoText"] = `<span style="font-weight: bold">${
          p.vehicle.trip.trip_id
        }</style>`;
        obj["position"] = {};
        obj["position"]["lat"] = Number(p.vehicle.position.latitude);
        obj["position"]["lng"] = Number(p.vehicle.position.longitude);
        this.markers.push(obj);
      });
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  }
};
</script>