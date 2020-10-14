
export const drawLine = (x, y, ctx, newCord) => {
    //draw lines to canvas
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineWidth = 2;
    ctx.lineTo(newCord.x, newCord.y);
    ctx.strokeStyle = "green";
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(newCord.x, newCord.y, 3, 0, Math.PI * 2, true);
    ctx.fill();

}

//set the line  and transaction to stay inside canvas container
export const setTransLineCord = (x, y, width, height) => {
    let newCord = { x: 0, y: 0 };

    let midX = width / 2;
    let midY = height / 2;
    if (width - x < midX) newCord.x = x - midX;

    else {
        if (x > 50) newCord.x = x - 50;
        else newCord.x = x - 10;
    }

    if (height - y >= midY) newCord.y = y + 50;
    else {
        newCord.y = y + (y - midY) < height - 10 ? y + (y - midY + 10) : midY;

    }
    return newCord;
}

//set the line  and Statement to stay inside canvas container
export const setStatLineCord = (x, y, width, height) => {
    let newCord = { x: 0, y: 0 };
    let midX = width / 2;
    let midY = height / 2;

    if (width - x > midX) {
        newCord.x = x + (midX/2);
    }
    else {
        if (x + 50 < width) newCord.x = x + 50;
        else newCord.x = x + 10;
    }

    if (height - y > midY) newCord.y = midY - y + 10;
    else {
        newCord.y = x + 10 > width ? y + 10 : y - midY
    }
    return newCord;
}

//draw the center where lines start
export const drawCenter = (x, y, ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true)
    ctx.fillStyle = "green";
    ctx.fill();

}



