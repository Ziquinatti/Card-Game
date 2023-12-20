import Deck from "./components/Deck";
import Hand from "./components/Hand";
import Slots from "./components/Slots";

function App() {
  return (
    <>
      <div className="app-board">
        {/* <Slots classStyle="enemy"/> */}
        <Slots classStyle="my"/>
      </div>
      <Hand />
      <Deck />
    </>
  );
}

export default App;
