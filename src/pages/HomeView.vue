<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal  bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-48 my-12 mt-20 text-center text-4xl font-bold">
      Welcome to Qattend! <br />
      Start As
    </h1>

    <div class="flex flex-col overflow-hidden gap-4">
      <base-button link to="/teacher/signin">Teacher</base-button>
      <base-button link to="/student/signin">Student</base-button>
    </div>
  </div>
</template>
