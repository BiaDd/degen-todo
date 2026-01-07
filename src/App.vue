<template>
  <div class="layout-wrapper">
    <header class="navbar p-3 shadow-1 mb-4">
      <div class="flex align-items-center justify-content-between max-w-7xl mx-auto">
        <div class="flex align-items-center gap-2">
          <i class="pi pi-check-square text-primary text-2xl"></i>
          <h1 class="text-xl font-bold m-0">DoomTodo</h1>
        </div>

        <nav class="flex gap-4">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/calendar" class="nav-link"> Calendar</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Global Styles */
body {
  margin: 0;
  background-color: var(--surface-ground);
  /* PrimeVue variable */
  font-family: var(--font-family);
}

.navbar {
  background-color: var(--surface-card);
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s;
}

/* Style for the currently active route */
.router-link-active {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}

/* Optional: Simple Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
