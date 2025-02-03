import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const dirPath = path.join(process.cwd(), 'public', 'images', 'products', slug)
  
  try {
    const files = fs.readdirSync(dirPath)
    return files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )
  } catch (error) {
    return []
  }
}) 