<template>
    <div class="modal fade" :class="{ 'show': modelValue }" tabindex="-1" 
         :style="{ display: modelValue ? 'block' : 'none' }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEdit ? 'Edit Event' : 'Create Event' }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="form.title" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" class="form-control" v-model="form.date" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="form.description" rows="3" required></textarea>
              </div>
  
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEdit ? 'Update' : 'Create' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="modelValue"></div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch, computed } from 'vue'
  import { useEventStore } from '@/stores/event'
  
  const props = defineProps({
    modelValue: Boolean,
    event: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'created', 'updated'])
  const eventStore = useEventStore()
  const loading = ref(false)
  
  const form = ref({
    title: '',
    date: '',
    description: ''
  })
  
  const isEdit = computed(() => !!props.event)
  
  // Format date for form input
  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }
  
  // Parse date for API
  const parseDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toISOString()
  }
  
  watch(() => props.event, (newEvent) => {
    if (newEvent) {
      form.value = {
        ...newEvent,
        date: formatDate(newEvent.date)
      }
    } else {
      form.value = { title: '', date: '', description: '' }
    }
  })
  
  const close = () => {
    emit('update:modelValue', false)
  }
  
  const handleSubmit = async () => {
    loading.value = true
    try {
      const eventData = {
        ...form.value,
        date: parseDate(form.value.date)
      }
  
      if (isEdit.value && props.event?._id) {
        const updated = await eventStore.updateEvent(props.event._id, eventData)
        emit('updated', updated)
      } else {
        const created = await eventStore.createEvent(eventData)
        emit('created', created)
      }
      close()
    } catch (error) {
      console.error('Event save error:', error)
    } finally {
      loading.value = false
    }
  }
  </script>