// Eleventy 3.x — CETPRO San Luis (estático, sin dependencias de runtime)
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/assets': '/assets' });
  eleventyConfig.addNunjucksFilter('hasPrefix', (s, p) => (typeof s === 'string' ? s.startsWith(p) : false));
  eleventyConfig.addNunjucksFilter('limit', (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : arr));
  eleventyConfig.addNunjucksFilter('filterBy', (arr, key, value) => (Array.isArray(arr) ? arr.filter((i) => i && i[key] === value) : arr));

  // Configuración cero: rutas estables, español, sin transformaciones mágicas.
  return {
    dir: { input: 'src', output: 'dist', includes: '_includes', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'html', 'md', 'liquid']
  };
}
