<template>
  <v-app>
    <v-container>
      <VideoCard v-if="myStream != null" :mediaStream="myStream"/>
    </v-container>

  </v-app>
</template>

<style>
  video, canvas {
    width: 100%;
    height: 100%;
  }
</style>

<script>
//import HelloWorld from './components/HelloWorld';
import VideoCard from './components/VideoCard';

export default {
  name: 'App',

  components: {
    VideoCard,
  },

  data: () => ({
    myStream: null
  }),

  created () {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      this.myStream = stream
      console.log(this.myStream);
    })
  }


};
</script>
