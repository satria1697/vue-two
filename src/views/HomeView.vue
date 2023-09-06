<template>
  <div class="h-screen">
    <div class="flex flex-col space-y-10 items-center justify-center w-full h-full">
      <router-link
        class="rounded-md px-2.5 py-1.5 bg-green-600 text-white w-fit"
        :to="{ name: 'normal-to-camel' }"
        >Normal to Camel View</router-link
      >
      <router-link
        class="rounded-md px-2.5 py-1.5 bg-green-600 text-white w-fit"
        :to="{ name: 'normal-to-class' }"
        >Normal to Class View</router-link
      >
    </div>
  </div>
</template>
<script setup lang="ts"></script>
