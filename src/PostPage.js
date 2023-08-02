import React, { useContext } from 'react'
import { useParams,Link } from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = ({}) => {
  const {posts,handledelete}=useContext(DataContext);
  const {id} =useParams();
  const post =posts.find(post => (post.id).toString()=== id );

  return (
    <main className='PostPage'>
      <article className='post'>
          {post &&
            <>
                <h2>{post.title}</h2>
                <p className='postDate'>{post.datetime}</p>
                <p className='postBody'>{post.body}</p>
                <Link to={`/edit/${post.id}`}><button className='editbutton'>Edit post</button></Link>
                <button className='deletebutton' onClick={()=>handledelete(post.id)}> Delete post</button>
            </>
          }
          {!post &&
            <>
                <h2>Post Not Found</h2>
                <p> Well that's disappointing</p>
                <p>
                  <Link to='/'>Visit our Home Page</Link>
                </p>
            </>
          }
      </article>
      
    </main>
  )
}

export default PostPage