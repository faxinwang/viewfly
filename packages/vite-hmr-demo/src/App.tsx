import { Counter1, Counter2 } from './Counter'
import { createSignal, onMounted } from '@viewfly/core'

/** 试着改这一段文案保存，页面应无缝热更新且不整页刷新。 */
export default function App() {
  const parentCount = createSignal(0)
  function incrementCount() {
    parentCount.set(parentCount() + 1)
  }
  
  onMounted(() => {
    console.log('App mounted')
    return () => {
      console.log('App unmounted')
    }
  })
  
  return () => (
    <div class={[
      'min-h-screen bg-gradient-to-b from-slate-100 via-cyan-50/40 to-slate-200/80 text-slate-900 antialiased',
      'dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100',
    ]}>
      <div class="mx-auto max-w-xl px-4 py-10 sm:px-5">
        <header class="mb-8 text-center">
          <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Viewfly · Vite HMR
          </p>
          <h1 class="text-balance text-lg font-semibold leading-snug sm:text-xl">
            编辑 <strong class="text-cyan-500 dark:text-cyan-400">App.tsx</strong> 或{' '}
            <strong class="text-cyan-500 dark:text-cyan-400">Counter.tsx</strong>
            ，保存后应热更新、不整页刷新
          </h1>
        </header>

        {/* 父组件外壳：子组件仅出现在此容器内，体现包含关系 */}
        <section
          class={[
            'overflow-hidden rounded-2xl border-2 border-cyan-400/45 bg-white/90 shadow-lg shadow-cyan-900/5',
            'ring-1 ring-cyan-500/10 dark:border-cyan-500/30 dark:bg-slate-900/85 dark:shadow-cyan-950/30',
          ]}
          aria-label="App 父组件及其子组件"
        >
          <div
            class={[
              'flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-cyan-500/15 bg-cyan-500/10 px-4 py-3',
              'dark:border-cyan-500/20 dark:bg-cyan-950/40',
            ]}
          >
            <span class="rounded-md bg-cyan-500/20 px-2 py-0.5 text-xs font-bold text-cyan-800 dark:text-cyan-200">
              App.tsx
            </span>
            <span class="text-sm text-slate-600 dark:text-slate-300">父组件</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">子树在下方嵌套渲染</span>
          </div>

          <div class="border-b border-slate-200/80 px-4 py-4 dark:border-slate-700/80">
            <p class="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">父组件 state</p>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span class="min-w-0 text-sm sm:text-base">
                父组件计数{' '}
                <span
                  class={[
                    'ml-1 inline-flex min-w-[2.25rem] items-center justify-center rounded-lg bg-cyan-500/15',
                    'px-2 py-0.5 text-sm font-semibold tabular-nums text-cyan-700 dark:text-cyan-300',
                  ]}
                >
                  {parentCount()}
                </span>
              </span>
              <button
                type="button"
                class={[
                  'shrink-0 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white',
                  'shadow-md shadow-cyan-600/25 transition hover:brightness-105',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400',
                  'active:scale-[0.99] dark:from-cyan-500 dark:to-cyan-700',
                ]}
                onClick={incrementCount}
              >
                点击 +1（可改这句文案!!!）
              </button>
            </div>
          </div>

          <div class="bg-gradient-to-b from-slate-50/95 to-slate-100/90 px-4 py-4 dark:from-slate-950/50 dark:to-slate-900/40">
            <p class="mb-3 text-xs font-medium text-slate-600 dark:text-slate-400">
              子组件（同一文件 <strong class="font-semibold text-cyan-600 dark:text-cyan-400">Counter.tsx</strong>{' '}
              中的 Counter1 与 Counter2，用于组件级 HMR）
            </p>
            <div class="space-y-4 border-l-4 border-cyan-400/55 pl-4 dark:border-cyan-500/45">
              <Counter1 />
              <Counter2 />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
