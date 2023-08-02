
import './App.css';
import Header from './Header.js';
import Nav from './Nav.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import About from './About.js';
import Missing from './Missing.js';
import Footer from './Footer.js';
import { Routes,Route } from 'react-router-dom';
import PostLayout from './PostLayout';
import EditPost from './EditPost';
import DataContext, { DataProvider }  from './context/DataContext';
function App() {
 
  return (
    <div className="App">
    <DataProvider>
     <Header title="Beautify"/>
     <Nav />
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='post'>
          <Route index element={<NewPost  />}/>
          <Route path=':id' element={<PostPage ></PostPage>}></Route>
          </Route>
          <Route path='/edit/:id' element={<EditPost />}/>
        {/* <PostPage /> */}
        <Route path='about' element={<About />}/>
        <Route path='*' element={<Missing />}/>
     </Routes>
     <Footer />
     </DataProvider>
    </div>
  );
}

export default App;
