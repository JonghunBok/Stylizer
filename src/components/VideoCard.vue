<template>
  <v-card>
      <canvas class="webcamCanvas"></canvas>

      <v-card-subtitle class="pb-0">
        Webcam Video
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>클립 버튼을 눌러 이미지를 추가하거나,</div>
        <div>카메라 버튼을 눌러 캡처하세요.</div>
      </v-card-text>

      <v-card-actions class="justify-end">
        <input class="fileInput" type="file" style="display: none" @change="newFile">
        <v-btn @click="attachFile" color="success" dark fab>
          <v-icon>mdi-attachment</v-icon>
        </v-btn>

        <v-btn @click="capture" color="success" dark fab>
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'VideoCard',

  props: {
    mediaStream: MediaStream
  },

  data: () => ({
    reader: new FileReader()
  }),

  methods: {
    ...mapActions(['addNewImage']),

    newFile () {
      const files = this.$el.querySelector('.fileInput').files
      const newFile = files[files.length - 1]
     
      this.reader.readAsDataURL(newFile)
    },

    attachFile () {
      this.$el.querySelector('.fileInput').click()
    },

    capture () {
      const canvas = this.$el.querySelector("canvas")
      const newImage = canvas.toDataURL("image/jpeg");

      this.addNewImage(newImage)
    }
  },

  mounted() {
    const video = document.createElement('video')
    const canvas = this.$el.querySelector("canvas")

    video.srcObject = this.mediaStream

    video.addEventListener('loadedmetadata', () => {
      video.play()
    })

    video.addEventListener('play', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      draw(video, canvas.getContext('2d'), video.videoWidth, video.videoHeight);
    }, false)

    function draw(video, context, width, height) {
      var image // , data, i, r, g, b, brightness;

      context.drawImage(video, 0, 0, width, height);
      image = context.getImageData(0, 0, width, height);
      // data = image.data;

      /*
      for (i = 0; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        brightness = ( r + g + b ) / 3;
        // brightness = brightness > 130 ? brightness : 130;

        data[i] = data[i + 1] = data[i + 2] = brightness;
      }
      //console.log(image);
      //image.data = data;
      */

      context.putImageData(image, 0, 0);
      setTimeout(draw, 10, video, context, width, height);
    }

    this.reader.addEventListener('load', () => {
      this.addNewImage(this.reader.result)
    })
  }
}
</script>

<style>
.v-card {
  max-width: 320px;
}

</style>
