import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
// import vercel from '@astrojs/vercel';

export default defineConfig({
    integrations: [icon(), mdx()],
    vite: {
        plugins: [tailwindcss()],
    },
    output: 'static',
    // adapter: vercel({
    //     imageService: true,
    // }),
});