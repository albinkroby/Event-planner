<template>
  <div>
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 text-center text-white">
            <h1 class="display-3 fw-bold mb-4">
              Plan Your Events with Ease
            </h1>
            <p class="lead mb-5">
              Create, manage, and share your events all in one place
            </p>
            <router-link
              :to="authStore.isAuthenticated ? '/dashboard' : '/signup'"
              class="btn btn-primary btn-lg me-3"
            >
              {{ authStore.isAuthenticated ? 'Go to Dashboard' : 'Get Started' }}
            </router-link>
            <router-link
              to="/about"
              class="btn btn-outline-light btn-lg"
            >
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container py-5">
      <h2 class="text-center mb-5">Why Choose EventPlanner?</h2>
      <div class="row g-4">
        <div class="col-12 col-md-4" v-for="feature in features" :key="feature.title">
          <div class="card h-100 feature-card">
            <div class="card-body text-center">
              <i :class="'bi ' + feature.icon + ' fs-1 text-primary mb-3'"></i>
              <h3 class="h5 mb-3">{{ feature.title }}</h3>
              <p class="mb-0">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const features = [
  {
    icon: 'bi-calendar-check',
    title: 'Easy Event Creation',
    description: 'Create and manage events with just a few clicks. Add details, invite guests, and track RSVPs effortlessly.'
  },
  {
    icon: 'bi-envelope',
    title: 'Smart Notifications',
    description: 'Never miss an event with automated reminders and notifications for you and your guests.'
  },
  {
    icon: 'bi-people',
    title: 'Guest Management',
    description: 'Easily manage guest lists, track RSVPs, and communicate with attendees in real-time.'
  }
]
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('@/assets/images/hero-bg.jpg') center/cover;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}
</style>
