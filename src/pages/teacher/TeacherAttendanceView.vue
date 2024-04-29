<template>
  <div
    class="h-fitw-full flex min-h-screen flex-col items-center justify-normal overflow-x-hidden bg-black bg-gradient-to-b from-purple-950 from-10% via-black text-white"
  >
    <h1 class="mb-5 mt-14 text-3xl font-bold">Attendance</h1>
    <div
      class="mb-5 h-auto w-4/5 rounded-xl border border-violet-600 bg-black bg-opacity-30 text-justify"
    >
      <p class="mb-2 text-xl text-white">
        <span class="font-bold">Date: </span> {{aSession.date}}
      </p>
      <p class="mb-2 text-xl text-white">
        <span class="font-bold">Time:</span>
        {{aSession.time}}
      </p>
      <p class="mb-2 text-lg text-white">
        <span class="font-bold">Paper:</span> {{paper}}
      </p>
      <p class="mb-2 text-xl text-white">
        <span class="font-bold">Semester</span>
        {{aSession.semester}}
      </p>
    </div>

    <base-button
    v-if="!show"
      @click="getStudents"
      class=" mb-4 mt-1 h-12 w-40 rounded-xl bg-violet-400 py-2 text-xl"
      secondary
      >show students</base-button
    >
    <base-button
    v-else=""
      @click="hideStudents"
      class=" mb-4 mt-1 h-12 w-40 rounded-xl bg-violet-400 py-2 text-xl"
      secondary
      >Hide Students</base-button
    >

    

    <base-spinner v-if="loading" ></base-spinner>
    <ul
  v-if="gotStudents && !loading && show"
  class="max-h-60 w-full overflow-y-scroll rounded-xl border bg-black bg-opacity-30 text-center"
  style="list-style-type: none; padding: 0;"
>
  <!-- Table headers -->
  <li class="my-2 flex space-x-2 font-bold">
    <span class="flex-1">Roll</span>
    <span class="flex-1">Name</span>
    <span class="flex-1">Uni Roll</span>
    <span class="flex-1">Regn</span>
  </li>

  <!-- Table rows -->
  <li v-for="student in aSession.students" class="my-2 flex space-x-2">
    <span class="flex-1 text-sm">{{ student.classRolln }}</span>
    <span class="flex-1 text-sm">{{ student.fullName }}</span>
    <span class="flex-1 text-sm">{{ student.uniRolln }}</span>
    <span class="flex-1 text-sm">{{ student.regno }}</span>
  </li>
</ul>

  </div>
</template>

<script>
export default {
  computed: {
    aSession() {
      
      return this.$store.getters["attendance/getSession"];
    },
    paper(){
      this.$store.dispatch('papers/retrievePapers')
      return this.$store.getters['papers/getPaperById'](this.aSession.paper).name
    }

  },
  beforeRouteLeave(){
    this.$store.dispatch('attendance/restoreASession',this.legacyASession);
  },
  data() {
    return {
      gotStudents: false,
      loading: false,
      show: false,
      legacyASession: this.$store.getters["attendance/getSession"]
    };
  },
  methods: {
    hideStudents(){
      this.show = false;
    },
    async getStudents() {

      this.show = true;

      if(this.gotStudents){
        return;
      }
      this.gotStudents = true;
      this.loading = true

      setTimeout(()=>{
        this.loading = false
      },500)

        try {
            await this.$store.dispatch('attendance/retrieveAttendanceWithStudents',this.aSession.students)
        } catch (error) {
          console.log(error);
        }

    },
  },
};
</script>
