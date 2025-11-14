import { createPinia } from 'pinia'

export function createStore() {
    // 实现单例模式 （admin、editor需要使用同一个store）
    if (!window.pinia) {
        window.pinia = createPinia()
    }
    return window.pinia
}

export * from './admin-store'
export * from './editor-store'
