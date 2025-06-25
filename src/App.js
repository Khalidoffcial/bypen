import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Top from './compontants/top.jsx';
import Content from './compontants/content';
import ArticlePage from './compontants/articlePage.jsx';
import AdminArticle from './compontants/adminArticle.jsx';
import Articlereading from './compontants/articlereading.jsx';

function App() {
  return (
    
<BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Content />}/>
      <Route path='/' element={<Top />}/>
      <Route path='/articles' element={<ArticlePage/>}/>
      <Route path='/adminArticle345' element={<AdminArticle/>}/>
      <Route path='/articles/:articleId' Component={Articlereading}/>
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
