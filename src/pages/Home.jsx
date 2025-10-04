import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Showcase from '../components/Home/ShowCase'
import Accordion from '../components/Home/FAQ'

const Home = () => {

  return (
    <>
      {/* <HomeHelmet /> */}
      <section className='bg-'>
        <Hero />
        <About />
        <Showcase />
        <Accordion />
      </section>


    </>
  )
}

export default Layout(Home)
