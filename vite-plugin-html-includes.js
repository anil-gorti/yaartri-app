import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';

export default function htmlIncludes() {
  return {
    name: 'html-includes',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return html.replace(
          /<!--#include file="([^"]+)" -->/g,
          (_match, filePath) => {
            const dir = ctx.filename ? dirname(ctx.filename) : process.cwd();
            const fullPath = resolve(dir, filePath);
            try {
              return readFileSync(fullPath, 'utf-8');
            } catch {
              console.warn(`[html-includes] Could not read: ${fullPath}`);
              return _match;
            }
          }
        );
      }
    }
  };
}
