import './App.css';
import MainPage from "./pages/MainPage"
import MyPage from "./pages/MyPage"
import UserUpdate from './pages/UserUpdate';
import SearchResult from "./pages/SearchResult"
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>

        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/mypage" element={<MyPage/>}/>
        <Route exact path="/search" element={<SearchResult/>}/>
        {/* UserUpdate 페이지 경로 update로 했음 */}
        <Route exact path="/update" element={<UserUpdate/>}/>
        

      </Routes>
    </div>
  );
}

export default App;
