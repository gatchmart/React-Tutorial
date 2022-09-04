import Header from "./components/Header"
import Location from "./components/Location"
import data from "./assets/data"

function App() {
  var locations = data.map(item => {
    return (
      <div>
        <Location {...item} />
        <hr className="location--hr" />
      </div>
    )
  })

  return (
    <div className="App">
      <Header />
      <section className="section--list">
        {locations}
      </section>
    </div>
  )
}

export default App
