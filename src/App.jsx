import './App.css'
import NavBar        from './components/NavBar'
import CustomCursor  from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Hero          from './sections/Hero'
import About         from './sections/About'
import Experience    from './sections/Experience'
import Projects      from './sections/Projects'
import Music         from './sections/Music'
import Contact       from './sections/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Music />
        <Contact />
      </main>
    </>
  )
}
