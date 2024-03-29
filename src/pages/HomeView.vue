<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-blue-950 from-10% via-black text-white"
  >
  <div class="absolute  w-full h-full">
  <img src="../assets/blob.svg" alt="blob" class="absolute left-10 top-14 z-0" />
  <img src="../assets/blob.svg" alt="blob" class="absolute left-20 top-20 z-0 size-1/12" />
  <img src="../assets/blob.svg" alt="blob" class="absolute right-20 top-32 z-0 size-10" />
  <img src="../assets/blob.svg" alt="blob" class="absolute right-20 top-80 z-0 size-8" />
  <img src="../assets/blob.svg" alt="blob" class="absolute left-20 top-72 z-0 size-20" />
</div>

    <div class="fixed h-full w-full backdrop-blur-sm"></div>
    <div class="z-10 flex flex-col items-center">
      <h1 class="my-12 mb-10 mt-44 text-center text-4xl font-bold">
        Welcome to Qattend!
      </h1>
      <h1 class="mb-16 text-3xl font-bold">Start as:</h1>

      <div class="flex flex-col gap-4 overflow-hidden">
        <base-button
          class="rounded-2xl py-3 text-lg font-normal"
          link
          to="/student/signin"
          >student</base-button
        >
        <base-button
          class="rounded-2xl bg-violet-500 py-3 text-xl font-normal"
          link
          to="/teacher/signin"
          >teacher</base-button
        >
      </div>
    </div>
  </div>
</template>
