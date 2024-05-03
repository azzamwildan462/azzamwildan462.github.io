/* SYSTEM GLOBAL VARIABLES */
let update_period = 25; // ms

/* GLOBAL VARIABLES */
let canvas_fog;
let canvas_main;
let canvas_fx;
let canvas_info;

let mouse_x = 0;
let mouse_y = 0;
let mouse_moved_epoch = 0;
let prev_mouse_move_epoch = 0;
let mouse_not_moved_cntr = 0;
let mouse_click_x = 0;
let mouse_click_y = 0;

let fog_radius = 200;

let key_pressed = 0;
let key_updated_epoch = 0;
let prev_key_updated_epoch = 0;
let key_to_mouse_velocity = 20;
let last_time_key_pressed = 0;
let first_cheat_word = true;

let cheat_code = "";
/**
 *
 * Index 0 untuk buka fog
 * Index 1 untuk allow mouse
 *
 */
let cheat_binary = Number(0b00);

let about_me_img = new Image();
let about_me_x = 700;
let about_me_y = 271;
let about_me_radius = 200;
let about_me_clicked = false;

let skills_img = new Image();
let skills_x = 1250;
let skills_y = 250;
let skills_radius = 100;
let skills_clicked = false;
let time_start_clicked = 0;

let cursor_img = new Image();
let cursor_size = 70;

let explosion_img = new Image();
let explosion_size = 420;

//========================================================================================
/* FUNCTIONS */
function draw_fog() {
  let ctx = canvas_fog.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas_fog.width, canvas_fog.height);

  if ((cheat_binary & 0b01) >> 0 == 1) return;

  // Fill with black
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas_fog.width, canvas_fog.height);

  ctx_clear_circle(ctx, mouse_x, mouse_y, fog_radius);
  draw_view_fog(ctx, mouse_x, mouse_y, fog_radius);
}

function callback_mouse(event) {
  let rect = canvas_fog.getBoundingClientRect();
  if (event.type === "click") {
    mouse_click_x = event.clientX - rect.left;
    mouse_click_y = event.clientY - rect.top;
    console.log("Mouse clicked at: ", mouse_click_x, mouse_click_y);
    process_clicked_point();
  }

  if ((cheat_binary & 0b10) >> 1 == 0) return;

  let ctx = canvas_fx.getContext("2d");
  ctx.clearRect(
    mouse_x - 0.5 * (cursor_size * 1.2),
    mouse_y - 0.5 * cursor_size,
    cursor_size + cursor_size * 0.2,
    cursor_size
  );

  mouse_x = event.clientX - rect.left;
  mouse_y = event.clientY - rect.top;

  ctx.drawImage(
    cursor_img,
    mouse_x - 0.5 * (cursor_size * 1.2),
    mouse_y - 0.5 * cursor_size,
    cursor_size + cursor_size * 0.2,
    cursor_size
  );

  mouse_moved_epoch++;
}

