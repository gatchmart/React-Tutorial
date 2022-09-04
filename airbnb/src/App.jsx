import Card from "./components/Card"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import data from './assets/data'

function App() {
  const cardData = data.map(exp => {
    return (
      <Card
        key={exp.id}
        item={exp}
      />
    )
  })

  return (
    <div>
      <Navbar />
      <Hero />
      <section className="card-list">
        {cardData}
      </section>
    </div>
  )
}

export default App
