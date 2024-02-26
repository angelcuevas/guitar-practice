import React, {useRef, useEffect, useState} from 'react'
import Player, { DEFAULT_AVAILABLE_NOTES } from '../../classes/Player'
import NoteSelector from './NoteSelector';

const SingleBassNote = () => {

    const manager = useRef(new Player());
    const [duration,setDuration] = useState<string>('30');
    const [availableNotes, setAvailableNotes] = useState<string[]>(DEFAULT_AVAILABLE_NOTES)
    const [timer, setTimer] = useState<string>('0')

    const addNote = (note:string)=>{
        if(availableNotes.includes(note)){
            let available = availableNotes.filter(a=>!a.includes(note))
            setAvailableNotes(available);
            return; 
        }
        setAvailableNotes([...availableNotes,`${note}` ]);
    }

    const handleButtonClick= ()=>{
        if(manager.current.isPlaying){
            manager.current.stop();
            return; 

        }
        manager.current.play(availableNotes, duration, ({timer, currentNote})=>{
            setTimer(timer >= 0? timer : currentNote )
        })
    }

    return (
            <div className="sbn">
                <h1>SingleBassNote</h1>
                <div className="timer"> {timer} </div>
                <div className="config">
                    <input type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                    <button onClick={()=>handleButtonClick()}>Start</button>
                </div>
                <NoteSelector 
                    selectedNotes={availableNotes} 
                    onNoteClicked={(n:string)=>addNote(n)}/>
            </div>
    )
}

export default SingleBassNote