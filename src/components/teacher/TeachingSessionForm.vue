<template>
  <div>
    <form
      @submit.prevent="submitForm"
      class="relative mx-auto w-full max-w-md rounded-md bg-white p-6 text-black shadow-md lg:w-96"
    >
      <button
        type="button"
        @click="closeForm"
        class="absolute right-0 top-0 mr-2 mt-2 text-gray-500 focus:outline-none"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

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
  </div>
</template>

<script>
export default {
  emits: ["close"],
  created() {
    this.$store.dispatch("papers/retrievePapers");
  },
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
      console.log("submitting form");
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
          uid: this.$store.getters["teacher/getTeacher"].uid,
          ...this.form,
      };

      console.log(payload);
      this.$store.dispatch("teacher/addTeachingSession", payload);
      this.closeForm();
    },
    closeForm() {
      this.$emit("close");
    },
  },
};
</script>
