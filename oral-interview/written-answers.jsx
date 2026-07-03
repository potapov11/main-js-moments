import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // То есть при создании хука useDebaunce я делаю так - в хук передаю значение которое хочу дебаунсить,
  // и delay. Описание хука - принимает значение и delay, val, и setVal, в useEffect ставит timerId = в нее 
  // записываем функцию setTimeOut, в функции setim значение в val
  // при cleanUp функции  ощищаем timer, всегда возвращаем значение val, useEffect реагирует на delay и val

  return (
    <div className="App">
      <div>
        <label htmlFor="search-input">Search Unsplash images</label>
        <input type="search" id="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
