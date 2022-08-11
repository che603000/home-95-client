import {TopNav, TopIndex} from './pages';
import {Temp} from './pages/temp';
import {Light} from './pages/light';
import {ListWater} from './pages/list-water'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {storeLight} from './store/light';
import {listActiveTask} from "./store";
import {WrapCreate, WrapUpdate} from "./pages/water";


function App() {
    return (
        <BrowserRouter>
            <TopNav/>
            <Routes>
                <Route path="/">
                    <Route index element={<TopIndex light={storeLight}/>}/>
                    <Route path="home" element={<Temp/>}/>
                    <Route path="light" element={<Light model={storeLight}/>}/>
                    <Route path="waters/:id" element={<WrapUpdate type={"water"}/>}/>
                    <Route path="waters/add" element={<WrapCreate type="water"/>}/>
                    <Route path="waters" element={<ListWater title={"Авто полив"} type={"water"} listActiveTask={listActiveTask}/>}>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
