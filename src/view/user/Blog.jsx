import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'

import Sidebar from './blogcomponents/Sidebar'
import BlogContent from './blogcomponents/Content'

import blogs from './data/blogData.json'
import { useSelector } from 'react-redux'
import Footer from '../../layout/Footer'
import NavigationBar from './components/NavigationBar'

const BlogLayout = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const { user } = useSelector(s => s.auth)
  useEffect(() => {
    const found = blogs.find(b => b.slug === slug)
    setBlog(found)
  }, [slug])

  if (!blog) return <div className='p-10'>Loading...</div>

  return (
    <section className=''>
      <Helmet>
        <title>{blog.title}</title>
        <meta name='description' content={blog.description} />
        <meta name='keywords' content={blog.keywords.join(', ')} />
        <meta name='author' content='Vaibhav Chauhan' />
        <link
          rel='canonical'
          href={`https://binarykeeda.com.com/blog/${slug}`}
        />
      </Helmet>
      {/* <NavigationBar /> */}
      <section className='mx-auto px-4  md:px-6 lg:px-8 mt-8 pb-0'>
        <p className='uppercase text-xs tracking-wide text-orange-500 font-semibold mb-2'>
          {blog.category || 'Roadmap'} · {blog.readTime || '15 minute read'}
        </p>
        <h1 className='text-xl md:text-3xl font-extrabold leading-tight text-gray-800 mb-3'>
          {blog.title}
        </h1>
      </section>
      <div className=' mx-auto  grid grid-cols-1 lg:grid-cols-4 gap-10 mt-2'>
        <Sidebar sections={blog.sections} />
        <div className='lg:col-span-3'>
          <BlogContent sections={blog.sections} />
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  )
}

export default BlogLayout
