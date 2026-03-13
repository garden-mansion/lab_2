const animationOnId = 'animation-on';
const animationSelectId = 'animations-type';
const hideClassName = 'display_none'


const toggleAnimationSettings = () => {
  const animationOn = document.getElementById(animationOnId);
  
  const inputs = document.querySelectorAll('input');
  const inputsTo = Array.from(inputs).filter(input => input.id.endsWith('-to'));

  const labels = document.querySelectorAll('label');
  const labelsTo = Array.from(labels).filter(label => label.htmlFor.endsWith('-to'));

  const animationSelect = document.getElementById(animationSelectId);

  console.log(labelsTo)

  if (animationOn.checked) {
    inputsTo.forEach(inputTo => inputTo.classList.add(hideClassName));
    labelsTo.forEach(labelTo => labelTo.classList.add(hideClassName));
    animationSelect.classList.add(hideClassName);
  } else {
    inputsTo.forEach(inputTo => inputTo.classList.remove(hideClassName));
    labelsTo.forEach(labelTo => labelTo.classList.remove(hideClassName));
    animationSelect.classList.remove(hideClassName);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  toggleAnimationSettings();
});

const animationCheckbox = document.getElementById(animationOnId);
animationCheckbox.addEventListener('click', () => {
  toggleAnimationSettings();
})
