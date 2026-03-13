import { getTransformStyle } from './utils.js'
import { drawSmile } from './image.js';
import { drawPath, translateAlong } from './path.js'

export const animationOnId = 'animation-on';
const animationSelectId = 'animations-type';
const hideClassName = 'display_none'


export const toggleAnimationSettings = () => {
  const animationOn = document.getElementById('animation-on');

  const inputs = document.querySelectorAll('input');
  const inputsTo = Array.from(inputs).filter(input => input.id.endsWith('-to'));

  const labels = document.querySelectorAll('label');
  const labelsTo = Array.from(labels).filter(label => label.htmlFor.endsWith('-to'));

  const animationSelect = document.getElementById(animationSelectId);

  const animateButton = document.getElementById('animate-button');

  if (!animationOn.checked) {
    inputsTo.forEach(inputTo => inputTo.classList.add(hideClassName));
    labelsTo.forEach(labelTo => labelTo.classList.add(hideClassName));
    animationSelect.classList.add(hideClassName);
    animateButton.classList.add(hideClassName);
  } else {
    inputsTo.forEach(inputTo => inputTo.classList.remove(hideClassName));
    labelsTo.forEach(labelTo => labelTo.classList.remove(hideClassName));
    animationSelect.classList.remove(hideClassName);
    animateButton.classList.remove(hideClassName)
  }
}

const getAnimationType = (dataForm, defaultAnimationType) => {
  const animationType = dataForm['animations-type'].value;

  switch (animationType) {
    case 'linear':
      return d3.easeLinear;
    case 'elastic':
      return d3.easeElastic;
    case 'bounce':
      return d3.easeBounce;
  }

  return defaultAnimationType ?? d3.easeElastic;
}

export const runAnimation = (dataForm) => {
  const alongTheWay = document.getElementById('along-the-way');

  const svg = d3.select("svg")
  let pict = drawSmile(svg);

  if (alongTheWay.checked) {
    const alongTheWayOptions = document.getElementById('along-the-way-options');
    const alongTheWayValue = alongTheWayOptions.value;
    const pathId = alongTheWayValue === 'way-g' ? 0 : 1

    let path = drawPath(pathId);
    pict.transition()
      .ease(d3.easeLinear) // установить в зависимости от настроек формы
      .duration(6000)
      .attrTween('transform', translateAlong(path.node()));

    return;
  }


  const cx = +dataForm.cx.value;
  const cy = +dataForm.cy.value;
  const translate = { name: 'translate', values: [cx, cy] }

  const scaleX = +dataForm['scale-x'].value;
  const scaleY = +dataForm['scale-y'].value;
  const scale = { name: 'scale', values: [scaleX, scaleY] };

  const angleValue = +dataForm.angle.value;
  const angle = { name: 'rotate', values: [angleValue] };

  const transformStyle = getTransformStyle(translate, scale, angle);

  const cxTo = +dataForm['cx-to'].value;
  const cyTo = +dataForm['cy-to'].value;
  const translateTo = { name: 'translate', values: [cxTo, cyTo] }

  const scaleXTo = +dataForm['scale-x-to'].value;
  const scaleYTo = +dataForm['scale-y-to'].value;
  const scaleTo = { name: 'scale', values: [scaleXTo, scaleYTo] };

  const angleValueTo = +dataForm['angle-to'].value;
  const angleTo = { name: 'rotate', values: [angleValueTo] };

  const transformStyleTo = getTransformStyle(translateTo, scaleTo, angleTo);

  const animationType = getAnimationType(dataForm)
  
  pict.attr("transform", transformStyle)
    .transition()
    .duration(6000)
    .ease(animationType)
    .attr("transform", transformStyleTo);
}

export const toggleAlongTheWay = () => {
  const alongTheWay = document.getElementById('along-the-way');

  const coordinatesInputs = document.getElementById('coordinates-wrapper');
  const alongTheWayOptions = document.getElementById('along-the-way-options');

  if (!alongTheWay.checked) {
    coordinatesInputs.classList.remove('display_none');
    alongTheWayOptions.classList.add('display_none');
  } else {
    coordinatesInputs.classList.add('display_none');
    alongTheWayOptions.classList.remove('display_none');
  }
}

