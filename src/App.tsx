import {TopNav, TopIndex} from './pages';
import {Light} from './pages/light';
import {ListWater} from './pages/list-water'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {storeLight} from './store/light';
import {listActiveTask} from "./store";
import {Task} from './store/task';
import {Water, WrapCreate, WrapUpdate} from "./pages/water";
// import {Device} from './store/device';


const PPP = () => <div>PPP</div>


function App() {
    return (
        <BrowserRouter>
            <TopNav/>
            <Routes>
                <Route path="/">
                    <Route index element={<TopIndex light={storeLight}/>}/>
                    <Route path="light" element={<Light model={storeLight}/>}/>
                    <Route path="waters/:id" element={<WrapUpdate type={"water"}/>}/>
                    <Route path="waters/add" element={<WrapCreate type="water"/>}/>
                    <Route path="waters" element={<ListWater type={"water"} listActiveTask={listActiveTask}/>}>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
