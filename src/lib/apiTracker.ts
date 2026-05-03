import { reactive } from 'vue'

export const apiState = reactive({ active: [] as string[] })

export async function api<T>(name: string, fn: () => PromiseLike<T>): Promise<T> {
  apiState.active.push(name)
  try {
    return await fn()
  } finally {
    const i = apiState.active.indexOf(name)
    if (i > -1) apiState.active.splice(i, 1)
  }
}
