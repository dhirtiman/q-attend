<template>
  <div
    class="h-fitw-full flex min-h-screen flex-col items-center justify-normal overflow-x-hidden bg-black bg-gradient-to-b from-purple-950 from-10% via-black text-white"
  >
    <h1 class="mb-5 mt-20 text-3xl font-bold">Set Up your class</h1>
    <div class="mb-8 h-48 w-72 rounded-xl bg-gray-800 px-6 py-8 shadow-lg">
      <div class="flex space-x-3">
        <label for="semester">Semester</label>
        <div class="flex w-10" v-for="sem in session.semesters" :key="sem">
          <p>{{ sem }}</p>
          <input
            type="radio"
            name="semester"
            id="semester"
            :value="sem"
            v-model="semester"
          />
        </div>
      </div>
      <section class="mt-4">
        <select
          v-model="selectedPaper"
          id="paper"
          class="mt-1 w-full rounded-md border p-2 text-sm text-black"
        >
          <option :value="null">Select a Paper</option>
          <option v-for="paper in papers" :value="paper" :key="paper.id">
            {{ paper.name }}
          </option>
        </select>
      </section>
      <section class="mt-4">
        <label for="classTime">Class Time</label>
        <input
          class="text-black"
          type="time"
          name="classTime"
          id="classTime"
          v-model="classTime"
        />
        <p class="mt-1.5 animate-pulse text-center text-red-600" v-if="!!error">
          {{ error }}
        </p>
      </section>
    </div>
    <base-button class="h- w-56 py-4" @click="submit">Start</base-button>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("papers/retrievePapers");
  },
  data() {
    return {
      id: this.$route.params.id,
      selectedPaper: null,
      classTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      semester: 1,
      error: null,
    };
  },
  computed: {
    session() {
      const session =
        this.$store.getters["teacher/getTeachingSessions"][this.id];
      const papers = [];
      for (const paperCode of session.paperCodes) {
        const paper = this.$store.getters["papers/getPaperById"](paperCode);
        papers.push(paper);
      }

      return {
        ...session,
        papers,
      };
    },
    papers() {
      return this.$store.getters["papers/getPapersBySemester"](this.semester);
    },
  },
  methods: {
    async submit() {
      // Handle form submission
      if (!this.selectedPaper) {
        this.error = "Please select a paper first";
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return;
      }

      const payload = {
        time: this.classTime,
        semester: "" + this.semester,
        paper: this.selectedPaper.id,
      };

      console.log("before", this.$store.getters["attendance/getSession"]);

      try {
        await this.$store.dispatch("attendance/initSession", payload);
        console.log("after", this.$store.getters["attendance/getSession"]);
      } catch (error) {}

      console.log("/teacher/qrpage/" + this.selectedPaper.name);
      this.$router.push("/teacher/qrpage/" + this.selectedPaper.name);

      console.log("Paper:", this.selectedPaper);
      console.log("sem:", this.semester);
      console.log("Class Time:", this.classTime);
    },
  },
};
</script>
