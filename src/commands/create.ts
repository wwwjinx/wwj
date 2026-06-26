import { existsSync } from 'node:fs'
import { cwd } from 'node:process'
import { text, select, isCancel, cancel, spinner } from '@clack/prompts'
import { templates } from '../templates.js'
import { downloadTemplate } from '../utils/download.js'
import { updatePackageJson } from '../utils/rename.js'

export async function createCommand(projectName?: string) {
  if (!projectName) {
    const result = await text({
      message: 'Project name:',
      placeholder: 'my-app',
      validate(value) {
        if (!value) return 'Please enter a project name'
        if (existsSync(`${cwd()}/${value}`)) return `Directory "${value}" already exists`
      },
    })
    if (isCancel(result)) return cancel('Cancelled')
    projectName = result
  }

  const templateName = await select({
    message: 'Select template:',
    options: templates.map(t => ({ value: t.name, label: t.display })),
  })
  if (isCancel(templateName)) return cancel('Cancelled')

  const template = templates.find(t => t.name === templateName)!
  const dest = `${cwd()}/${projectName}`

  const s = spinner()

  s.start(`Downloading template from ${template.repo}...`)
  try {
    await downloadTemplate(template.repo, dest)
    s.stop(`Template downloaded to ${projectName}/`)

    s.start('Updating project name...')
    await updatePackageJson(dest, projectName)
    s.stop('Project name updated in package.json')

    console.log(`\n  Done! cd ${projectName} && pnpm install\n`)
  } catch (err) {
    s.stop('Download failed')
    console.error(err)
    process.exit(1)
  }
}
