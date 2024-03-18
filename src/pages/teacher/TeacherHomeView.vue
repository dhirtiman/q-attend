<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
      WELCOME! {{ teacherName }}
    </h1>
    <div class="w-full" v-if="noTeachingSession">
      <p class="text-center text-lg">
        You don't have any Teaching Sessions. <br />Create One to continue
      </p>
      <TeachingSessionForm></TeachingSessionForm>
    </div>
  </div>
</template>

<script>
import TeachingSessionForm from "../../components/teacher/TeachingSessionForm.vue";

export default {
  mounted() {},
  computed: {
    teacherName() {
      const email = this.$store.getters["getCurrentUser"].id;
      return this.$store.getters["teacher/getTeacher"](email).fullName;
    },
    noTeachingSession() {
      return this.$store.getters["teacher/noTeachingSessions"];
    },
  },
  components: {
    TeachingSessionForm,
  },
  data() {
    return {};
  },
};
</script>
