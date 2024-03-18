<template>
  <form
    @submit.prevent="submitForm"
    class="mx-auto w-full max-w-md rounded-md bg-white p-6 text-black shadow-md lg:w-96"
  >
    <p v-if="!isValid" class="animate-pulse text-center text-red-600">
      Please input something first
    </p>
    <h1 class="my-2 text-center text-xl font-bold">
      Add a new Teaching Session
    </h1>
    <div class="mb-4">
      <label for="sessionYear" class="block text-sm font-medium text-gray-700"
        >Session Year:</label
      >
      <input
        type="text"
        id="sessionYear"
        v-model="form.sessionYear"
        placeholder="eg: 2023-24, 2024-25"
        class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div class="mb-4">
      <label for="term" class="block text-sm font-medium text-gray-700"
        >Term:</label
      >
      <select
        id="term"
        v-model="form.term"
        class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="odd">Odd</option>
        <option value="even">Even</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="semesters" class="mb-2 block font-medium">Semesters:</label>
      <div>
        <label
          v-for="semester in semesterOptions"
          :key="semester"
          class="mb-2 mr-4 inline-flex items-center"
        >
          <input
            type="checkbox"
            :value="semester"
            v-model="form.semesters"
            class="form-checkbox h-4 w-4 text-blue-500"
          />
          <span class="ml-2">{{ semester }}</span>
        </label>
      </div>
    </div>

    <div class="mb-4">
      <label for="paperCodes" class="mb-2 block font-medium">Papers:</label>
      <div>
        <label
          v-for="paper in papers"
          :key="paper.id"
          class="mb-2 mr-4 inline-flex items-center"
        >
          <input
            type="checkbox"
            :value="paper.id"
            v-model="form.paperCodes"
            class="form-checkbox h-4 w-4 text-blue-500"
          />
          <span class="ml-2">{{ paper.name }}</span>
        </label>
      </div>
    </div>

    <button
      type="submit"
      class="w-full rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
    >
      Submit
    </button>
  </form>
</template>

<script>
export default {
  computed: {
    papers() {
      return this.$store.getters["papers/getPapersBySemesters"](
        this.form.semesters,
      );
    },
    semesterOptions() {
      return this.form.term === "odd" ? [1, 3, 5] : [2, 4, 6];
    },
  },
  data() {
    return {
      form: {
        sessionYear: "", // Initialize with empty values
        term: "odd",
        semesters: [], // Or initialize as an array if semesters is an array
        paperCodes: [], // Or initialize as an array if paperCodes is an array
      },
      isValid: true,
    };
  },
  methods: {
    submitForm() {
      if (
        this.form.sessionYear === "" ||
        this.form.semesters.length < 1 ||
        this.form.paperCodes.length < 1
      ) {
        this.isValid = false;
        setTimeout(() => {
          this.isValid = true;
        }, 3000);
        return;
      }

      const payload = {
        email: this.$store.getters["getCurrentUser"].id,
        teachingSession: {
          id: new Date().toISOString(),
          ...this.form,
        },
      };

      this.$store.dispatch("teacher/addTeachingSession", payload);
      console.log(
        this.$store.getters["teacher/getTeacher"]("teacherman@gmail.com"),
      );
    },
  },
};
</script>
