import { useState, useEffect, useMemo } from 'react'
import NoteList from '../components/NoteList'
import NoteForm from '../components/NoteForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {getNotes,updateNotes,deleteNotes,saveNotes} from "../services/noteService.js"


export default function HomePage() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [filter, setFilter] = useState('all')
  const [activeFilter, setActiveFilter] = useState('active')
  const [sortBy, setSortBy] = useState('date')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      const fetchedNotes = await getNotes()
      setNotes(fetchedNotes)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch notes:', error)
      setError('Failed to fetch notes. Please try again later.')
      setNotes([]) // Ensure notes is always an array
    } finally {
      setIsLoading(false)
    }
  }

  const addNote = async (note) => {
    try {
      setIsLoading(true)
      const newNote = await saveNotes(note)
      fetchNotes();
      setError(null)
    } catch (error) {
      console.error('Failed to add note:', error)
      setError('Failed to add note. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateExistingNote = async (updatedNote) => {
    try {
      setIsLoading(true)
      const updated = await updateNotes(updatedNote,updatedNote.id)
      console.log(updated)
      setNotes(prevNotes => prevNotes.map(note => note.id === updated.id ? updated : note))
      setSelectedNote(null)
      setError(null)
    } catch (error) {
      console.error('Failed to update note:', error)
      setError('Failed to update note. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteExistingNote = async (id) => {
    try {
      setIsLoading(true)
      await deleteNotes(id)
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
      setSelectedNote(null)
      setError(null)
    } catch (error) {
      console.error('Failed to delete note:', error)
      setError('Failed to delete note. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAndSortedNotes = useMemo(() => {
    return (notes || [])
      .filter(note => {
        // Check category filter
        const categoryMatch = filter === 'all' || note.category === filter;
        
        // Check active filter
        const activeMatch = activeFilter === 'all' || 
          (activeFilter === 'active' 
            ? note.active !== false  // Show when active is true or undefined
            : note.active === false || note.active === null
          );
        
        // Check search term
        const searchMatch = 
          note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return categoryMatch && activeMatch && searchMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'date') return b.id - a.id
        if (sortBy === 'title') return a.title.localeCompare(b.title)
        if (sortBy === 'category') return a.category.localeCompare(b.category)
        return 0
      })
  }, [notes, filter, activeFilter, sortBy, searchTerm])

  const categories = ['Work', 'Personal', 'Ideas', 'Shopping']
  const handleNewNote = () => {
    setSelectedNote(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Note Taking App</h1>
        <Button onClick={handleNewNote}>New Note</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-2 mb-4">
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Select onValueChange={setFilter} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setSortBy} defaultValue="date">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setActiveFilter} defaultValue="active">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active Notes</SelectItem>
                  <SelectItem value="inactive">Inactive Notes</SelectItem>
                  <SelectItem value="all">All Notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isLoading ? (
            <p>Loading notes...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <NoteList 
              notes={filteredAndSortedNotes} 
              onSelectNote={setSelectedNote} 
              onDeleteNote={deleteExistingNote}
            />
          )}
        </div>
        <NoteForm 
          onSubmit={selectedNote ? updateExistingNote : addNote} 
          initialNote={selectedNote}
          categories={categories}
        />
      </div>
    </div>
    </div>

  )
}