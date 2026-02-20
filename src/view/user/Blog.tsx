// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Blog = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     axios.get('/api/blog')
//       .then(res => setBlogs(res.data.blogs))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>Blog</h1>
//       {blogs.length === 0 ? <p>No blogs yet</p> : blogs.map((blog, i) => (
//         <div key={i}>{blog}</div>
//       ))}
//     </div>
//   );
// };

// export default Blog;
import { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/blog')
      .then(res => {
        if(res.data && res.data.blogs) {
          setBlogs(res.data.blogs);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      {blogs && blogs.length === 0 ? <p>No blogs yet</p> : blogs?.map((blog: any, i: number) => (
        <div key={i}>{blog}</div>
      ))}
    </div>
  );
};

export default Blog;