<template>
  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="display-6">Welcome, {{ authStore.user?.name }}</h1>
          <button class="btn btn-primary" @click="showEventDialog = true">
            <i class="bi bi-plus-lg me-2"></i>Create Event
          </button>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-if="eventStore.loading" class="col-12 text-center">
        <div class="spinner-border text-primary"></div>
      </div>
      
      <template v-else>
        <div class="col-12 col-md-6 col-lg-4" v-for="event in eventStore.events" :key="event._id">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">{{ event.title }}</h5>
                <div class="dropdown">
                  <button class="btn btn-link text-muted p-0" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="editEvent(event)">
                        <i class="bi bi-pencil me-2"></i>Edit
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item text-danger" href="#" @click.prevent="deleteEvent(event._id)">
                        <i class="bi bi-trash me-2"></i>Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <p class="card-text text-muted mb-3">
                <i class="bi bi-calendar me-2"></i>
                {{ new Date(event.date).toLocaleDateString() }}
              </p>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <event-dialog
      v-model="showEventDialog"
      :event="selectedEvent"
      @created="onEventCreated"
      @updated="onEventUpdated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import EventDialog from '@/components/event/EventDialog.vue'

const authStore = useAuthStore()
const eventStore = useEventStore()
const showEventDialog = ref(false)
const selectedEvent = ref(null)

onMounted(() => {
  eventStore.fetchEvents()
})

const editEvent = (event) => {
  selectedEvent.value = event
  showEventDialog.value = true
}

const deleteEvent = async (id) => {
  if (confirm('Are you sure you want to delete this event?')) {
    try {
      await eventStore.deleteEvent(id)
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete event. Please try again.')
    }
  }
}

const onEventCreated = () => {
  selectedEvent.value = null
}

const onEventUpdated = () => {
  selectedEvent.value = null
}
</script>