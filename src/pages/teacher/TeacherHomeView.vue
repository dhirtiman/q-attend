<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
      WELCOME! {{ teacherName }}
    </h1>
    <div class="w-full">
      <p class="text-center text-lg" v-if="noTeachingSession">
        You don't have any Teaching Sessions. <br />Create One to continue
      </p>
  <TeachingSessionForm
      v-if="noTeachingSession || wanaAdd"
      @close="doneAdding"
    ></TeachingSessionForm>
      
    </div>
    <section v-if="!noTeachingSession && !wanaAdd">
      <p class="mb-5 text-center text-lg">
        Choose a Teaching session to continue
      </p>
      <ul
        class="h-96 w-full overflow-scroll rounded-xl bg-cyan-900 bg-gradient-to-b from-black from-60% text-center"
      >
        <teaching-session-item
          class="mx-auto"
          v-for="session in teachingSessions"
          :key="session.id"
          :session
        ></teaching-session-item>

        <li class="my-2">
          <hr class="w-full border border-gray-300" />
          <span class="px-2 text-white">or</span>
          <hr class="w-full border border-gray-300" />
        </li>
        <base-button @click="addMore" class="mt-10 h-12 w-40 py-4" secondary
          >Add more</base-button
        >
      </ul>
    </section>
  </div>
</template>

<script>
import TeachingSessionForm from "../../components/teacher/TeachingSessionForm.vue";
import TeachingSessionItem from "../../components/teacher/TeachingSessionItem.vue";

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
    teachingSessions() {
      return this.$store.getters["teacher/getTeachingSessions"];
    },
  },
  components: {
    TeachingSessionForm,
    TeachingSessionItem,
  },
  data() {
    return {
      wanaAdd: false,
    };
  },
  methods: {
    addMore() {
      this.wanaAdd = true;
    },
    doneAdding() {
      this.wanaAdd = false;
    },
  },
};
</script>
