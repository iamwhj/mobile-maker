import { debounce } from '@/utils'

const  _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(cb) {
        cb = debounce(cb, 100)
        super(cb)
    }
}