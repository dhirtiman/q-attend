<template>
  <li
   @click="viewAttendance" class="my-2 flex w-96 items-center justify-between space-x-4 rounded-xl border bg-violet-500 p-3"
  >
    <span class="flex-1 text-sm"
      >Dated: {{ session.date }} <br />Time :{{ session.time }}</span
    >
    <span class="flex-1 text-xs">{{ paper }}
    </span>
  </li>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("papers/retrievePapers");
  },
  props: ["session"],
  computed: {
    paper() {
      return this.$store.getters["papers/getPaperById"](this.session.paper)
        .name;
    },
  },
  methods: {
    viewAttendance(){
        this.$store.dispatch('attendance/setSessionByID',this.session.id)

        setTimeout(() => {
          this.$router.push('/teacher/attendance')
        }, 500);
    }
    
  }
};
</script>
