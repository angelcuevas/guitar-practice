import React from 'react'

interface IProps {
    selectedNotes: string[]
    onNoteClicked?: (note:string)=>void;
}

const NOTES = ['C','D','E','F','G', 'A','B','C#','D#', 'F#', "G#", "A#"]

const NoteSelector = ({ selectedNotes, onNoteClicked=null }: IProps) => {   

    const handleNoteClick = (n)=>{
        if(onNoteClicked){
            onNoteClicked(n)
        }
    }

    return <div className="notes-selector">
        {
            NOTES.map(n=>{
                let className= "note-btn";
                if(selectedNotes.find(s=>s == n)){
                    className+=` selected`;
                }
                return <div key={`note-${n}`} className={className} onClick={()=>handleNoteClick(n)}>{n}</div>
            })
        }
    </div>
}

export default NoteSelector