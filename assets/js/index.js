/* SYSTEM GLOBAL VARIABLES */
let update_period = 100; // ms

/* GLOBAL VARIABLES */
let canvas_fog;
let mouse_x = 0;
let mouse_y = 0;
let mouse_moved_epoch = 0;
let prev_mouse_move_epoch = 0;
let mouse_not_moved_cntr = 0;

let fsm_state = 0;

//========================================================================================
/* FUNCTIONS */
function draw_fog() {
  let ctx = canvas_fog.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas_fog.width, canvas_fog.height);

  // Fill with black
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas_fog.width, canvas_fog.height);

  ctx_clear_circle(ctx, mouse_x, mouse_y, 100);
  draw_view_fog(ctx, mouse_x, mouse_y, 100);
}

function get_mouse_coordinates(event) {
  let rect = canvas_fog.getBoundingClientRect();
  mouse_x = event.clientX - rect.left;
  mouse_y = event.clientY - rect.top;

  mouse_moved_epoch++;
}

function ctx_clear_circle(ctx, x, y, radius) {
  radius = radius - 1;
  for (let i = 0; i <= 180; i++) {
    let pt1_x = x + radius * Math.cos(deg_2_rad(i));
    let pt1_y = y + radius * Math.sin(deg_2_rad(i));

    let pt2_x = x + radius * Math.cos(deg_2_rad(i - 180));
    let pt2_y = y + radius * Math.sin(deg_2_rad(i - 180));

    ctx.clearRect(pt1_x, pt1_y, pt2_x - pt1_x, pt2_y - pt1_y);
  }
}

function draw_view_fog(ctx, x, y, radius) {
  let gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

  ctx.beginPath();
  ctx.arc(x, y, 100, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

function deg_2_rad(deg) {
  return deg * 0.017452925;
}

function routine_main() {
  if (mouse_moved_epoch === prev_mouse_move_epoch && mouse_moved_epoch !== 0) {
    mouse_not_moved_cntr++;
  }
  prev_mouse_move_epoch = mouse_moved_epoch;

  if (mouse_not_moved_cntr > 20) {
    console.log("Mouse not moved for 2 seconds");
    mouse_not_moved_cntr = 0;
  }

  draw_fog();
}

//========================================================================================
/* MAIN */
window.onload = () => {
  canvas_fog = document.getElementById("fog");
  canvas_fog.addEventListener("mousemove", get_mouse_coordinates);
  canvas_fog.width = window.innerWidth;
  canvas_fog.height = window.innerHeight;
  setInterval(routine_main, update_period);
};
