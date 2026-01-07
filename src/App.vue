<template>
  <div class="layout-wrapper">
    <div :class="['layout-sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <div class="sidebar-header flex align-items-center justify-content-center py-4">
        <i class="pi pi-check-square text-primary text-3xl"></i>
      </div>

      <nav class="flex flex-column gap-2 px-2">
        <router-link to="/" class="nav-item" active-class="active">
          <i class="pi pi-home"></i>
          <span v-show="!isCollapsed">Tasks</span>
        </router-link>

        <router-link to="/calendar" class="nav-item" active-class="active">
          <i class="pi pi-calendar"></i>
          <span v-show="!isCollapsed">Calendar</span>
        </router-link>

        <router-link to="/about" class="nav-item" active-class="active">
          <i class="pi pi-info"></i>
          <span v-show="!isCollapsed">About</span>
        </router-link>
      </nav>

      <div class="mt-auto p-3 text-center">
        <Button :icon="isCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'" @click="isCollapsed = !isCollapsed"
          rounded text />
      </div>
    </div>

    <div class="layout-main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';

const isCollapsed = ref(false);
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
}

/* Sidebar Styles */
.layout-sidebar {
  background: var(--surface-card);
  border-right: 1px solid var(--surface-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  white-space: nowrap;
}


.sidebar-collapsed {
  width: 70px;
}

.layout-main {
  flex-grow: 1;
  background-color: var(--surface-ground);
}

/* Nav Link Styles */
.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  gap: 1rem;
  transition: background 0.2s;
}

.nav-item:hover {
  background: var(--surface-hover);
}

.nav-item.active {
  background: var(--primary-100);
  color: var(--primary-color);
}

.nav-item i {
  font-size: 1.2rem;
  min-width: 1.2rem;
}
</style>