import {TopNav, TopIndex} from './pages';
import {Light} from './pages/light';
import {ListWater} from './pages/list-water'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {storeLight} from './store/light';
import {models, modelById} from "./store";
import {Water} from "./pages/water";
import {Device} from './store/device';


const PPP = () => <div>PPP</div>


function App() {
    return (
        <BrowserRouter>
            <TopNav/>
            <Routes>
                <Route path="/">
                    <Route index element={<TopIndex light={storeLight}/>}/>
                    <Route path="light" element={<Light model={storeLight}/>}/>
                    <Route path="waters/:id" element={<Water model={modelById('water-K1') || new Device('', '', '', '')}/>}/>
                    {/*<Route path="waters/:id" element={<Water model={modelById('water-K1') || new Device('', '', '', '')}/>}/>*/}
                    <Route path="waters" element={<ListWater items={models}/>}>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
