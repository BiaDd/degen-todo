<template>
    <div class="p-4">
        <div class="calendar-page-container">
            <div class="card shadow-2 p-3 surface-card border-round">
                <FullCalendar :options="calendarOptions" />
                <div class="flex flex-wrap justify-content-center gap-4 mt-4 pt-3 border-top-1 border-200">
                    <div class="flex align-items-center gap-2">
                        <Tag value=" " :style="{ backgroundColor: '#3b82f6', width: '1rem', height: '1rem' }" rounded />
                        <span class="text-sm font-medium text-700">Pending</span>
                    </div>
                    <div class="flex align-items-center gap-2">
                        <Tag value=" " :style="{ backgroundColor: '#10b981', width: '1rem', height: '1rem' }" rounded />
                        <span class="text-sm font-medium text-700">Completed</span>
                    </div>
                </div>
            </div>
        </div>

        <TaskForm v-model:visible="isFormVisible" :initialDate="selectedDate" @save="handleSave" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import TaskForm from '../components/TaskForm.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Tag from 'primevue/tag';
import type { CalendarOptions, EventInput } from '@fullcalendar/core';

const store = useTodoStore();
const isFormVisible = ref(false);
const selectedDate = ref<Date | null>(null);

const handleSave = (taskData: { text: string; date: Date }) => {
    store.addTask(taskData.text, taskData.date);
    isFormVisible.value = false;
};

// Transform Store Tasks to Calendar Events
const calendarEvents = computed<EventInput[]>(() => {
    return store.tasks
        .filter((task): task is typeof task & { dueDate: Date | string } => !!task.dueDate)
        .map(task => ({
            id: String(task.id),
            title: task.text,
            start: task.dueDate instanceof Date ? task.dueDate.toISOString() : new Date(task.dueDate),
            backgroundColor: task.completed ? '#10b981' : '#3b82f6',
            borderColor: 'transparent',
        }));
});

const calendarOptions = computed<CalendarOptions>(() => ({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: calendarEvents.value,
    // This captures the click on a specific day
    dateClick: (info) => {
        selectedDate.value = new Date(info.dateStr + 'T00:00:00'); // Add time to avoid timezone shifts
        isFormVisible.value = true;
    },
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
    },
    height: 'auto'
}));
</script>

<style scoped>
/* Ensure the border-top-1 is visible */
.border-top-1 {
    border-top: 1px solid var(--surface-border);
}
</style>