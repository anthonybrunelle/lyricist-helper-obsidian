import esbuild from 'esbuild';

esbuild.context({
    entryPoints: ['main.ts'],
    bundle: true,
    outfile: 'main.js',
    platform: 'node',
    format: 'cjs',
    external: ['obsidian'],
}).then(ctx => {
    ctx.watch().then(() => {
        console.log('Watching for changes...');
    });
}).catch(() => process.exit(1));
