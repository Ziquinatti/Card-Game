import { DragDropContext } from "react-beautiful-dnd";
import Deck from "./components/Deck";
import Hand from "./components/Hand";
import Slots from "./components/Slots";
import { useSelector, useDispatch } from "react-redux";
import { setCard } from "./features/slots/slotsSlice";
import { removeCard } from "./features/hand/handSlice";

function App() {
  const hand = useSelector((state) => state.hand.cards)
  const dispatch = useDispatch()

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return

    let indexSlot = Number(destination.droppableId.replace('slt-', ''))
    let card = hand[source.index]
    
    dispatch(setCard(indexSlot, card))
    dispatch(removeCard(source.index))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app-board">
        <Slots classStyle="enemy"/>
        <Slots classStyle="my"/>
      </div>
      <Hand />
      <Deck />
    </DragDropContext>
  );
}

export default App;
