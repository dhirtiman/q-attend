<template>
  <div
    class="h-fitw-full flex min-h-screen flex-col items-center justify-normal overflow-x-hidden bg-black bg-gradient-to-b from-purple-950 from-10% via-black text-white"
  >
    <h1 class="mb-5 mt-10 text-3xl font-bold">Session Details</h1>
    <div class="mb-8 w-svw rounded-lg bg-gray-800 p-6 shadow-lg">
      <p class="mb-4 text-lg text-white">
        <span class="font-bold">Session ID:</span> {{ session.id }}
      </p>
      <p class="mb-4 text-lg text-white">
        <span class="font-bold">Session Year:</span> {{ session.sessionYear }}
      </p>
      <p class="mb-4 text-lg text-white">
        <span class="font-bold">Term:</span> {{ session.term }}
      </p>
      <p class="mb-4 text-lg text-white">
        <span class="font-bold">Semesters:</span>
        {{ session.semesters.join(", ") }}
      </p>
      <ul class="mb-4 text-white">
        <span class="text-lg font-bold">Papers:</span>
        <li v-for="paper in session.papers" :key="paper.id" class="text-sm">
          {{ paper.name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-10">
      <base-button link :to="startAttendanceLink" class="h-12 w-56 py-4 "
        >Start Attendance</base-button
      >
      <base-button  link secondary to="" class="h-12 w-56 py-4 "
        >Attendance History</base-button
      >
      
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    session() {
      const session = this.$store.getters["teacher/getTeachingSessions"].find(
        (session) => session.id === this.id,
      );
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
    startAttendanceLink(){
      return '/teacher/setupclass/'+this.id;
    },
  },
};
</script>
