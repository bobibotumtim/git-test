import AboutMe from "./components/AboutMe";
import HelloWorld from "./components/HelloWorld";
import Counter from "./components/Counter";
import SimpleCard from "./components/SimpleCard";
import FptWebsite from "./components/FptWebsite";
const cardItem = {
  title: "A Title",
  description: "The description goes here.",
  imageUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='130'%3E%3Crect width='100%25' height='100%25' fill='%23fff3bf'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' font-size='34' fill='%23d69e00'%3EIMG%3C/text%3E%3C/svg%3E",
};
function App() {
  return (
    <main className="app">
      <h1>Exercise 9: React Components</h1>
      <div className="component-grid">
        <AboutMe />
        <HelloWorld />
        <Counter />
        <section className="exercise-box">
          <h2>Simple Card</h2>
          <SimpleCard item={cardItem} />
        </section>
      </div>
      <FptWebsite />
    </main>
  );
}
export default App;
