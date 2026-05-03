<template>
  <AppLayout>
    <div class="grid gap-6 w-full max-w-xl">
      <h2 class="text-xl font-bold">待辦清單</h2>

      <form class="grid grid-cols-[1fr_auto] gap-2" @submit.prevent="addTodo">
        <InputText
          v-model="newTitle"
          placeholder="新增待辦事項..."
          required
          fluid
        />
        <Button type="submit" :loading="adding" label="新增" />
      </form>

      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>

      <ul v-if="todos.length > 0" class="grid gap-2">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg"
        >
          <Checkbox
            :modelValue="todo.is_complete"
            binary
            @update:modelValue="toggleTodo(todo)"
          />
          <span
            class="text-sm transition-colors"
            :class="todo.is_complete ? 'line-through text-gray-400' : 'text-gray-800'"
          >
            {{ todo.title }}
          </span>
          <Button
            icon="pi pi-times"
            severity="danger"
            text
            size="small"
            @click="deleteTodo(todo.id)"
          />
        </li>
      </ul>

      <p v-else-if="!loading" class="text-sm text-gray-400 text-center py-6">
        目前沒有待辦事項
      </p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import { api } from '../../lib/apiTracker'
import { currentUser } from '../../lib/auth'
import AppLayout from '../../layouts/AppLayout/AppLayout.vue'

interface Todo {
  id: number
  created_at: string
  title: string
  is_complete: boolean
  user_id: string
}

const todos = ref<Todo[]>([])
const newTitle = ref('')
const error = ref('')
const loading = ref(false)
const adding = ref(false)

onMounted(fetchTodos)

async function fetchTodos() {
  loading.value = true
  const { data, error: err } = await api('todos/fetch', () =>
    Promise.resolve(supabase.from('todos').select('*').order('created_at', { ascending: false }))
  )
  loading.value = false
  if (err) { error.value = err.message; return }
  todos.value = data ?? []
}

async function addTodo() {
  if (!newTitle.value.trim()) return
  adding.value = true
  const { data, error: err } = await api('todos/add', () =>
    Promise.resolve(
      supabase.from('todos').insert({
        title: newTitle.value.trim(),
        is_complete: false,
        user_id: currentUser.value?.id,
      }).select().single()
    )
  )
  adding.value = false
  if (err) { error.value = err.message; return }
  todos.value.unshift(data)
  newTitle.value = ''
}

async function toggleTodo(todo: Todo) {
  todo.is_complete = !todo.is_complete
  const { error: err } = await api('todos/toggle', () =>
    Promise.resolve(supabase.from('todos').update({ is_complete: todo.is_complete }).eq('id', todo.id))
  )
  if (err) {
    error.value = err.message
    todo.is_complete = !todo.is_complete
  }
}

async function deleteTodo(id: number) {
  const { error: err } = await api('todos/delete', () =>
    Promise.resolve(supabase.from('todos').delete().eq('id', id))
  )
  if (err) { error.value = err.message; return }
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>
