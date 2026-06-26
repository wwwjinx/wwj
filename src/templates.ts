export interface Template {
  name: string
  repo: string
  display: string
}

export const templates: Template[] = [
  { name: 'vue', repo: 'yugutou-cli/vue-template', display: 'Vue' },
  { name: 'react', repo: 'yugutou-cli/react-template', display: 'React' },
  { name: 'koa', repo: 'yugutou-cli/koa-template', display: 'Koa' },
  { name: 'nestjs', repo: 'yugutou-cli/nestjs-template', display: 'NestJS' },
]

export function getTemplate(name: string): Template | undefined {
  return templates.find(t => t.name === name)
}
