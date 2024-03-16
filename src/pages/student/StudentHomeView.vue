<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-20 mt-20 text-center text-3xl font-bold">
      WELCOME! {studentName}
    </h1>

    <base-button class="relative text-sm py-4 w-48">
      Attend class
      <span class="absolute inset-y-0 right-5 flex items-center ">📷</span>
    </base-button>
    <base-button class="relative text-sm py-4 w-48 mt-10">
       Attendance History
      <span class="absolute inset-y-0 right-4 flex items-center ">🗃</span>
    </base-button>
  </div>
</template>
