import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function NoteList({ notes, onSelectNote, onDeleteNote }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet. Create one!</p>
      ) : (
        notes.map(note => (
          <Card key={note.id} className="cursor-pointer hover:bg-gray-100">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {note.title}
                <Badge>{note.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{note.content.substring(0, 100)}...</p>
              <div className="mt-2 space-x-2">
                <Button variant="outline" onClick={() => onSelectNote(note)}>Edit</Button>
                <Button variant="destructive" onClick={() => onDeleteNote(note.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
