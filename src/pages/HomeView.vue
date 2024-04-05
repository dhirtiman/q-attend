<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-blue-950 from-10% via-black text-white"
  >
    <blob-container class="left-0  size-72"></blob-container>
  <blob-container class=" rotate-180 left-10  bottom-0  size-40" smol></blob-container>



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
