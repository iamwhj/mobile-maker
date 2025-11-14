import { defineConfig } from 'tsup'

// Build-time replacement of process.env.* using values available when
// tsup runs. This lets esbuild statically replace occurrences like
// `process.env.PORT` with the actual value from the environment.
//
// Note: run your build wrapped by dotenvx (you already have
// `dotenvx run --env-file=.env.production -- tsup ...`) so process.env is
// populated before this config executes.
const isValidIdent = (s: string) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s)
const defineEnv = Object.keys(process.env).reduce(
  (acc, key) => {
    const val = process.env[key]
    if (typeof val === 'undefined') return acc
    const defineName = isValidIdent(key) ? `process.env.${key}` : `process.env[${JSON.stringify(key)}]`

    acc[defineName] = JSON.stringify(val)
    return acc
  },
  {} as Record<string, string>
)

export default defineConfig({
  entry: ['src/app.ts'],
  outDir: 'dist',
  format: 'cjs',
  clean: true,
  bundle: true,
  dts: false,
  splitting: false,
  sourcemap: false,
  target: 'node22',
  platform: 'node',
  // 不打包node_modules里的依赖，部署时需要连同package.json一起部署，install依赖
  skipNodeModulesBundle: true,
  external: ['node_modules'],
  // Pass defines to esbuild so occurrences of process.env.FOO are replaced
  // with their JSON stringified build-time values.
  define: defineEnv,
})
