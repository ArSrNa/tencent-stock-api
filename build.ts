import dts from 'bun-plugin-dts';

// build.script.ts
const result = await Bun.build({
    entrypoints: ['src/index.ts'],
    outdir: 'dist',
    target: "browser",
    minify: true,
    plugins: [dts()]
})

console.log(result)