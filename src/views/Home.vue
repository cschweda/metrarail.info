<template>
  <div>
    <v-layout row wrap>
      <v-container>
        <h1 class="rule mt-2">Alerts</h1>
        <div v-if="isLoadingAlerts">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else v-for="(alert) in alerts" :key="alert.id" class="mt-4">
          <v-card color="red darken-3" class="white--text">
            <v-card-title primary-title>
              <div>{{fullTime(alert.alert.active_period[0].start.low)}}</div>
            </v-card-title>
            <div class="pl-3 pr-3 pb-3">{{alert.alert.header_text.translation[0].text}}</div>
          </v-card>
        </div>

        <h1 class="rule mt-5">Positions</h1>
        <div v-if="positions.length > 0 && tripUpdates.length > 0">
          <snapshot :positions="positions" :tripUpdates="tripUpdates"></snapshot>
        </div>

        <div v-if="isLoadingPositions">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else v-for="(position) in positions" :key="position.id" class="mt-3">
          <v-card color="white" class="black--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{position.vehicle.trip.trip_id}}</div>
              </div>
            </v-card-title>
            <div
              class="pl-3 pr-3 pb-1"
            >Lat: {{position.vehicle.position.latitude}} / Long: {{position.vehicle.position.longitude}}</div>
            <div class="pl-3 pb-3 pr-3" style="font-size: 10px; text-transform: uppercase">
              <div
                style="color: #444 !important; font-weight: 900; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin-bottom: 12px"
                class="pt-1"
              >Trip updates:&nbsp;</div>
              <div class="mt-3">{{tripUpdate(position.vehicle.trip.trip_id, 'status')}}</div>

              <div
                style="margin-top: 15px !important;color: #444 !important; font-weight: 900"
                class="text-xs-right pr-3"
              >Position last updated:&nbsp;{{dayTime(position.vehicle.timestamp.low)}}</div>
            </div>
          </v-card>
        </div>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from "moment";
import config from "@/config";
import Snapshot from "@/components/Snapshot";
export default {
  components: {
    Snapshot
  },
  created() {
    this.getFeeds();
  },
  methods: {
    getFeeds() {
      this.lastRefreshed = moment().format("hh:mm:ss");

      console.log("Fetching ...");
      this.isLoadingAlerts = true;
      this.isLoadingPositions = true;
      this.isLoadingTripUpdates = true;
      axios.get("/.netlify/functions/tripUpdates").then(res => {
        this.tripUpdates = res.data;
        this.isLoadingTripUpdates = false;
      });
      axios.get("/.netlify/functions/alerts").then(res => {
        this.alerts = res.data;
        this.isLoadingAlerts = false;
      });

      axios.get("/.netlify/functions/positions").then(res => {
        this.positions = res.data;
        this.isLoadingPositions = false;
      });
    },
    fullTime(timeObj) {
      return moment(timeObj).format("dddd, MMMM DD, YYYY LT");
    },
    dayTime(timeObj) {
      return moment(timeObj).format("LT");
    },
    tripUpdate(id, option) {
      if (this.tripUpdates.length) {
        let result = this.tripUpdates.find(tripId => tripId.id === id);
        this.currentTrip = result;
        if (result) {
          return result;
        } else {
          this.currentTrip = null;
          return "No update.";
        }
      }
    }
  },
  data() {
    return {
      interval: null,
      tripUpdates: "",
      alerts: "",
      positions: "",
      isLoadingAlerts: false,
      isLoadingPositions: false,
      isLoadingTripUpdates: false,
      lastRefreshed: null,
      currentTrip: null
    };
  },
  name: "home"
};
</script>
<style>
.rule {
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
  margin-bottom: 20px;
}
</style>
