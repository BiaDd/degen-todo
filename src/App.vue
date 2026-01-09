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

    <Dialog v-model:visible="showVideo" modal header="Task Complete! Enjoy a break 💃" :style="{ width: '420px' }"
      @show="loadTikTok">
      <div class="flex justify-content-center">
        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@j_butters4/video/7581509198257655070"
          data-video-id="7581509198257655070" style="max-width: 325px;">
          <section></section>
        </blockquote>
      </div>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from 'primevue/button';
import { useTodoStore } from './stores/todoStore';
import Dialog from 'primevue/dialog';
import confetti from 'canvas-confetti';

const store = useTodoStore();
const showVideo = ref(false);

const isCollapsed = ref(false);

// Watch for task completion
watch(
  () => store.tasks.map(t => ({ id: t.id, completed: t.completed })),
  (newTasks, oldTasks) => {
    if (!oldTasks) return;

    const justCompleted = newTasks.some(newTask => {
      const oldTask = oldTasks.find(t => t.id === newTask.id);
      return newTask.completed && oldTask && !oldTask.completed;
    });

    if (justCompleted) {
      triggerCelebration();
    }
  }
);

const triggerCelebration = (): void => {
  // 1. Fire Confetti
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 }, // Left side
      colors: ['#3b82f6', '#10b981', '#f59e0b']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Right side
      colors: ['#3b82f6', '#10b981', '#f59e0b']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

  // 2. Open Video Modal
  showVideo.value = true;
};

const loadTikTok = () => {
  if (document.getElementById('tiktok-embed-script')) {
    // Script already loaded — reprocess embeds
    // @ts-ignore
    window.tiktok?.load();
    return;
  }

  const script = document.createElement('script');
  script.id = 'tiktok-embed-script';
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
};

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