function callback_keyboard(event) {
  let time_now = new Date().getTime();
  if (first_cheat_word == true || time_now - last_time_key_pressed < 500) {
    cheat_code += event.key;
    first_cheat_word = false;
  }

  key_pressed = event.keyCode;
  key_updated_epoch++;
  last_time_key_pressed = new Date().getTime();
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
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

function deg_2_rad(deg) {
  return deg * 0.017452925;
}

function keyabord_control() {
  if (key_updated_epoch === prev_key_updated_epoch) return;
  prev_key_updated_epoch = key_updated_epoch;

  let ctx = canvas_fx.getContext("2d");
  ctx.clearRect(
    mouse_x - 0.5 * (cursor_size * 1.2),
    mouse_y - 0.5 * cursor_size,
    cursor_size + cursor_size * 0.2,
    cursor_size
  );
  switch (key_pressed) {
    case 38:
      mouse_y -= key_to_mouse_velocity;
      break;
    case 40:
      mouse_y += key_to_mouse_velocity;
      break;
    case 37:
      mouse_x -= key_to_mouse_velocity;
      break;
    case 39:
      mouse_x += key_to_mouse_velocity;
      break;
    case 13:
      mouse_click_x = mouse_x;
      mouse_click_y = mouse_y;
      process_clicked_point();
      break;
  }

  ctx.drawImage(
    cursor_img,
    mouse_x - 0.5 * (cursor_size * 1.2),
    mouse_y - 0.5 * cursor_size,
    cursor_size + cursor_size * 0.2,
    cursor_size
  );
}

function control_cheats() {
  let time_now = new Date().getTime();
  if (time_now - last_time_key_pressed > 1000) {
    cheat_code = "";
    first_cheat_word = true;
  }

  if (cheat_code === "asd") {
    cheat_binary &= ~0b01;
    cheat_binary |= 0b01;

    cheat_code = "";
    first_cheat_word = true;
  } else if (cheat_code === "qwe") {
    cheat_binary &= ~0b10;
    cheat_binary |= 0b10;

    cheat_code = "";
    first_cheat_word = true;
  }
}

function draw_buttons() {
  let ctx = canvas_main.getContext("2d");

  if (about_me_clicked == true) {
    ctx.drawImage(
      explosion_img,
      about_me_x - 0.5 * explosion_size,
      about_me_y - 0.5 * explosion_size,
      explosion_size,
      explosion_size
    );
  } else {
    ctx.drawImage(
      about_me_img,
      about_me_x - 0.5 * about_me_radius,
      about_me_y - 0.5 * about_me_radius * 0.75,
      about_me_radius,
      about_me_radius * 0.75
    );
  }

  ctx.fillStyle = "rgba(247, 20, 103, 0.5)";
  ctx.font = "20px Geneva";
  ctx.fillText(
    "About Me",
    about_me_x - 0.25 * about_me_radius,
    about_me_y - 0.4 * about_me_radius
  );

  if (skills_clicked == true) {
    ctx.drawImage(
      explosion_img,
      skills_x - 0.5 * explosion_size,
      skills_y - 0.5 * explosion_size,
      explosion_size,
      explosion_size
    );
  } else {
    ctx.drawImage(
      skills_img,
      skills_x - 0.5 * skills_radius,
      skills_y - 0.5 * skills_radius * 0.75,
      skills_radius,
      skills_radius * 0.75
    );
  }

  ctx.fillStyle = "rgba(19, 157, 242, 0.5)";
  ctx.font = "20px Geneva";
  ctx.fillText(
    "Skills",
    skills_x - 0.25 * skills_radius,
    skills_y - 0.4 * skills_radius
  );
}

function process_clicked_point() {
  let distance = Math.sqrt(
    Math.pow(mouse_click_x - mouse_x, 2) + Math.pow(mouse_click_y - mouse_y, 2)
  );

  if (distance > fog_radius) return;

  let ctx = canvas_main.getContext("2d");

  let distance_about_me = Math.sqrt(
    Math.pow(mouse_click_x - (about_me_x - about_me_radius * 0.5), 2) +
      Math.pow(mouse_click_y - (about_me_y - about_me_radius * 0.5 * 0.75), 2)
  );
  if (distance_about_me < about_me_radius) {
    about_me_clicked = true;
    time_start_clicked = new Date().getTime();
    ctx.clearRect(
      about_me_img,
      about_me_x - 0.5 * about_me_radius,
      about_me_y - 0.5 * about_me_radius * 0.75,
      about_me_radius,
      about_me_radius * 0.75
    );
  }

  let distance_skills = Math.sqrt(
    Math.pow(mouse_click_x - (skills_x + skills_radius * 0.5), 2) +
      Math.pow(mouse_click_y - (skills_y + skills_radius * 0.1), 2)
  );
  if (distance_skills < skills_radius) {
    skills_clicked = true;
    time_start_clicked = new Date().getTime();
    ctx.clearRect(
      skills_x - 0.5 * skills_radius,
      skills_y - 0.5 * skills_radius * 0.75,
      skills_radius,
      skills_radius * 0.75
    );
  }
}

function control_clicked_point() {
  let ctx = canvas_main.getContext("2d");

  if (about_me_clicked == true) {
    let time_now = new Date().getTime();
    if (time_now - time_start_clicked > 1400) {
      about_me_clicked = false;
      ctx.clearRect(
        about_me_x - 0.5 * explosion_size,
        about_me_y - 0.5 * explosion_size,
        explosion_size,
        explosion_size
      );
    }
  }

  if (skills_clicked == true) {
    let time_now = new Date().getTime();
    if (time_now - time_start_clicked > 1400) {
      skills_clicked = false;
      ctx.clearRect(
        skills_x - 0.5 * explosion_size,
        skills_y - 0.5 * explosion_size,
        explosion_size,
        explosion_size
      );
    }
  }
}

function routine_main() {
  if (mouse_moved_epoch === prev_mouse_move_epoch && mouse_moved_epoch !== 0) {
    mouse_not_moved_cntr++;
  }
  prev_mouse_move_epoch = mouse_moved_epoch;

  if (mouse_not_moved_cntr > 20) {
    mouse_not_moved_cntr = 0;
  }

  control_clicked_point();

  keyabord_control();
  control_cheats();
  draw_fog();
  draw_buttons();
}

//========================================================================================
/* MAIN */
window.onload = () => {
  canvas_fog = document.getElementById("fog");
  canvas_fog.width = window.innerWidth;
  canvas_fog.height = window.innerHeight;

  canvas_main = document.getElementById("main");
  canvas_main.width = window.innerWidth;
  canvas_main.height = window.innerHeight;

  canvas_fx = document.getElementById("fx");
  canvas_fx.width = window.innerWidth;
  canvas_fx.height = window.innerHeight;

  canvas_info = document.getElementById("info");
  canvas_info.width = window.innerWidth;
  canvas_info.height = window.innerHeight;

  window.addEventListener("mousemove", callback_mouse);
  window.addEventListener("click", callback_mouse);
  window.addEventListener("keydown", callback_keyboard);

  cursor_img.src = "assets/images/sc2.png";
  about_me_img.src = "assets/images/moon.png";
  skills_img.src = "assets/images/satelit1.png";
  explosion_img.src = "assets/images/ledakan2.png";

  setInterval(routine_main, update_period);
};
