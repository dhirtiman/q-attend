<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
      Scan the QRCode to Attend
    </h1>
    <p v-if="error">{{ error }}</p>
    <h1 v-if="complete" class="mb-20 mt-20 text-center text-3xl font-bold">
      Attendance Sucessfull..
    </h1>
    <div v-else class=" relative py-10 px-5  w-full h-96">
      <p v-if="message" class=" animate-pulse absolute top-1 right-0 left-0 mx-10 text-center">{{ message }}</p>

      <qrcode-stream class="fixed" @decode="onDecode" @error="onError">
      </qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue3-qrcode-reader";

export default {
  data() {
    return {
      error: null,
      complete: false,
      message: null,
    };
  },
  components: {
    QrcodeStream,
  },
  methods: {
    onError(error) {
      if (error.name === "NotAllowedError") {
        this.error = "user denied camera access permission";
      } else if (error.name === "NotFoundError") {
        this.error = "no suitable camera device installed";
      } else if (error.name === "NotSupportedError") {
        this.error = "page is not served over HTTPS (or localhost)";
      } else if (error.name === "NotReadableError") {
        this.error = "maybe camera is already in use";
      } else if (error.name === "OverconstrainedError") {
        this.error = "did you request the front camera although there is none?";
      } else if (error.name === "StreamApiNotSupportedError") {
        this.error = "browser seems to be lacking features";
      }
    },
    onDecode(decodedString) {
      if (decodedString === "ok") {
        // change ok to the attandance session code
        this.complete = true;
        // send student id to backend (regn)
        return;
      }
      this.message = "scanning..";
    },
  },
};
</script>
