// 鼠标悬浮到菜单动画
const btn = document.querySelectorAll('nav > .a');
function update(e) {
  const span = this.querySelector('span');
  if (e.type === 'mouseleave') {
    span.style.cssText = '';
  } else {
    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = this;
    const walk = 20;
    const xWalk = (x / width) * (walk * 2) - walk, yWalk = (y / height) * (walk * 2) - walk;
    span.style.cssText = `transform: translate(${xWalk}px, ${yWalk}px);`
  }
}
btn.forEach(b => b.addEventListener('mousemove', update));
btn.forEach(b => b.addEventListener('mouseleave', update));