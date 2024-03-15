<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
  >
    <h1 class="mb-10 mt-20 text-center text-4xl font-bold">REGISTER</h1>
    <div>
      <form @submit.prevent="" class="flex flex-col items-center">
        <input
          type="number"
          name="regno"
          id="regno"
          placeholder="Enter Registration No."
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="number"
          name="rollno"
          id="rollno"
          placeholder="Enter Roll No."
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <input
          type="password"
          name="password2"
          id="password2"
          placeholder=" Verify Password"
          class="m-2 w-72 rounded-xl border-2 border-solid border-blue-600 bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
        />
        <base-button class="mt-40 py-2">Sign Up</base-button>
      </form>
    </div>
  </div>
</template>
