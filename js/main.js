import { drawSmile, clear } from './image.js';
import { toggleAnimationSettings, runAnimation, toggleAlongTheWay } from './animation.js';
import { getTransformStyle } from './utils.js'

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

  const transformStyle = getTransformStyle(translate, scale, angle);

  pict.attr("transform", transformStyle)
}

d3.select(document).on("DOMContentLoaded.init", function () {
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

const dataForm = d3.select('#setting').node();
d3.select('#draw-button').on('click', () => {
  draw(dataForm);
});

d3.select('#clear-button').on('click', () => {
  clear(d3.select('svg'));
});

d3.select('#animation-on').on('click', () => {
  toggleAnimationSettings();
});

d3.select('#animate-button').on('click', () => {
  runAnimation(dataForm);
});

d3.select('#along-the-way').on('click', () => {
  toggleAlongTheWay();
});

d3.select(document).on('DOMContentLoaded.toggle', () => {
  toggleAlongTheWay();
});