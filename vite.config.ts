import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';
import { DateTime } from 'luxon';
import fsExtras from 'fs-extra';
import { name, version } from './package.json';

const buildDate = DateTime.now().toFormat('dd/MM/yyyy-HH:mm');
const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const gitCommit = execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig(({ command, mode }) => {
    const appInfo = {
        NAME: name,
        VERSION: version,
        RELEASE: `${name}@${version}+${gitCommit}`,
        BUILD: {
            DATE: buildDate,
            ENV: mode,
            COMMIT: `${gitBranch}+${gitCommit}`,
        },
    };

    const config = {
        base: '/',
        envDir: new URL('./env', import.meta.url).pathname,
        resolve: {
            alias: {
                '@': new URL('./src/', import.meta.url).pathname,
            },
        },
        define: {
            APP_INFO: JSON.stringify(appInfo),
        },
        build: {
            sourcemap: mode === 'prod' ? false : true,
        },
        plugins: [
            vue(),

            vueDevTools(),

            AutoImport({
                dts: 'generated/auto-imports.d.ts',
                vueTemplate: true,
                dirs: ['src/stores', 'src/composables'],
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/core',
                    { from: 'luxon', imports: ['DateTime', 'Interval'], type: false },
                ],
                viteOptimizeDeps: true,
                eslintrc: {
                    enabled: true,
                    filepath: 'generated/eslintrc-auto-import.mjs',
                    globalsPropValue: true,
                },
            }),

            tailwindcss(),

            {
                name: 'app-info-generator',
                closeBundle: async () => {
                    await fsExtras.outputFileSync(
                        './generated/app.info.json',
                        JSON.stringify(appInfo)
                    );
                },
            },
        ],

        test: {
            include: ['test/**/*.test.ts'],
            environment: 'jsdom',
        },
    };

    config.build.sourcemap = command === 'serve';

    return config;
});
