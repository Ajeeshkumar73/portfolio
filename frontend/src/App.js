import { BrowserRouter, Routes, Route} from  "react-router-dom"
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import ProjectDetail from "./Pages/ProjectDetail";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/project/:id" element={<ProjectDetail/>}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
