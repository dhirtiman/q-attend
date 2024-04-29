<template>
  <div
    class="h-fitw-full flex min-h-screen flex-col items-center justify-normal overflow-x-hidden bg-black bg-gradient-to-b from-purple-950 from-10% via-black text-white"
  >
    <h1 class="mb-5 mt-10 text-3xl font-bold">Session Details</h1>
    <div
      class="h-auto w-4/5 rounded-xl border border-violet-600 bg-black bg-opacity-30 text-justify mb-10"
    >
      <p class="mb-4 text-xl text-white">
        <span class="font-bold">Session ID:</span> {{ id }}
      </p>
      <p class="mb-4 text-xl text-white">
        <span class="font-bold">Session Year:</span> {{ session.sessionYear }}
      </p>
      <p class="mb-4 text-xl text-white">
        <span class="font-bold">Term:</span> {{ session.term }}
      </p>
      <p class="mb-4 text-xl text-white">
        <span class="font-bold">Semesters:</span>
        {{ session.semesters.join(", ") }}
      </p>
    </div>
    <div class="px-5 h-auto w-4/5 rounded-xl border border-violet-600 bg-black bg-opacity-30 text-justify mb-10">
      <ul class="mb-4 text-white">
        <span class="text-lg font-bold">Papers:</span>
        <li v-for="paper in session.papers" :key="paper.id" class="text-sm">
          {{ paper.name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-10">
      <base-button link :to="startAttendanceLink" class="rounded-2xl h-12 w-64 py-3 bg-violet-500 "
        >Start Attendance session</base-button
      >
   
      <base-button @click="removeSession"  secondary  class="rounded-2xl h-12 w-64 py-3 bg-violet-400"
        >Delete Teaching Session</base-button
      >

    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("papers/retrievePapers");
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    session() {
      const session = this.$store.getters["teacher/getTeachingSessions"][this.id]
      const papers = [];
      for (const paperCode of session.paperCodes) {
        const paper = this.$store.getters["papers/getPaperById"](paperCode);
        console.log(paper);
        papers.push(paper);
      }

      return {
        ...session,
        papers,
      };
    },
    startAttendanceLink() {
      return "/teacher/setupclass/" + this.id;
    },
  },
  methods: {
    async removeSession(){
      const payload = {
        tSession: this.$store.getters["teacher/getTeachingSessions"][this.id],
        id: this.id,
      }
      await this.$store.dispatch('teacher/deleteTeachingSession',payload)
      .then(()=>{

        this.$router.go(-1)
      })
      .catch((error)=>{
        console.log(error);
      })

    }
  }
};
</script>
