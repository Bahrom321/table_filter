import React from 'react'

const Post = ({posts, loading}) => {
    if (loading) {
        return <h1>Loading...</h1>
    }
  return (
    <div>
        <ul className="list-group mb-4">
            {posts.map((post)=> (
                <li key={post.id} className="list-group-item">
                   <span>{post.id}</span> {post.title}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Post