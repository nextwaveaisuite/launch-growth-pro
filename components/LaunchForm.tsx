'use client'

import { useState } from 'react'
import supabase from '../lib/supabase'

export default function LaunchForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const user = await supabase.auth.getUser()
    const user_id = user.data?.user?.id

    if (!user_id) return alert("You're not logged in")

    const { error } = await supabase.from('launch_projects').insert([
      { title, user_id, status: 'draft' },
    ])

    if (error) alert('Error creating project: ' + error.message)
    else {
      setTitle('')
      onCreated()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  )
}

