<template>
  <div class="d-flex flex-column min-vh-100">
    <nav-bar />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <footer class="py-3 bg-light">
      <div class="container text-center">
        © {{ new Date().getFullYear() }} EventPlanner. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
</script>
