<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" header="Add New Task" :modal="true"
        :style="{ width: '25rem' }">
        <div class="flex flex-column gap-4 mt-2">
            <div class="flex flex-column gap-2">
                <label for="task-text" class="font-semibold">What needs to be done?</label>
                <InputText id="task-text" v-model="form.text" autofocus />
            </div>

            <div class="flex flex-column gap-2">
                <label for="task-description" class="font-semibold">Description (Optional)</label>
                <InputText id="task-description" v-model="form.description" />
            </div>

            <div class="flex flex-column gap-2">
                <label for="due-date" class="font-semibold">Due Date (Optional)</label>
                <DatePicker id="due-date" v-model="form.date" dateFormat="dd/mm/yy" />
            </div>

            <div class="flex justify-content-end gap-2">
                <Button label="Cancel" severity="secondary" @click="close" />
                <Button label="Save Task" @click="submit" />
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'

const props = defineProps<{
    visible: boolean;
    initialDate?: Date | null;
    taskToEdit?: any | null; // Add this prop to receive the task being edited
}>();

const emit = defineEmits(['update:visible', 'save', 'update']) // Add 'update' emit

const form = reactive({
    text: '',
    description: '',
    date: null as Date | null,
})

watch(() => props.visible, (isOpen) => {
    if (isOpen) {
        if (props.taskToEdit) {
            // Fill form with existing task data
            form.text = props.taskToEdit.text
            form.description = props.taskToEdit.description || ''
            form.date = props.taskToEdit.dueDate ? new Date(props.taskToEdit.dueDate) : null
        } else {
            // Reset for New Task
            form.text = ''
            form.description = ''
            form.date = props.initialDate || null
        }
    }
})

const submit = () => {
    if (form.text.trim()) {
        if (props.taskToEdit) {
            // Send update event if we have an ID
            emit('update', { id: props.taskToEdit.id, ...form })
        } else {
            emit('save', { ...form })
        }

        // Reset and close
        form.text = ''
        form.description = ''
        form.date = null
        close()
    }
}

const close = () => {
    emit('update:visible', false)
}
</script>