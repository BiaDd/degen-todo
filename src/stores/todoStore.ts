// stores/todoStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface TodoObject {
  id: number
  text: string
  description?: string
  dueDate: Date
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<TodoObject[]>([
    {
      id: Date.now(),
      text: 'Example todo',
      description: 'optional description',
      dueDate: new Date(),
      completed: false,
    },
  ])

  // Actions
  function addTask(text: string, date: Date, description?: string) {
    tasks.value.push({
      id: Date.now(),
      text,
      description,
      dueDate: date,
      completed: false,
    })
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function toggleTask(id: number) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.completed = !task.completed
  }

  // Getters
  const completedCount = computed(() => tasks.value.filter((t) => t.completed).length)

  return { tasks, addTask, deleteTask, toggleTask, completedCount }
})
