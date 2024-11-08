import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
      if (error) console.error('Error fetching posts:', error.message)
      else setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Blog a Novinky</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
