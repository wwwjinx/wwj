export interface Template {
  name: string
  repo: string
  display: string
}

export const templates: Template[] = [
  { name: 'vue', repo: 'wwwjinx/vue-template#main', display: 'Vue' },
  { name: 'react', repo: 'wwwjinx/react-template#main', display: 'React' },
  { name: 'koa', repo: 'wwwjinx/koa-ts-template#main', display: 'Koa' },
]

export function getTemplate(name: string): Template | undefined {
  return templates.find(t => t.name === name)
}
