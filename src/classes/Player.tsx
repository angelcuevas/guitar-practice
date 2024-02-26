import * as Tone from 'tone'
export const DEFAULT_AVAILABLE_NOTES = ['A','B','C','D','E','F','G']
const STEP_DURATION = 1000; 
const TIME_TO_SHOW_RESULT = 10*1000;
const OCTAVES = ['2', '3'];

class Player {
    public static isPlaying = false; 
    static timeOutref :any = undefined;
    static timer : any = null; 
    static synth = new Tone.Synth().toDestination();
    static currentNote = '';
    public static tickCallbackRef : any; 
    duration: any; 


    async play(avaibleNotes:string[], duration:number | string, tickCallback:any){
        if(!avaibleNotes || avaibleNotes.length === 0) throw new Error('There are no notes selected.')
        Player.isPlaying =true; 
        this.duration = duration; 
        Player.timer = duration; 
        Player.tickCallbackRef = tickCallback;

        this.playRandomNote(avaibleNotes, parseInt(''+duration)*STEP_DURATION)
        tickCallback({timer:Player.timer});
        Player.timeOutref = setInterval(()=>{
            if(Player.timer){
                Player.timer-= 1;
            }
            
            if(Player.timer == ((TIME_TO_SHOW_RESULT/1000) * -1)-1){
                Player.timer = this.duration;
                this.playRandomNote(avaibleNotes, ''+parseInt(''+duration)*STEP_DURATION)
            }
            tickCallback({timer:Player.timer, currentNote: Player.currentNote})
        }, STEP_DURATION)
    }

    async stop(){
        Player.isPlaying =false; 
        Player.synth.triggerRelease()
        clearInterval(Player.timeOutref)
        Player.tickCallbackRef({currentNote:'?'})
    }


    async playRandomNote(avaibleNotes = DEFAULT_AVAILABLE_NOTES, time:string | number = 5000){
        const randomIndex = this.getRandonNumberBetween(avaibleNotes.length) 
        const randomOctaveIndex = this.getRandonNumberBetween(OCTAVES.length); 
        const randomNote = avaibleNotes[randomIndex] + OCTAVES[randomOctaveIndex];
        Player.currentNote = randomNote;
        
        const synth = Player.synth; 
        const now = Tone.now()
        synth.triggerAttack(randomNote, now)

        setTimeout(()=>{
            synth.triggerRelease()
        }, parseInt(''+time)+TIME_TO_SHOW_RESULT)
    }

    getRandonNumberBetween(number:any){
        return Math.floor(Math.random()*number);;
    }


}

export default Player; 