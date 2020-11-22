<template>
  <v-app>
    <v-container
      class="d-flex flex-wrap"
    >
      <VideoCard
        class="mx-auto my-4"
        v-if="myStream != null" 
        :mediaStream="myStream"
      />
      <ImageCard
        class="mx-auto my-4"
        v-for="(img, idx) in getImages"
        :key="idx"
        :image=img
      />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import VideoCard from './components/VideoCard';
import ImageCard from './components/ImageCard';

export default {
  name: 'App',

  components: {
    VideoCard,
    ImageCard
  },

  data: () => ({
    myStream: null
  }),

  computed: {
    ...mapGetters(['getImages'])
  },
  
  methods: {
    setMyStream () {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      }).then(stream => {
        this.myStream = stream
      })
    }
  },

  created () {
    this.setMyStream()
  }
};
</script>

<style>
  video, canvas {
    width: 100%;
    height: auto;
  }

  .v-card {
    max-width: 50vw;
  }
</style>
