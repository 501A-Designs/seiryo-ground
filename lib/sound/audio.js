import Snd from 'snd-lib';
const snd = new Snd();
snd.load(Snd.KITS.SND01);

const buttonSound = () => snd.play(Snd.SOUNDS.BUTTON)
const sliderSound = () => snd.play(Snd.SOUNDS.TOGGLE_ON)
const tapSound = () => snd.play(Snd.SOUNDS.TAP)
const selectSound = () => snd.play(Snd.SOUNDS.SELECT)
const typeSound = () => snd.play(Snd.SOUNDS.TYPE)
const notificationSound = () => snd.play(Snd.SOUNDS.NOTIFICATION)
const celebrationSound = () => snd.play(Snd.SOUNDS.CELEBRATION)
// const celebrationSound = () => snd.play(Snd.SOUNDS.CELEBRATION)


export {buttonSound, sliderSound, tapSound, selectSound, typeSound,notificationSound,celebrationSound};