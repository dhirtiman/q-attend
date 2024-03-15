<template>
    <div
      class="flex h-svh w-full flex-col items-center justify-normal bg-black bg-gradient-to-b from-cyan-900 from-10% via-black text-white"
    >
      <h1 class="mb-56 mr-32 mt-20 text-left text-4xl font-bold">
        WELCOME <br />
        Teacher!
      </h1>
      <div>
        <form @submit.prevent="" class="flex flex-col items-center">
          <p class="text-xl font-bold">Login to your account</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="enter email"
            class=" w-72 m-2 rounded-xl border-2 border-solid border-blue-600  bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class=" w-72 m-2 rounded-xl border-2 border-solid border-blue-600  bg-black bg-opacity-20 py-1.5 text-center placeholder:text-white"
          />
          <p class="text-xs">Forgot Password? plez contact AdminMan</p>
          <base-button class="mb-1">Login</base-button>
        </form>
      </div>
    </div>
  </template>
  