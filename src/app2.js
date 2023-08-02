
import './App.css';
import Header from './Header.js';
import Nav from './Nav.js';
import Home from './Home.js';
import PostPage from './PostPage.js';
import NewPost from './NewPost.js';
import About from './About.js';
import Missing from './Missing.js';
import Footer from './Footer.js';
import { Routes,Route, useNavigate } from 'react-router-dom';
import PostLayout from './PostLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import { format } from "date-fns";
import api from './api/posts'
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import DataContext, { DataProvider }  from './context/DataContext';
function App() {
  const [posts,setPosts]=useState([])
  const [search, setsearch]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState('');
  const navigate=useNavigate();
  const {width}=useWindowSize();

  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts');

  useEffect(()=>{
    setPosts(data);
  },[data]); 
 /*  useEffect(()=>{
    const fetchPosts =async () => {
      try{
        const response = await api.get("/posts");
        setPosts(response.data);
      }catch(err) {
          if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error:${err.message}`);
          }

      }
    }
    fetchPosts();
  },[]); */
  useEffect(()=>{ 
    const filteredResults=posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit=async (e) =>{
    e.preventDefault();
    const id= posts.length? posts[posts.length-1].id+1 :1 ;
    const datetime =format(new Date(),'MMMM dd,yyyy pp');
    const newPost={id, title:postTitle,datetime,body:postBody};
    try{
        const response = await api.post('/posts',newPost);
        const allPosts=[...posts,response.data];
        setPosts(allPosts);
        setPostBody('');
        setPostTitle('');
        navigate('/');
      }catch(err) {
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error:${err.message}`);
        }
      }
  }

  const handleEdit = async (id) => {
    const datetime =format(new Date(),'MMMM dd,yyyy pp');
    const editPost={id, title:editTitle,datetime,body:editBody};
    try{
      const response =await api.put(`/posts/${id}`,editPost);
      const postsList =posts.filter( post => post.id !==id);
      setPosts(posts.map(post => post.id === id ? {...response.data}: post));
      setEditBody('');
      setEditTitle('');
      navigate('/');
    }catch(err) {
      console.log(`Error:${err.message}`);
    }
  }

  const handledelete =async (id) =>{
    try{
      await api.delete(`posts/${id}`);
      const postsList =posts.filter( post => post.id !==id);
      setPosts(postsList);
      navigate('/');
    }catch(err) {
      console.log(`Error:${err.message}`);
    }
      
  }
  return (
    <div className="App">
    <DataProvider>
     <Header title="Beautify"  width={width}/>
     <Nav search={search} setsearch={setsearch} />
     <Routes>
        <Route path='/' element={<Home posts={searchResults}  fetchError={fetchError} isLoading={isLoading} />}/>
        <Route path='post'>
          <Route index element={<NewPost 
              handleSubmit={handleSubmit}
              postBody={postBody}
              setPostBody={setPostBody}
              postTitle={postTitle}
              setPostTitle={setPostTitle} />}/>
          <Route path=':id' element={<PostPage posts={posts} handledelete={handledelete}></PostPage>}></Route>
          
          </Route>
          <Route path='/edit/:id' element={<EditPost posts={posts}
              handleEdit={handleEdit}
              editBody={editBody}
              setEditBody={setEditBody}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
          />}/>
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
