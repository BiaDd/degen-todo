<template>
    <div class="p-4">
        <div class="flex justify-content-between align-items-center mb-4">
            <h2 class="m-0">My Tasks</h2>

            <div class="flex gap-3 align-items-center">
                <SelectButton v-model="viewMode" :options="viewOptions" optionLabel="icon" dataKey="value">
                    <template #option="slotProps">
                        <i :class="slotProps.option.icon"></i>
                    </template>
                </SelectButton>

                <Button label="New Task" icon="pi pi-plus" @click="isFormVisible = true" />
            </div>
        </div>

        <div class="grid">
            <div v-for="task in store.tasks" :key="task.id"
                :class="viewMode?.value === 'list' ? 'col-12' : 'col-12 md:col-6 lg:col-4'">
                <Card class="shadow-2 h-full">
                    <template #content>
                        <div class="flex flex-column h-full">
                            <div class="flex align-items-start justify-content-between mb-2">
                                <div class="flex align-items-center gap-3">
                                    <Checkbox v-model="task.completed" :binary="true" />
                                    <span :class="{ 'line-through text-gray-500': task.completed }" class="font-bold">
                                        {{ task.text }}
                                    </span>
                                </div>
                                <div>
                                    <Button icon="pi pi-pencil" text @click="openEdit(task)" />
                                    <Button icon="pi pi-trash" severity="danger" text
                                        @click="store.deleteTask(task.id)" />
                                </div>
                            </div>

                            <div class="flex-grow-1 ml-5">
                                <p v-if="task.description" class="text-600 m-0 mb-2">
                                    {{ task.description }}
                                </p>
                                <small class="text-500" v-if="task.dueDate">
                                    <i class="pi pi-calendar mr-1" style="font-size: 0.7rem"></i>
                                    {{ new Date(task.dueDate).toLocaleDateString() }}
                                </small>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>

        <TaskForm v-model:visible="isFormVisible" :taskToEdit="editingTask" :initialDate="selectedDate"
            @save="handleSave" @update="handleUpdate" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TaskForm from '../components/TaskForm.vue'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Card from 'primevue/card'
import SelectButton from 'primevue/selectbutton'

const store = useTodoStore()
const isFormVisible = ref(false)
const editingTask = ref(null)
const selectedDate = ref<Date | null>(null)


// View Toggle Logic
const viewOptions = ref([
    { icon: 'pi pi-list', value: 'list' },
    { icon: 'pi pi-th-large', value: 'grid' },
])
const viewMode = ref(viewOptions.value[0]) // Default to list

const handleSave = (taskData: { text: string; date: Date }) => {
    store.addTask(taskData.text, taskData.date)
}


const openEdit = (task: any) => {
    editingTask.value = task
    isFormVisible.value = true
}

const handleUpdate = (formData: any) => {
    // Map the form's 'date' back to the store's 'dueDate'
    store.updateTask(formData.id, {
        text: formData.text,
        description: formData.description,
        dueDate: formData.date
    })
}

watch(isFormVisible, (val) => {
    if (!val) editingTask.value = null
})
</script>

<style scoped>
/* Ensures grid cards are the same height */
.p-card {
    display: flex;
    flex-direction: column;
}
</style>
