/* 写的比较随便，勿介意 */

var c = document.querySelector("canvas");
c.width = innerWidth;
c.height = innerHeight;

var ctx = c.getContext("2d");

var arcs = [];

function Arc(x, y, r, sRad, eRad, lineWidth, color) {
  this.x = x || innerWidth / 2;
  this.y = y || innerHeight / 2;
  this.r = r || 50;
  this.sRad = sRad || 0;
  this.eRad = eRad || Math.PI * 2;
  this.lineWidth = lineWidth || 10;
  this.color = color || "#fff";
}

Arc.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.lineWidth = this.lineWidth;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.r, this.sRad, this.eRad, true);
  ctx.stroke();
};

Arc.prototype.move = function(rad) {
  this.sRad += rad;
  this.eRad += rad;
};

function handleMousedown(ev) {
  document.querySelector(".tips-text").style.display = "none";
  arcs.push(productArc(ev.offsetX, ev.offsetY));
  addEventListener("mousemove", handleMousemove);
}

function handleMousemove(ev) {
  arcs.push(productArc(ev.offsetX, ev.offsetY));
}

addEventListener("mousedown", handleMousedown);

addEventListener("mouseup", function() {
  removeEventListener("mousemove", handleMousemove);
});

function productArc(offsetX, offsetY) {
  var x = innerWidth / 2;
  var y = innerHeight / 2;
  var r = Math.sqrt(Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2));
  var sRad = Math.atan2(offsetY - y, offsetX - x);
  var eRad = sRad - 0.1;

  return new Arc(x, y, r, sRad, eRad);
}

function generateColorThroughRad(rad) {
  var angle = 180 / Math.PI * rad;
  if (angle < 0) {
    angle = 360 - Math.abs(angle);
  }

  return "hsl(" + angle + ", 50%, 50%)";
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  arcs.forEach(function(arc, index) {
    arc.color = generateColorThroughRad(arc.sRad);
    arc.draw(ctx);
    arc.move(1);
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
