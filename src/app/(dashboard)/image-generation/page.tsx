import Configurations from '@/components/image-generation/Configurations'
import GeneratedImages from '@/components/image-generation/GeneratedImages'
import React from 'react'

const ImageGenerationPage = () => {
  return (
    <section className="container mx-auto md:grid md:grid-cols-3 md:gap-4 overflow-hidden">
      <Configurations />
      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center h-fit">
        <GeneratedImages />
      </div>
    </section>
  )
}

export default ImageGenerationPage