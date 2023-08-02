
import './App.css';
import Header from './Header.js';
import Nav from './Nav.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import About from './About.js';
import Missing from './Missing.js';
import Footer from './Footer.js';
import Post from './Post.js';
import { Routes,Route, useNavigate } from 'react-router-dom';
import PostLayout from './PostLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import { format } from "date-fns";
function App() {
  const [posts,setPosts]=useState([
      {
        id:1,
        title:'My first post',
        datetime:"July 01, 2021 11:17:36 AM",
        body:"First ever Crochet dress"
      },
      {
        id:2,
        title:'My second post',
        datetime:"July 03, 2021 11:17:36 AM",
        body:"First ever Embroidery dress"
      },
      {
        id:3,
        title:'My third post',
        datetime:"July 05, 2021 11:17:36 AM",
        body:"First ever React app"
      }
  ])
  const [search, setsearch]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit=(e) =>{
    e.preventDefault();
    const id= posts.length? posts[posts.length-1].id+1 :1 ;
    const datetime =format(new Date(),'MMMM dd,yyyy pp');
    const newPost={id, title:postTitle,datetime,body:postBody};
    const allPosts=[...posts,newPost];
    setPosts(allPosts);
    setPostBody('');
    setPostTitle('');
    navigate('/');
  }

  const handledelete =(id) =>{
      const postsList =posts.filter( post => post.id !==id);
      setPosts(postsList);
      navigate('/');
  }
  return (
    <div className="App">
      
     <Header title="Beautify" />
     <Nav search={search} setsearch={setsearch} />
     <Routes>
        <Route path='/' element={<Home posts={searchResults} />}/>
        <Route path='post'>
          <Route index element={<NewPost 
              handleSubmit={handleSubmit}
              postBody={postBody}
              setPostBody={setPostBody}
              postTitle={postTitle}
              setPostTitle={setPostTitle} />}/>
          <Route path=':id' element={<PostPage posts={posts} handledelete={handledelete}></PostPage>}></Route>
         </Route>
        {/* <PostPage /> */}
        <Route path='about' element={<About />}/>
        <Route path='*' element={<Missing />}/>
     </Routes>
     <Footer />
    </div>
  );
}

export default App;
