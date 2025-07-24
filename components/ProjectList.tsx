'use client'

import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProjects() {
    setLoading(true)
    const user = await supabase.auth.getUser()
    const user_id = user.data?.user?.id

    if (!user_id) return alert("You're not logged in")

    const { data, error } = await supabase
      .from('launch_projects')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setProjects(data || [])

    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <div>
      <h2>Your Launch Projects</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <strong>{project.title}</strong> — {project.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
  }
                       
