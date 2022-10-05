import Snd from 'snd-lib';
const snd = new Snd();
snd.load(Snd.KITS.SND01);

const buttonSound = () => snd.play(Snd.SOUNDS.BUTTON)
const sliderSound = () => snd.play(Snd.SOUNDS.TOGGLE_ON)
const tapSound = () => snd.play(Snd.SOUNDS.TAP)
const transitionUpSound = () => snd.play(Snd.SOUNDS.TRANSITION_UP)
const transitionDownSound = () => snd.play(Snd.SOUNDS.TRANSITION_DOWN)
const selectSound = () => snd.play(Snd.SOUNDS.SELECT)
const swipeSound = () => snd.play(Snd.SOUNDS.SWIPE)
const typeSound = () => snd.play(Snd.SOUNDS.TYPE)
const notificationSound = () => snd.play(Snd.SOUNDS.NOTIFICATION)
const celebrationSound = () => snd.play(Snd.SOUNDS.CELEBRATION)
// const celebrationSound = () => snd.play(Snd.SOUNDS.CELEBRATION)


export {buttonSound, sliderSound, tapSound,transitionUpSound,transitionDownSound, selectSound, swipeSound, typeSound,notificationSound,celebrationSound};