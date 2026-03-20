import { getTransformStyle } from './utils.js'
import { drawSmile } from './image.js';
import { drawPath, translateAlong } from './path.js'

export const animationOnId = 'animation-on';
const animationSelectId = 'animations-type';
const hideClassName = 'display_none'


export const toggleAnimationSettings = () => {
  const animationOn = d3.select('#animation-on').property('checked');

  const inputs = d3.selectAll('input')
    .filter(function () {
      return d3.select(this).attr('id') && d3.select(this).attr('id').endsWith('-to');
    });

  const labels = d3.selectAll('label')
    .filter(function () {
      const forAttr = d3.select(this).attr('for');
      return forAttr && forAttr.endsWith('-to');
    });

  const animationSelect = d3.select('#' + animationSelectId);
  const animateButton = d3.select('#animate-button');

  if (!animationOn) {
    inputs.classed(hideClassName, true);
    labels.classed(hideClassName, true);
    animationSelect.classed(hideClassName, true);
    animateButton.classed(hideClassName, true);
  } else {
    inputs.classed(hideClassName, false);
    labels.classed(hideClassName, false);
    animationSelect.classed(hideClassName, false);
    animateButton.classed(hideClassName, false);
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
  const alongTheWay = d3.select('#along-the-way').property('checked');

  const svg = d3.select("svg");
  let pict = drawSmile(svg);

  if (alongTheWay) {
    const alongTheWayValue = d3.select('#along-the-way-options').property('value');
    const pathId = alongTheWayValue === 'way-g' ? 0 : 1;

    let path = drawPath(pathId);
    pict.transition()
      .ease(d3.easeLinear)
      .duration(6000)
      .attrTween('transform', translateAlong(path.node()));

    return;
  }

  const cx = +d3.select('#cx').property('value');
  const cy = +d3.select('#cy').property('value');
  const translate = { name: 'translate', values: [cx, cy] }

  const scaleX = +d3.select('#scale-x').property('value');
  const scaleY = +d3.select('#scale-y').property('value');
  const scale = { name: 'scale', values: [scaleX, scaleY] };

  const angleValue = +d3.select('#angle').property('value');
  const angle = { name: 'rotate', values: [angleValue] };

  const transformStyle = getTransformStyle(translate, scale, angle);

  const cxTo = +d3.select('#cx-to').property('value');
  const cyTo = +d3.select('#cy-to').property('value');
  const translateTo = { name: 'translate', values: [cxTo, cyTo] }

  const scaleXTo = +d3.select('#scale-x-to').property('value');
  const scaleYTo = +d3.select('#scale-y-to').property('value');
  const scaleTo = { name: 'scale', values: [scaleXTo, scaleYTo] };

  const angleValueTo = +d3.select('#angle-to').property('value');
  const angleTo = { name: 'rotate', values: [angleValueTo] };

  const transformStyleTo = getTransformStyle(translateTo, scaleTo, angleTo);

  const animationType = getAnimationType(dataForm);

  pict.attr("transform", transformStyle)
    .transition()
    .duration(6000)
    .ease(animationType)
    .attr("transform", transformStyleTo);
}

export const toggleAlongTheWay = () => {
  const alongTheWay = d3.select('#along-the-way').property('checked');

  const coordinatesInputs = d3.select('#coordinates-wrapper');
  const alongTheWayOptions = d3.select('#along-the-way-options');

  const scaleWrapper = d3.select('#scale-wrapper');
  const angleWrapper = d3.select('#angle-wrapper');

  if (!alongTheWay) {
    coordinatesInputs.classed('display_none', false);
    scaleWrapper.classed('display_none', false);
    angleWrapper.classed('display_none', false);

    alongTheWayOptions.classed('display_none', true);
  } else {
    coordinatesInputs.classed('display_none', true);
    scaleWrapper.classed('display_none', true);
    angleWrapper.classed('display_none', true);

    alongTheWayOptions.classed('display_none', false);
  }
}

