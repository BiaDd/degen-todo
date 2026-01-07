<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" header="Add New Task" :modal="true"
        :style="{ width: '25rem' }">
        <div class="flex flex-column gap-4 mt-2">
            <div class="flex flex-column gap-2">
                <label for="task-text" class="font-semibold">What needs to be done?</label>
                <InputText id="task-text" v-model="form.text" autofocus />
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

<script setup>
import { reactive } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';

// Define Props
defineProps({
    visible: Boolean
});

// Define Emits
const emit = defineEmits(['update:visible', 'save']);

const form = reactive({
    text: '',
    date: null
});

const close = () => {
    emit('update:visible', false);
};

const submit = () => {
    if (form.text.trim()) {
        // Send the data to the parent
        emit('save', { ...form });

        // Reset local form
        form.text = '';
        form.date = null;
        close();
    }
};
</script>