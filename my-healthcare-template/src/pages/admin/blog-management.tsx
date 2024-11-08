import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function BlogManagement() {
  useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('blog_posts')
      .insert([{ title, content }])
    if (error) console.error('Error adding post:', error.message)
    else {
      setTitle('')
      setContent('')
      fetchPosts()
    }
  }

  const handleDeletePost = async (id: number) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    if (error) console.error('Error deleting post:', error.message)
    else fetchPosts()
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Správa blogových příspěvků</h1>
      <form onSubmit={handleAddPost} className="mb-8">
        <input
          type="text"
          placeholder="Název"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <textarea
          placeholder="Obsah"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Přidat příspěvek</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post.id)} className="mt-2 bg-red-500 text-white p-2">Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
