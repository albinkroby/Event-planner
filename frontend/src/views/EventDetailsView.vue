<template>
    <div class="container py-5">
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary"></div>
      </div>
  
      <template v-else-if="event">
        <div class="row mb-4">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/events">Events</router-link>
                </li>
                <li class="breadcrumb-item active">{{ event.title }}</li>
              </ol>
            </nav>
          </div>
        </div>
  
        <div class="row">
          <div class="col-12 col-lg-8 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-4">
                  <h1 class="h2 mb-0">{{ event.title }}</h1>
                </div>
  
                <div class="mb-4">
                  <p class="text-muted mb-2">
                    <i class="bi bi-calendar me-2"></i>
                    {{ new Date(event.date).toLocaleDateString() }}
                  </p>
                  <p class="text-muted mb-0">
                    <i class="bi bi-person me-2"></i>
                    Organized by {{ event.organizer?.name || 'Unknown' }}
                  </p>
                </div>
  
                <p class="mb-0">{{ event.description }}</p>
              </div>
            </div>
          </div>
  
          <div class="col-12 col-lg-4">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title mb-3">Event Details</h5>
                <ul class="list-unstyled mb-0">
                  <li class="mb-2">
                    <i class="bi bi-geo-alt me-2"></i>
                    {{ event.location || 'Location TBD' }}
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-people me-2"></i>
                    {{ event.attendees?.length || 0 }} Attendees
                  </li>
                </ul>
              </div>
            </div>
  
            <button 
              class="btn w-100" 
              :class="isAttending ? 'btn-outline-primary' : 'btn-primary'"
              @click="toggleAttendance"
            >
              {{ isAttending ? 'Cancel Attendance' : 'Attend Event' }}
            </button>
          </div>
        </div>
      </template>
  
      <div v-else class="text-center">
        <p class="text-muted">Event not found</p>
        <router-link to="/events" class="btn btn-primary">
          Back to Events
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useEventStore } from '@/stores/event'
  
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()
  const eventStore = useEventStore()
  
  const event = ref(null)
  const loading = ref(true)
  const isAttending = ref(false)
  
  const isOwner = computed(() => {
    return event.value?.organizerId === authStore.user?.id
  })
  
  onMounted(async () => {
    try {
      const eventId = route.params.id
      event.value = await eventStore.fetchEvent(eventId)
      // TODO: Check if user is attending
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      loading.value = false
    }
  })
  
  const editEvent = () => {
    // TODO: Implement edit functionality
  }
  
  const deleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return
    
    try {
      await eventStore.deleteEvent(event.value._id)
      router.push('/events')
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event. Please try again.')
    }
  }
  
  const toggleAttendance = async () => {
    try {
      if (isAttending.value) {
        await eventStore.cancelAttendance(event.value.id)
      } else {
        await eventStore.attendEvent(event.value.id)
      }
      isAttending.value = !isAttending.value
    } catch (error) {
      console.error('Error updating attendance:', error)
    }
  }
  </script>