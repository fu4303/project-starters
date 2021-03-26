function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const drum = document.querySelector(`.drums[data-key="${e.keyCode}"]`);
  if (!audio) return;

  drum.classList.add('playing');
  audio.currentTime = 0; //rewind to start
  audio.play(); //play audio
}

const drums = Array.from(document.querySelectorAll('.drums'));
drums.forEach(drum => drum.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);