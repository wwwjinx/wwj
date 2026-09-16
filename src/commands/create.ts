import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { text, select, isCancel, cancel, spinner } from '@clack/prompts'
import { getTemplate, templates } from '../templates.js'
import { downloadTemplate } from '../utils/download.js'
import { updatePackageJson } from '../utils/rename.js'

function destPath(name: string): string {
  return join(cwd(), name)
}

function validateProjectName(value: string | undefined): string | undefined {
  if (!value?.trim()) return 'Please enter a project name'
  if (value.includes('/') || value.includes('\\') || value === '.' || value === '..') {
    return 'Project name must be a single directory name'
  }
  if (existsSync(destPath(value))) return `Directory "${value}" already exists`
}

export async function createCommand(projectName?: string) {
  if (!projectName) {
    const result = await text({
      message: 'Project name:',
      placeholder: 'my-app',
      validate(value) {
        return validateProjectName(value)
      },
    })
    if (isCancel(result)) {
      cancel('Cancelled')
      return
    }
    projectName = result
  } else {
    const error = validateProjectName(projectName)
    if (error) {
      console.error(error)
      process.exit(1)
    }
  }

  const templateName = await select({
    message: 'Select template:',
    options: templates.map(t => ({ value: t.name, label: t.display })),
  })
  if (isCancel(templateName)) {
    cancel('Cancelled')
    return
  }

  const template = getTemplate(templateName)
  if (!template) {
    console.error(`Unknown template: ${templateName}`)
    process.exit(1)
  }

  const dest = destPath(projectName)
  const s = spinner()
  let phase: 'download' | 'rename' = 'download'

  s.start(`Downloading template from ${template.repo}...`)
  try {
    await downloadTemplate(template.repo, dest)
    s.stop(`Template downloaded to ${projectName}/`)

    phase = 'rename'
    s.start('Updating project name...')
    await updatePackageJson(dest, projectName)
    s.stop('Project name updated in package.json')

    console.log(`\n  Done! cd ${projectName} && pnpm install\n`)
  } catch (err) {
    s.error(phase === 'download' ? 'Download failed' : 'Failed to update package.json')
    console.error(err)
    process.exit(1)
  }
}
