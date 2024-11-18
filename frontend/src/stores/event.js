import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

const API_URL = 'http://127.0.0.1:5000/api'

export const useEventStore = defineStore('event', () => {
  const authStore = useAuthStore()
  const events = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Helper function to get auth headers
  const getHeaders = () => ({
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })

  const fetchEvents = async () => {
    loading.value = true
    try {
      const response = await axios.get(`${API_URL}/events/`)
      events.value = response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchEvent = async (id) => {
    loading.value = true
    try {
      const response = await axios.get(
        `${API_URL}/events/${id}`,
        getHeaders()
      )
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch event'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createEvent = async (eventData) => {
    loading.value = true
    try {
      const response = await axios.post(
        `${API_URL}/events/`, 
        eventData,
        getHeaders()
      )
      events.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateEvent = async (id, eventData) => {
    loading.value = true
    try {
      const response = await axios.put(
        `${API_URL}/events/${id}`, 
        eventData,
        getHeaders()
      )
      const index = events.value.findIndex(e => e.id === id)
      if (index !== -1) {
        events.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEvent = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.delete(
        `${API_URL}/events/${id}`,
        getHeaders()
      )
      
      if (response.status === 200) {
        events.value = events.value.filter(e => e._id !== id)
        return true
      }
      
      throw new Error('Failed to delete event')
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete event'
      console.error('Delete error details:', {
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
    fetchEvent,
    createEvent,
    updateEvent,
    deleteEvent
  }
})