import { ref } from 'vue'

const isTransitioning = ref(false)
const loadingProgress = ref(0)
let timer = null

function startTransition() {
    isTransitioning.value = true
    loadingProgress.value = 0

    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        if (loadingProgress.value < 90) {
            loadingProgress.value += 5
        }
    }, 1000)
}

function endTransition() {
    loadingProgress.value = 100
    setTimeout(() => {
        isTransitioning.value = false
        loadingProgress.value = 0
        clearInterval(timer)
    }, 400)
}

export function usePageTransition() {
    return {
        isTransitioning,
        loadingProgress,
        startTransition,
        endTransition,
    }
}