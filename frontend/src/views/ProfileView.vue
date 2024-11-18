<template>
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <div class="card">
            <div class="card-body text-center">
              <div class="mb-4">
                <div class="avatar-placeholder bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  {{ userInitials }}
                </div>
                <h4 class="mb-1">{{ authStore.user?.name }}</h4>
                <p class="text-muted">{{ authStore.user?.email }}</p>
              </div>
              <button class="btn btn-outline-primary w-100" @click="showEditDialog = true">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div class="col-12 col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Account Settings</h5>
              
              <div class="mb-4">
                <h6 class="text-muted mb-3">Email Notifications</h6>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" v-model="notifications.events">
                  <label class="form-check-label">Event updates and reminders</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" v-model="notifications.messages">
                  <label class="form-check-label">Messages from other users</label>
                </div>
              </div>
  
              <div class="mb-4">
                <h6 class="text-muted mb-3">Privacy</h6>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" v-model="privacy.publicProfile">
                  <label class="form-check-label">Make profile public</label>
                </div>
              </div>
  
              <button class="btn btn-primary" @click="saveSettings" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  
  const authStore = useAuthStore()
  const showEditDialog = ref(false)
  const saving = ref(false)
  
  const notifications = ref({
    events: true,
    messages: true
  })
  
  const privacy = ref({
    publicProfile: false
  })
  
  const userInitials = computed(() => {
    const name = authStore.user?.name || ''
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  })
  
  const saveSettings = async () => {
    saving.value = true
    try {
      // TODO: Implement settings save
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      saving.value = false
    }
  }
  </script>
  
  <style scoped>
  .avatar-placeholder {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  </style>