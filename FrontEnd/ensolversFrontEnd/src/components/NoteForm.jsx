import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NoteForm({ onSubmit, initialNote, categories }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [active, setActive] = useState(true)
  const [date, setDate] = useState('')
  const today = new Date();


  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };


  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title)
      setContent(initialNote.content)
      setCategory(initialNote.category)
      setActive(initialNote.active)
      setDate(initialNote.date)
    } else {
      setTitle('')
      setContent('')
      setCategory('')
      setActive(true)
      setDate(formatDate(today))
    }
  }, [initialNote, categories])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      id: initialNote?.id || 0,
      title,
      content,
      category,
      active,
      date
    })
    setTitle('')
    setContent('')
    setCategory('')
    setActive(true)
  }

  return (
    <Card className="w-full md:w-1/2">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialNote ? 'Edit Note' : 'Create New Note'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              required
            />
          </div>
          <div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note Content"
              required
            />
          </div>
          <div>
            <Select onValueChange={setCategory} defaultValue={category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{initialNote ? 'Update' : 'Create'}</Button>
          {initialNote?  <Button value={!active} onClick={(e) => setActive(e.target.value)} >{initialNote.active ? 'Archive' : 'Active'}</Button> : <div></div>}
         
        </CardFooter>
      </form>
    </Card>
  )
}

