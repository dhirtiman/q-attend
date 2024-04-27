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
    <div v-else class="relative h-96 w-full px-5 py-10">
      <p
        v-if="message"
        class="absolute left-0 right-0 top-1 mx-10 animate-pulse text-center"
      >
        {{ message }}
      </p>

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
      showReader: true,
    };
  },
  components: {
    QrcodeStream,
  },
  methods: {
    refreshReader(){
      this.showReader = false;

      setTimeout(()=>{
        this.showReader = true;
      },500)
    },
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
    async onDecode(decodedString) {
      this.message = "scanning..";

      console.log('before',decodedString);
      try {
        decodedString = JSON.parse(decodedString);
      } catch (error) {
        this.refreshReader();
      }
      console.log('after',decodedString);

      try {
        const uid = this.$store.getters['student/getStudent'].uid
        const  payload = {
          studentUid: uid,
          teacherUid: decodedString.uid,
          id: decodedString.id
        }
        await this.$store.dispatch('attendance/pushAttendance',payload)
        this.complete = true;
        return;
      } catch (error) {
        this.error = error;
        console.log(error);
        this.refreshReader();
      }
    },
  },
};
</script>
