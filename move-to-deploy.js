import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const buildDir = path.resolve(__dirname, 'dist')
const deployDir = path.resolve(__dirname, 'deploy')

// Function to copy files recursively
const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src)
    const stats = exists && fs.statSync(src)
    const isDirectory = exists && stats.isDirectory()
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            )
        })
    } else {
        fs.copyFileSync(src, dest)
    }
}

// Clear the deploy directory while preserving certain folders and files
fs.readdirSync(deployDir).forEach((file) => {
    if (file !== '.git' && file !== '.github') {
        fs.rmSync(path.join(deployDir, file), { recursive: true, force: true })
    }
})

// Function to preserve certain folders and files
const preserveFilesAndFolders = ['.github']

// Copy the build output to the deploy directory
copyRecursiveSync(buildDir, deployDir)

// Preserve the specified folders and files
preserveFilesAndFolders.forEach((item) => {
    const srcPath = path.join(__dirname, item)
    const destPath = path.join(deployDir, item)
    if (fs.existsSync(srcPath)) {
        if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true })
        }
        fs.renameSync(srcPath, destPath)
    }
})

console.log('Build moved to deploy directory successfully.')
