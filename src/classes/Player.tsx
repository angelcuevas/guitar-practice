import * as Tone from 'tone'
export const DEFAULT_AVAILABLE_NOTES = ['A','B','C','D','E','F','G']
const STEP_DURATION = 1000; 
const TIME_TO_SHOW_RESULT = 10*1000;
const OCTAVES = ['2', '3'];

class Player {
    public static isPlaying = false; 
    static timeOutref = null;
    static timer = null; 
    static synth = new Tone.Synth().toDestination();
    static currentNote = '';
    public static tickCallbackRef; 

 
    async play(avaibleNotes:string[], duration:number, tickCallback){
        if(!avaibleNotes || avaibleNotes.length === 0) throw new Error('There are no notes selected.')
        this.isPlaying =true; 
        this.duration = duration; 
        this.timer = duration; 
        Player.tickCallbackRef = tickCallback;

        this.playRandomNote(avaibleNotes, duration*STEP_DURATION)
        tickCallback({timer:this.timer});
        this.timeOutref = setInterval(()=>{
            this.timer-= 1;
            
            if(this.timer == ((TIME_TO_SHOW_RESULT/1000) * -1)-1){
                this.timer = this.duration;
                this.playRandomNote(avaibleNotes, duration*STEP_DURATION)
            }
            tickCallback({timer:this.timer, currentNote: Player.currentNote})
        }, STEP_DURATION)
    }

    async stop(){
        this.isPlaying =false; 
        Player.synth.triggerRelease()
        clearInterval(this.timeOutref)
        Player.tickCallbackRef({currentNote:'?'})
    }


    async playRandomNote(avaibleNotes = DEFAULT_AVAILABLE_NOTES, time:number = 5000){
        const randomIndex = this.getRandonNumberBetween(avaibleNotes.length) 
        const randomOctaveIndex = this.getRandonNumberBetween(OCTAVES.length); 
        const randomNote = avaibleNotes[randomIndex] + OCTAVES[randomOctaveIndex];
        Player.currentNote = randomNote;
        
        const synth = Player.synth; 
        const now = Tone.now()
        synth.triggerAttack(randomNote, now)

        setTimeout(()=>{
            synth.triggerRelease()
        }, time+TIME_TO_SHOW_RESULT)
    }

    getRandonNumberBetween(number){
        return Math.floor(Math.random()*number);;
    }


}

export default Player; 