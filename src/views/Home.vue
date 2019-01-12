<template>
  <div>
    <h1>Alerts</h1>
    <div v-if="isLoadingAlerts">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div
      v-else
      v-for="(alert) in alerts"
      :key="alert.id"
    >{{alert.alert.header_text.translation[0].text}}</div>
    <h1>Positions</h1>
    <div v-if="isLoadingPositions">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else v-for="(position) in positions" :key="position.id">{{position.vehicle.trip.trip_id}}</div>
    <h1>Trip Updates</h1>
    <div v-if="isLoadingTripUpdates">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else v-for="(tripUpdate) in tripUpdates" :key="tripUpdate.id">{{tripUpdate.id}}</div>
    <tree-view :data="tripUpdates" :options="{maxDepth: 3}"></tree-view>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  created() {
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
  data() {
    return {
      tripUpdates: "",
      alerts: "",
      positions: "",
      isLoadingAlerts: false,
      isLoadingPositions: false,
      isLoadingTripUpdates: false
    };
  },
  name: "home",
  components: {}
};
</script>
