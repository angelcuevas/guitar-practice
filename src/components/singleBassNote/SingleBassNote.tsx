import React, {useRef, useEffect, useState} from 'react'
import Player, { DEFAULT_AVAILABLE_NOTES } from '../../classes/Player'
import NoteSelector from './NoteSelector';

const SingleBassNote = () => {

    const managerRef = useRef(new Player());
    const manager = managerRef.current; 
    const [duration,setDuration] = useState<string>('30');
    const [availableNotes, setAvailableNotes] = useState<string[]>(DEFAULT_AVAILABLE_NOTES)
    const [timer, setTimer] = useState<string>('?')
    const [error, setError] = useState<string>('')

    const addNote = (note:string)=>{
        if(availableNotes.includes(note)){
            let available = availableNotes.filter(a=>a != note)
            setAvailableNotes(available);
            return; 
        }
        setAvailableNotes([...availableNotes,`${note}` ]);
    }

    const handleButtonClick= async ()=>{
        if(managerRef.current.isPlaying){
            managerRef.current.stop();
            return; 
        }
        try {
            await managerRef.current.play(availableNotes, duration, ({timer, currentNote})=>{
                setTimer(timer >= 0? timer : currentNote )
            })
            setError('')
        } catch (error) {
            setError(error && error.message ? error.message: error)
        }

    }

    return (
            <div className="sbn">
                <h1>SingleBassNote</h1>
                <div className="timer"> {timer} </div>
                <div className="config">
                    <input type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                    <button onClick={()=>handleButtonClick()}>{manager.isPlaying ? 'Stop' : 'Start'}</button>
                </div>
                {error && <div className="error"> {error} </div>}
                <NoteSelector 
                    selectedNotes={availableNotes} 
                    onNoteClicked={(n:string)=>addNote(n)}/>
            </div>
    )
}

export default SingleBassNote