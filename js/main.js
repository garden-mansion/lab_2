import { drawSmile, clear } from './image.js';

const getTransformAttribute = (name, ...values) => {
  return `${name}(${values.join(', ')})`
}

const getTransformStyle = (...transformAttributes) => {
  return transformAttributes.map(attribute => getTransformAttribute(attribute.name, ...attribute.values)).join(', ')
}

const draw = (dataForm) => {
  const svg = d3.select("svg")
  let pict = drawSmile(svg);

  const cx = +dataForm.cx.value;
  const cy = +dataForm.cy.value;
  const translate = { name: 'translate', values: [cx, cy] }

  const scaleX = +dataForm['scale-x'].value;
  const scaleY = +dataForm['scale-y'].value;
  const scale = { name: 'scale', values: [scaleX, scaleY] };

  const angleValue = +dataForm.angle.value;
  const angle = { name: 'rotate', values: [angleValue] };

  const skewXValue = +dataForm['skew-x'].value;
  const skewX = { name: 'skewX', values: [skewXValue] };

  const skewYValue = +dataForm['skew-y'].value;
  const skewY = { name: 'skewY', values: [skewYValue] };

  const transformStyle = getTransformStyle(translate, scale, angle, skewX, skewY);
  console.log(transformStyle);

  pict.attr("transform", transformStyle)

  // pict.attr("transform", `translate(${dataForm.cx.value},
  //                                     ${dataForm.cy.value})`);
}

document.addEventListener("DOMContentLoaded", function () {
  const width = 600;
  const height = 600;
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  let pict = drawSmile(svg);
  pict.attr("transform", "translate(200, 200)");

  let pict1 = drawSmile(svg);
  pict1.attr("transform", `translate(400, 400) scale(1.5, 1.5) rotate(180)`);
});

const dataForm = document.getElementById('setting');
const drawButton = document.getElementById('draw-button');
drawButton.addEventListener('click', () => {
  draw(dataForm);
});

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  clear(d3.select('svg'));
})