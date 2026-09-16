export interface Template {
  name: string
  repo: string
  display: string
}

export const templates: Template[] = [
  { name: 'vue', repo: 'wwwjinx/vue-template', display: 'Vue' },
  { name: 'react', repo: 'wwwjinx/react-template', display: 'React' },
  { name: 'koa', repo: 'wwwjinx/koa-ts-template', display: 'Koa' },
]

export function getTemplate(name: string): Template | undefined {
  return templates.find(t => t.name === name)
}
