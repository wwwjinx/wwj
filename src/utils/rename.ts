import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function updatePackageJson(projectPath: string, projectName: string): Promise<void> {
  const pkgPath = join(projectPath, 'package.json')
  if (!existsSync(pkgPath)) return

  const content = await readFile(pkgPath, 'utf-8')
  const pkg = JSON.parse(content) as { name?: string }
  pkg.name = projectName
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
}
