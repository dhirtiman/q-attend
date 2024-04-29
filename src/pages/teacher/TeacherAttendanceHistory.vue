<template>
  <div
    class="flex h-lvh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-purple-950 from-25% via-black text-white"
  >
    <blob-container class="left-0 size-72"></blob-container>
    <blob-container
      class="bottom-0 left-10 size-40 rotate-180"
      smol
    ></blob-container>
    <div class="fixed h-full w-full backdrop-blur-sm"></div>

    <div class="z-10 my-1 flex h-svh flex-col items-center">
      <!-- HERE -->
      <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
        tap a record to view
      </h1>
      <ul
        class="flex flex-col items-center max-h-60 w-screen overflow-y-scroll rounded-xl border bg-black bg-opacity-30 text-center"
      >
        <AttendanceRecordItem v-for="session in sessions" :session  ></AttendanceRecordItem>
      </ul>
    </div>
  </div>
</template>

<script>

import AttendanceRecordItem from '../../components/teacher/AttendanceRecordItem.vue'

export default {
  components: {
    AttendanceRecordItem,
  },
  computed: {
    sessions(){
      return this.$store.getters['attendance/getSessions']
    },
  },
  data() {
    return {
      // sessions: [
      //   {
      //     completed: true,
      //     id: "rqKkuyO5agsNva9mNOmm",
      //     date: "20-03-2024",
      //     time: "10:30",
      //     semester: "1", // 3 or 5
      //     paper: "101T",
      //     students: [
      //       "DdvnJdsnXPh5PHgxb2pkht7GSpp2",
      //       "aNhRdd3SRiTcpcc8IAC2mRZMXs02",
      //     ],
      //   },
      //   {
      //     completed: true,
      //     id: "rqKkuyO5agsNva9mNOmm",
      //     date: "20-03-2024",
      //     time: "10:30",
      //     semester: "1", // 3 or 5
      //     paper: "101T",
      //     students: [
      //       "DdvnJdsnXPh5PHgxb2pkht7GSpp2",
      //       "aNhRdd3SRiTcpcc8IAC2mRZMXs02",
      //     ],
      //   },

      // ],
    };
  },
};
</script>
