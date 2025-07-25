import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './homepage.jsx';
import ArticleBox from './compontants/articleBox.jsx';
import AdminArticle from './compontants/adminArticle.jsx';
import Articlereading from './compontants/articlereading.jsx';

function App() {
  return (
    
<BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage />}/>
      <Route path='/a/666' element={<AdminArticle/>}/>
      <Route path='/:typeArticle' element={<ArticleBox/>}/>
      <Route path='/Articles/:articleId' Component={Articlereading}/>
    </Routes>

</BrowserRouter>
      // <Top />
      // <Content />
      // <Article />
      // <Goals />
      // <Who />
      // <Contact />

  );
}

export default App;
