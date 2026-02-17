import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
// import vercel from '@astrojs/vercel';

export default defineConfig({
    integrations: [icon()],
    vite: {
        plugins: [tailwindcss()],
    },
    output: 'static',
    // adapter: vercel({
    //     imageService: true,
    // }),
});
