import {TopNav, TopIndex} from './pages';
import {Temp} from './pages/temp';
import {ListItem} from './pages/list-item'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {listActiveTask} from "./store";
import {WrapCreate, WrapUpdate} from "./pages/item";


function App() {
    return (
        <BrowserRouter>
            <TopNav/>
            <Routes>
                <Route path="/">
                    <Route index element={<TopIndex/>}/>
                    <Route path="temperature" element={<Temp/>}/>

                    <Route path="lights/:id" element={<WrapUpdate type="light"/>}/>
                    <Route path="lights/add" element={<WrapCreate type="light"/>}/>
                    <Route path="lights" element={<ListItem title={"Подсветка дома"} type={"light"} listActiveTask={listActiveTask}/>}/>

                    <Route path="waters/:id" element={<WrapUpdate type="water"/>}/>
                    <Route path="waters/add" element={<WrapCreate type="water"/>}/>
                    <Route path="waters" element={<ListItem title={"Авто полив"} type={"water"} listActiveTask={listActiveTask}/>}>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
