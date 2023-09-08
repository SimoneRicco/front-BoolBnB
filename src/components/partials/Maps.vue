<script>
import { onMounted, ref } from "vue";

export default {
  props: {
    coordinates: {
      type: Array,
      required: true,
    },
  },
  name: "Map",
  setup(props) {
    const mapRef = ref(null);
    onMounted(() => {
      const tt = window.tt;
      var map = tt.map({
        key: "iqmn2JZ2yHOhs2bC6YdGXSgWWzLQ4Hq8",
        container: mapRef.value,
        style: "tomtom://vector/1/basic-main",
        zoom: 13,
      });
      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      addMarker(map, props.coordinates);
    });

    function addMarker(map, coordinates) {
      console.log("this.coordinates", coordinates);
      const tt = window.tt;
      var location = [coordinates[0], coordinates[1]];
      var popupOffsets = {
        top: [0, 0],
        bottom: [0, -30],
        "bottom-right": [0, -30],
        "bottom-left": [0, -30],
        left: [25, -35],
        right: [-25, -35],
      };

      var address = coordinates[2];
      var marker = new tt.Marker().setLngLat(location).addTo(map);
      var popup = new tt.Popup({ offset: popupOffsets }).setHTML(
        "Your address!"
      );
      marker.setPopup(popup).togglePopup();

      map.setCenter(location);
    }

    return {
      mapRef,
    };
  },
};
</script>

<template>
  <div id="map" ref="mapRef"></div>
</template>

<style>
#map {
  height: 50vh;
  width: 100%;
}
</style>
