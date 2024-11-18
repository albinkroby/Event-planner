<template>
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h1 class="display-4 mb-4">About EventPlanner</h1>
          <p class="lead">
            Making event planning simple, organized, and enjoyable for everyone.
          </p>
        </div>
      </div>
  
      <div class="row mb-5">
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <h2 class="h3 mb-4">Our Mission</h2>
          <p>
            At EventPlanner, we believe that organizing events should be as enjoyable as attending them. 
            Our platform simplifies the entire event planning process, allowing you to focus on creating 
            memorable experiences rather than getting lost in the details.
          </p>
        </div>
        <div class="col-12 col-md-6">
          <h2 class="h3 mb-4">What We Offer</h2>
          <ul class="list-unstyled">
            <li class="mb-3">
              <i class="bi bi-check2-circle text-primary me-2"></i>
              Intuitive event creation and management
            </li>
            <li class="mb-3">
              <i class="bi bi-check2-circle text-primary me-2"></i>
              Smart guest list management
            </li>
            <li class="mb-3">
              <i class="bi bi-check2-circle text-primary me-2"></i>
              Automated notifications and reminders
            </li>
            <li class="mb-3">
              <i class="bi bi-check2-circle text-primary me-2"></i>
              Real-time updates and communication
            </li>
          </ul>
        </div>
      </div>
  
      <div class="row">
        <div class="col-12">
          <div class="card bg-light">
            <div class="card-body text-center p-5">
              <h2 class="h3 mb-4">Ready to Get Started?</h2>
              <p class="mb-4">Join thousands of event planners who trust our platform.</p>
              <router-link to="/signup" class="btn btn-primary btn-lg">
                Create Your Account
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>