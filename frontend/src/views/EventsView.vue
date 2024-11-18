<template>
  <div class="container py-5">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="h2 mb-0">Upcoming Events</h1>
          <div class="d-flex gap-2">
            <div class="input-group">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search events..."
                v-model="searchQuery"
              >
              <button class="btn btn-outline-secondary" @click="handleSearch">
                <i class="bi bi-search"></i>
              </button>
            </div>
            <button 
              class="btn btn-primary" 
              @click="showEventDialog = true"
              v-if="authStore.isAuthenticated"
            >
              <i class="bi bi-plus-lg me-2"></i>Create Event
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="eventStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="eventStore.error" class="alert alert-danger">
      {{ eventStore.error }}
    </div>

    <!-- Events Grid -->
    <div v-else class="row g-4">
      <div v-if="filteredEvents.length === 0" class="col-12 text-center py-5">
        <p class="text-muted mb-0">No events found</p>
      </div>
      
      <div class="col-12 col-md-6 col-lg-4" v-for="event in filteredEvents" :key="event._id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text text-muted mb-3">
              <i class="bi bi-calendar me-2"></i>
              {{ new Date(event.date).toLocaleDateString() }}
            </p>
            <p class="card-text">{{ event.description }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <router-link :to="'/events/' + event._id" class="btn btn-outline-primary btn-sm">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Dialog -->
    <event-dialog
      v-model="showEventDialog"
      :event="null"
      @created="onEventCreated"
      @updated="onEventUpdated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import EventDialog from '@/components/event/EventDialog.vue'

const authStore = useAuthStore()
const eventStore = useEventStore()

const searchQuery = ref('')
const showEventDialog = ref(false)

// Fetch events when component mounts
onMounted(() => {
  eventStore.fetchEvents()
})

// Computed property for filtered events
const filteredEvents = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return eventStore.events.filter(event => 
    event.title.toLowerCase().includes(query) ||
    event.description.toLowerCase().includes(query)
  )
})

const handleSearch = () => {
  // You could implement server-side search here if needed
  // For now, we're using client-side filtering via computed property
}

const onEventCreated = () => {
  showEventDialog.value = false
  // Optionally refresh the events list
  eventStore.fetchEvents()
}

const onEventUpdated = () => {
  showEventDialog.value = false
  // Refresh the events list
  eventStore.fetchEvents()
}
</script>