import { createSignal, onMounted } from '@viewfly/core'

/** 模块级 signal：热更新重跑本文件时一般会重置（组件级 HMR 不受影响）。 */
const moduleLevelCount = createSignal(0)

function incrementModuleLevelCount() {
  moduleLevelCount.set(moduleLevelCount() + 1)
}

/** 改动按钮文案保存，可验证 Counter 在无整页 reload 情况下热替换。 */
export function Counter1() {
  const componentLevelCount = createSignal(0)

  function incrementCount() {
    componentLevelCount.set(componentLevelCount() + 1)
  }

  onMounted(() => {
    console.log('Counter1 mounted')
    return () => {
      console.log('Counter1 unmounted')
    }
  })

  return () => (
    <article
      class="rounded-xl border border-slate-200/90 bg-white/95 p-3 shadow-sm dark:border-slate-600/80 dark:bg-slate-800/70"
      aria-label="Counter1"
    >
      <div class="mb-3 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-600/80">
        <span class="rounded bg-slate-800/90 px-2 py-0.5 font-mono text-[11px] font-medium text-white dark:bg-slate-700">
          Counter.tsx
        </span>
        <h2 class="text-xs font-semibold text-slate-600 dark:text-slate-300">Counter1 · 模块级 vs 组件级</h2>
      </div>

      <div class="space-y-3">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span class="text-sm">
            模块级{' '}
            <span
              class={[
                'ml-1 inline-flex min-w-[2.25rem] items-center justify-center rounded-lg bg-cyan-500/15',
                'px-2 py-0.5 text-sm font-semibold tabular-nums text-cyan-700 dark:text-cyan-300',
              ]}
            >
              {moduleLevelCount()}
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
            onClick={incrementModuleLevelCount}
          >
            点击 +1（可改这句文案！）
          </button>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {
            '注意: 单独修改模块中的状态, 引用这个状态的组件不会热更新，因此看不到变化，' +
            '需要同时修改引用这个状态的组件的代码，触发组件级 HMR 才能看到变化'
          }
        </p>

        <div
          class={[
            'flex flex-col gap-3 border-t border-slate-100 pt-3 dark:border-slate-600/80',
            'sm:flex-row sm:items-center sm:justify-between',
          ]}
        >
          <span class="text-sm">
            组件级{' '}
            <span
              class={[
                'ml-1 inline-flex min-w-[2.25rem] items-center justify-center rounded-lg bg-cyan-500/15',
                'px-2 py-0.5 text-sm font-semibold tabular-nums text-cyan-700 dark:text-cyan-300',
              ]}
            >
              {componentLevelCount()}
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
            点击 +1（可改这句文案 !!）
          </button>
        </div>
      </div>
    </article>
  )
}

/** 测试组件级别的 hmr, 只改 Counter2 组件的代码，Counter1 组件的状态保持不变 */
export function Counter2() {
  const count = createSignal(0)
  function incrementCount() {
    count.set(count() + 1)
  }
  onMounted(() => {
    console.log('Counter2 mounted')
    return () => {
      console.log('Counter2 unmounted')
    }
  })
  return () => (
    <article
      class="rounded-xl border border-slate-200/90 bg-white/95 p-3 shadow-sm dark:border-slate-600/80 dark:bg-slate-800/70"
      aria-label="Counter2"
    >
      <div class="mb-3 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-600/80">
        <span class="rounded bg-slate-800/90 px-2 py-0.5 font-mono text-[11px] font-medium text-white dark:bg-slate-700">
          Counter.tsx
        </span>
        <h2 class="text-xs font-semibold text-slate-600 dark:text-slate-300">Counter2 · 组件级 HMR</h2>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span class="text-sm">
          Counter2{' '}
          <span
            class={[
              'ml-1 inline-flex min-w-[2.25rem] items-center justify-center rounded-lg bg-cyan-500/15',
              'px-2 py-0.5 text-sm font-semibold tabular-nums text-cyan-700 dark:text-cyan-300',
            ]}
          >
            {count()}
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
          点击 +1（可改这句文案!!）
        </button>
      </div>
    </article>
  )
}
