<template>
    <div class="absolute">
  <img src="../../assets/blob.svg" alt="blob" class="absolute left-10 top-14 z-0 size-11/12 " :class="{ 'absolute left-10 top-14 z-0 size-11/12 ' : smol }" />
  <img src="../../assets/blob.svg" alt="blob" class="absolute left-20 top-20 z-0 size-1/12 " :class="{'absolute left-16 top-16 z-0 size-1/12': smol}" />
  <img src="../../assets/blob2.svg" alt="blob" class="absolute right-10 top-32 z-0 size-2/12  " :class="{'absolute right-0 top-24 z-0 size-2/12  ': smol}" />
  <img src="../../assets/blob.svg" alt="blob" class="absolute right-10 -bottom-12 z-0 size-1/12" :class="{'absolute -right-1 -bottom-12 z-0 size-1/12': smol}" />
  <img src="../../assets/blob2.svg" alt="blob" class="absolute left-20 top-72   z-0 size-3/12" :class="{'absolute left-20 top-48    z-0 size-3/12': smol}"/>
</div>
</template>


<script>

export default {
   props: {
    smol: {
      type: Boolean,
      required: false,
      default: false,
    }
   }
}
</script>