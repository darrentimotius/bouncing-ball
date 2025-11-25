const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const statsDiv = document.getElementById('stats');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const realGravity = 9.8;
const scalePixelsPerMeter = canvas.height / 3; 
const fps = 30;
const dt = 1 / fps; 
const maxTime = 1.5;

let timeElapsed = 0;
let isStopped = false;

let posY_meter = 1.5;
let velY_meter = 0;   
let bounceFactor = 0.7;

const radiusPixel = 30;

function drawBall(yPixel) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, yPixel, radiusPixel, 0, Math.PI * 2, false);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.closePath();
}

let lastFrameTime = 0;
const frameInterval = 1000 / fps;

function animate(timestamp) {
    if (isStopped) return;

    requestAnimationFrame(animate);

    const elapsed = timestamp - lastFrameTime;

    if (elapsed > frameInterval) {
        lastFrameTime = timestamp - (elapsed % frameInterval);

        timeElapsed += dt;

        if (timeElapsed >= maxTime) {
            isStopped = true;
            statsDiv.innerText = `STOP! Waktu: 1.50s | Gravitasi: 9.8 m/s²`;
            statsDiv.style.color = "red";
            return;
        }

        velY_meter += realGravity * dt;
        posY_meter += velY_meter * dt;

        let pixelY = posY_meter * scalePixelsPerMeter;

        if (pixelY + radiusPixel > canvas.height) {
            pixelY = canvas.height - radiusPixel;
            posY_meter = pixelY / scalePixelsPerMeter;
            velY_meter = -velY_meter * bounceFactor;
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawBall(pixelY);

        statsDiv.innerText = `Waktu: ${timeElapsed.toFixed(2)}s | Kecepatan: ${Math.abs(velY_meter).toFixed(2)} m/s`;
    }
}

animate(0);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    location.reload(); 
});