<template>
    <div class="p-4">
        <div class="flex justify-content-between mb-4">
            <h2 class="m-0">My Tasks</h2>
            <Button label="New Task" icon="pi pi-plus" @click="isFormVisible = true" />
        </div>

        <div class="flex flex-column gap-3">
            <Card v-for="task in store.tasks" :key="task.id" class="shadow-2">
                <template #content>
                    <div class="flex align-items-center justify-content-between">
                        <div class="flex align-items-center gap-3">
                            <Checkbox v-model="task.completed" :binary="true" />
                            <div>
                                <div>
                                    <span :class="{ 'line-through text-gray-500': task.completed }" class="font-bold">
                                        {{ task.text }}
                                    </span>
                                    <br/>
                                    <span v-if="task.description" class="">
                                        {{ task.description }}
                                    </span>
                                </div>
                                <small class="text-500" v-if="task.dueDate">
                                    <i class="pi pi-calendar mr-1" style="font-size: 0.7rem"></i>
                                    {{ new Date(task.dueDate).toLocaleDateString() }}
                                </small>
                            </div>
                        </div>
                        <Button icon="pi pi-trash" severity="danger" text @click="store.deleteTask(task.id)" />
                    </div>
                </template>
            </Card>
        </div>

        <TaskForm v-model:visible="isFormVisible" @save="handleSave" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import TaskForm from '../components/TaskForm.vue';
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button';
import Card from 'primevue/card';

const store = useTodoStore();
const isFormVisible = ref(false);

const handleSave = (taskData) => {
    store.addTask(taskData.text, taskData.date);
};
</script>