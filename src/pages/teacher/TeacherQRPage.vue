<template>
  <div
    class="h-fitw-full flex min-h-screen flex-col items-center justify-normal overflow-x-hidden bg-black bg-gradient-to-b from-purple-950 from-10% via-black text-white"
  >
    <h1 class="mb-5 mt-20 text-3xl font-bold">Attendance for</h1>
    <p class="text-sm">{{ paper }}</p>
    <section v-if="!done">
      <p class="mt-5 text-center text-xl">
        Time remaining: {{ formattedTime }}
      </p>

      <div class="mt-5 size-auto border">
        <qrcode-vue :value="sessionId" render-as="svg" size="300"></qrcode-vue>
      </div>

      <div class="mt-3 flex justify-center space-x-5">
        <button
          @click="addTime(5)"
          class="w-36 rounded bg-purple-400 px-4 py-2 text-white"
        >
          + 5 Minutes
        </button>
        <button
          @click="toggleDialog"
          class="w-36 rounded bg-purple-600 px-4 py-2 text-white"
        >
          End
        </button>
      </div>
      <base-dialog
        class=""
        :show="showDialog"
        title="Are you sure?"
        @close="toggleDialog"
        @end="endSession"
      >
        <p>This will end the session</p>
      </base-dialog>
    </section>
    <section v-else class=" flex flex-col items-center">
      <h1 class="mb-10 mt-20 text-3xl font-bold">Completed Sucessfully..</h1>
      <router-link
        to="/teacher/attendance"
        class="mt-10 text-black font-medium text-center h-12 w-52 rounded-xl bg-violet-400 py-2 text-xl"
        secondary
        >View attendance</router-link
      >
    </section>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: ["paper"],
  components: {
    QrcodeVue,
  },
  data() {
    return {
      timer: 600, // 10 minutes in seconds
      intervalId: null,
      showDialog: false,
      done: false,
    };
  },
  computed: {
    sessionId() {
      const id = this.$store.getters["attendance/getSession"].id;
      const uid = this.$store.getters["teacher/getTeacher"].uid;
      const payload = {
        id,
        uid,
      };

      return JSON.stringify(payload);
    },
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.intervalId);
          // Handle timer expiration
        }
      }, 1000);
    },
    addTime(minutes) {
      this.timer += minutes * 60; // Convert minutes to seconds
    },
    endSession() {
      this.done = true;
      // Implement other action functionality here
      const id = this.$store.getters["attendance/getSession"].id;
      const uid = this.$store.getters["teacher/getTeacher"].uid;

      const payload = {
        id,
        uid,
      };

      this.$store.dispatch("attendance/endSession", payload);
    },
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
