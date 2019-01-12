<template>
  <div>
    <v-layout row wrap>
      <v-container>
        <h1 class="rule mt-2">Alerts</h1>
        <div v-if="isLoadingAlerts">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else v-for="(alert) in alerts" :key="alert.id" class="mt-4">
          <div
            style="color: #888; font-weight: bold;"
          >{{time(alert.alert.active_period[0].start.low)}}</div>
          <div>{{alert.alert.header_text.translation[0].text}}</div>
        </div>
        <h1 class="rule mt-5">Positions</h1>
        <div v-if="isLoadingPositions">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div
          v-else
          v-for="(position) in positions"
          :key="position.id"
        >{{position.vehicle.trip.trip_id}}</div>
        <h1 class="rule mt-5">Trip Updates</h1>
        <div v-if="isLoadingTripUpdates">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-else v-for="(tripUpdate) in tripUpdates" :key="tripUpdate.id">{{tripUpdate.id}}</div>
        <!-- <tree-view :data="tripUpdates" :options="{maxDepth: 3}"></tree-view> -->
      </v-container>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import config from "@/config";
export default {
  mounted() {
    this.getFeeds();
  },
  methods: {
    getFeeds() {
      this.lastRefreshed = moment().format("hh:mm:ss");
      this.$forceUpdate();
      console.log("Fetching feeds..." + this.lastRefreshed);
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
    time(timeObj) {
      return moment(timeObj).format("dddd, MMMM DD, YYYY LT");
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
      lastRefreshed: null
    };
  },
  name: "home",
  components: {}
};
</script>
<style>
.rule {
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
  margin-bottom: 20px;
}
</style>
