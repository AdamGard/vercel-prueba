import { FilterProvider } from './context/FilterContext';
import Navbar from './components/Navbar/Navbar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import './App.css';

function App() {
  return (
    <FilterProvider>
      {/* <div className="App"> */}
        <Navbar />
        <TaskBoard />
      {/* </div> */}
    </FilterProvider>
  );
}

export default App;
