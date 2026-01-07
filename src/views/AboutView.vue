<template>
    <div class="flex justify-content-center">
        <Card class="w-full md:w-30rem shadow-2">
            <template #title>
                <div class="flex align-items-center gap-2">
                    <i class="pi pi-info-circle text-primary text-2xl"></i>
                    <span>About TaskMaster</span>
                </div>
            </template>

            <template #content>
                <p class="line-height-3 m-0 mb-4">
                    TaskMaster is a modern productivity tool built with
                    <strong>Vue 3</strong>, <strong>Pinia</strong>, and <strong>PrimeVue</strong>.
                    It demonstrates how to manage state globally and navigate between views seamlessly.
                </p>

                <div class="surface-ground p-3 border-round mb-4">
                    <h4 class="mt-0 mb-2">Statistics</h4>
                    <div class="flex justify-content-between">
                        <span>Total Tasks in Store:</span>
                        <Badge :value="store.tasks.length" severity="info"></Badge>
                    </div>
                </div>

                <div class="flex flex-column gap-2">
                    <div class="flex align-items-center gap-2 text-sm text-600">
                        <i class="pi pi-check text-green-500"></i>
                        <span>Real-time reactivity</span>
                    </div>
                    <div class="flex align-items-center gap-2 text-sm text-600">
                        <i class="pi pi-check text-green-500"></i>
                        <span>Global State Management</span>
                    </div>
                </div>
            </template>

            <template #footer>
                <Button label="Back to Tasks" icon="pi pi-arrow-left" class="p-button-text"
                    @click="$router.push('/')" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Badge from 'primevue/badge';

const store = useTodoStore();
</script>