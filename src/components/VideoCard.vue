<template>
  <v-card
      class="mx-auto"
      max-width="360"
    >
      <canvas id="myCanvas"></canvas>
      <img/> 
      <v-btn @click="capture" color="success" dark fab>
        <v-icon>mdi-domain</v-icon>
      </v-btn>

      <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
        >
          Share
        </v-btn>

        <v-btn
          color="orange"
          text
        >
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'VideoCard',

  props: {
    mediaStream: MediaStream
  },

  methods: {
    capture () {
      const img = this.$el.querySelector("img")
      const video = this.$el.querySelector("video")
      const canvas = this.$el.querySelector("canvas")

      img.src = canvas.toDataURL("image/jpeg");
      this.$el.append(img);
    }
  },

  mounted() {
    const video = document.createElement('video')
    //const video = this.$el.querySelector("video")
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

    function draw( video, context, width, height) {
      var image, data, i, r, g, b, brightness;

      context.drawImage(video, 0, 0, width, height);
      image = context.getImageData(0, 0, width, height);
      data = image.data;

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

      context.putImageData( image, 0, 0);
      setTimeout(draw, 10, video, context, width, height);
    }



  }
}
</script>
