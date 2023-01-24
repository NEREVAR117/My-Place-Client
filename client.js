// Second attempt at writing my own verison or r/place, this time written using HTML5's canvas method


const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

const canvas_grid = document.getElementById("my-canvas-grid")
const ctx_grid = canvas_grid.getContext("2d")

const timeline_speed = document.getElementById("timeline_speed")

ctx.imageSmoothingEnabled = false

//const board_height = 300
//const board_width = 300

let drawing_allowed = true

let last_selected_button = ''

// IP address the websocket opens to
const address = 'ws://localhost:12346'
//const address = 'ws://localhost:4000'
// Removed personal home IP

//let zoom_level = 1

// Create WebSocket connection object
const socket = new WebSocket(address, 'echo-protocol')

const navbar = document.querySelector(".navbar")

navbar.addEventListener("contextmenu", e => e.preventDefault())
navbar.addEventListener("click", function(event)
{
    //event.preventDefault() // Not needed?
})

// Get color pickers buttons imported
const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const color3 = document.getElementById('color3')
const color4 = document.getElementById('color4')
const color5 = document.getElementById('color5')
let current_color = "#ffffff" // White

let can_eye_dropper = true

document.onkeydown = function(event)
{
    if (event.keyCode === 69 && can_eye_dropper === true)
    {
        can_eye_dropper = false

        if (!window.EyeDropper)
        {
            alert("Your web browser does not support the eye-dropper. Sorry.")
        }
        
        else
        {
            const eyeDropper = new EyeDropper()
        
            eyeDropper.open().then((result) =>
            {


                current_color = result.sRGBHex
                
                // Checks if the input is grabbing something in the format of rgb(123, 123, 123) then converts it to hexadeciaml color format
                if(current_color.slice(0, 3) === 'rgb')
                {
                    console.log(current_color)
                    
                    let new_color = current_color.slice(4)
                    new_color = new_color.slice(0, -1)

                    let color_array = new_color.split(",")

                    let r = Number(color_array[0]).toString(16)
                    let g = Number(color_array[1]).toString(16)
                    let b = Number(color_array[2]).toString(16)

                    if (r.length == 1)
                        r = "0" + r
                    if (g.length == 1)
                        g = "0" + g
                    if (b.length == 1)
                        b = "0" + b

                    current_color = "#" + r + g + b

                    console.log(current_color)

                }




                if(last_selected_button === "color1"){color1.value = current_color}
                else if(last_selected_button === "color2"){color2.value = current_color}
                else if(last_selected_button === "color3"){color3.value = current_color}
                else if(last_selected_button === "color4"){color4.value = current_color}
                else if(last_selected_button === "color5"){color5.value = current_color}

                //current_color = result.sRGBHex

                can_eye_dropper = true
            })
        }
    }
}

color1.addEventListener("contextmenu", e => e.preventDefault())
// Detects if the user clicks on the color picker buttons
color1.addEventListener("mousedown", function(event)
{
    event.preventDefault()

    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color1"
    current_color = String(color1.value)
    color1.style.border = "dashed gray"
})

color1.addEventListener("input", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color1"
    current_color = String(color1.value)
    color1.style.border = "dashed gray"
})



color2.addEventListener("mousedown", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color2"
    current_color = String(color2.value)
    color2.style.border = "dashed gray"
})
color2.addEventListener("input", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color2"
    current_color = String(color2.value)
    color2.style.border = "dashed gray"
})



color3.addEventListener("mousedown", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color3"
    current_color = String(color3.value)
    color3.style.border = "dashed gray"
})
color3.addEventListener("input", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color3"
    current_color = String(color3.value)
    color3.style.border = "dashed gray"
})



color4.addEventListener("mousedown", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color4"
    current_color = String(color4.value)
    color4.style.border = "dashed gray"
})
color4.addEventListener("input", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color4"
    current_color = String(color4.value)
    color4.style.border = "dashed gray"
})



color5.addEventListener("mousedown", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color5"
    current_color = String(color5.value)
    color5.style.border = "dashed gray"
})
color5.addEventListener("input", function()
{
    color1.style.border = "none", color2.style.border = "none", color3.style.border = "none", color4.style.border = "none", color5.style.border = "none"
    last_selected_button = "color5"
    current_color = String(color5.value)
    color5.style.border = "dashed gray"
})









const timeline_button = document.querySelector('#timeline_button')

timeline_button.addEventListener("click", function()
{




    socket.send(JSON.stringify({type: "timeline_call"}))

    // Wipes the board to a white canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.height, canvas.width)


})





const grid_button = document.querySelector('#grid_button')

canvas_grid.style.visibility='hidden'

grid_button.addEventListener("click", function()
{


    console.log("It's gridding time...")

    if(canvas_grid.style.visibility=='visible')
    {
        canvas_grid.style.visibility='hidden'
    }
    
    else
    {
        canvas_grid.style.visibility='visible'
    }


})








// Triggers enabling or disabling the grid if the user presses the 'space' button
document.addEventListener('keypress', (event) =>
{
    if(event.code === "KeyQ")
    {
        if(canvas_grid.style.visibility=='visible')
        {
            canvas_grid.style.visibility='hidden'
        }
        
        else
        {
            canvas_grid.style.visibility='visible'
        }
    }




    else if(event.code === "KeyW")
    {
        pointY += (5 * scale)
        canvas_total.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")"
    }

    else if(event.code === "KeyA")
    {
        pointX += (5 * scale)
        canvas_total.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")"
    }

    else if(event.code === "KeyS")
    {
        pointY -= (5 * scale)
        canvas_total.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")"
    }

    else if(event.code === "KeyD")
    {
        pointX -= (5 * scale)
        canvas_total.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")"
    }






})












const info_button = document.querySelector('#info_button')

info_button.addEventListener("click", function()
{



    let message = `
    Hello and welcome to my humble version of r/place!

        --Controls--
        1) WASD moves the canvas around
        2) Q turns the grid on and off
        3) E opens a color picker (does not work on Firefox)

        4) Left click places pixels
        5) Right click drags the canvas
        6) Clicking the mouse wheel selects the color you're on

    Be respectful of others' artwork and have fun!
    `

    alert(message)


})













// Disables right click context on web page background
const background = document.getElementById("background")
background.addEventListener("contextmenu", e => e.preventDefault())





const canvas_total = document.getElementById("canvas-container")

var scale = 1
var panning = false
var pointX = 0
var pointY = 0
var start = { x: 0, y: 0 }

function setTransform()
{
	canvas_total.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")"
}
// CHANGHE THE BACKGROUND. TO CANVAS_TOTAL
background.onmousedown = function (e)
{
	e.preventDefault()

    if(e.button === 2)
    {
        start = { x: e.clientX - pointX, y: e.clientY - pointY}
        panning = true
    }


}

background.onmouseup = function (e)
{
	panning = false
}

background.onmousemove = function (e)
{
	e.preventDefault()
	
	if (!panning)
	{
		return
	}
	
    pointX = (e.clientX - start.x)
    pointY = (e.clientY - start.y)
    setTransform()
}

background.onwheel = function (e)
{

    //ctx.drawImage(canvas, 1, 1, 50, 50)

    if(!panning)
    {
        e.preventDefault()

        var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);

        // Sets the maximum and minimum zoom levels
        if(scale < 0.05)
        {
            scale = 0.05
        }
        if(scale > 50)
        {
            scale = 50
        }

        pointX = e.clientX - xs * scale
        pointY = e.clientY - ys * scale

        setTransform()
    }
}










socket.onclose = function (event)
{
    alert("Lost connection to server. Please refresh the page.")

    drawing_allowed = false

    // Wipes the board to a white canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.height, canvas.width)
}







//document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio));

// Taps into the SetupCanvas function on page load
document.addEventListener('DOMContentLoaded', SetupCanvas)

// Establishes the canvas
function SetupCanvas()
{



    color1.value = "#ffffff"
    color2.value = "#ff0000"
    color3.value = "#00ff00"
    color4.value = "#0000ff"
    color5.value = "#000000"

    last_selected_button = "color1"
    color1.style.border = "dashed gray"

    timeline_speed.value = 1


    //ctx.imageSmoothingEnabled = false

    //canvas.height = board_height
    //canvas.width = board_width

    // Scale of the web page
    ctx.scale(1, 1)



    // ( x coord, y xoord, height, width)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 1, 1)
    ctx.fillStyle = 'black'
    ctx.fillRect(5, 5, 1, 1)
    ctx.fillStyle = 'red'
    ctx.fillRect(10, 10, 1, 1)
    ctx.fillStyle = 'blue'
    ctx.fillRect(15, 15, 1, 1)

    //ctx.fillStyle = 'orange'
    //ctx.fillRect(25, 25, 10, 10)

    // Draws the canvas background
    //ctx.fillStyle = 'white'
    //ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draws the board state's rectangle
    //ctx.strokeStyle = 'black'
    //ctx.strokeRect(0, 0, 200, 200)

    // Handles the keyboard buttons being pressed
    //document.addEventListener('keydown', HandleKeyPress)


    //setup_canvas_grid()
}






// Taps into the SetupCanvas function on page load
//document.addEventListener('DOMContentLoaded', setup_canvas_grid)
function setup_canvas_grid()
{



    let scale = 10



    //canvas.height = canvas.height * 2  // WTF??? Why??

    canvas_grid.height = canvas.height * scale
    canvas_grid.width = canvas.width * scale








    //ctx_grid.clearRect(0,0,200,200)



    ctx_grid.scale(scale, scale)

    for(let i = 0; i < canvas.height; i++)
    {
        ctx_grid.fillStyle = '#969696'
        ctx_grid.fillRect(i, 0, 1 / scale, canvas.width)
    }

    for(let i = 0; i < canvas.width; i++)
    {
        ctx_grid.fillStyle = '#969696'
        ctx_grid.fillRect(0, i, canvas.height, 1 / scale)
    }


    for(let i = 0; i < canvas.height; i += 10)
    {
        ctx_grid.fillStyle = '#323232'
        ctx_grid.fillRect(i, 0, 1 / scale, canvas.width)
    }

    for(let i = 0; i < canvas.width; i += 10)
    {
        ctx_grid.fillStyle = '#323232'
        ctx_grid.fillRect(0, i, canvas.height, 1 / scale)
    }
}















// Disables right-clicking bringing up a context menu
canvas_total.addEventListener("contextmenu", e => e.preventDefault())

canvas_total.addEventListener("mousedown", function(event)
{

    event.preventDefault()

    // Triggers only if left mouse button is clicked
    if(event.button === 0 && drawing_allowed === true)
    {



      
        // First gets the coordinates of the mouse click on the canvas. Rounds down to a whole number
        let board = canvas.getBoundingClientRect()

        // Some bullshit math to get the canvas movement and scaling synced properly. Thanks to Sam for the help!! Rev too!
        let x = Math.floor((event.clientX - board.left) / (scale * canvas.clientWidth / canvas.width))
        let y = Math.floor((event.clientY - board.top) / (scale * canvas.clientHeight / canvas.height))

        //window.devicePixelRatio

    
        // Fills that 'pixel' with the current chosen color
        ctx.fillStyle = current_color
        ctx.fillRect(x, y, 1, 1)

        // Sends newly painted pixel information to the server
        socket.send(JSON.stringify({type: "set_tile", x: x, y: y, c: current_color}))

    }


    else if(event.button === 1)
    {





        // First gets the coordinates of the mouse click on the canvas. Rounds down to a whole number
        let board = canvas.getBoundingClientRect();

        // Some bullshit math to get the canvas movement and scaling synced properly. Thanks to Sam for the help!! Rev too!
        let x = Math.floor((event.clientX - board.left) / (scale * canvas.clientWidth / canvas.width))
        let y = Math.floor((event.clientY - board.top) / (scale * canvas.clientHeight / canvas.height))

        //let x = (event.clientX - board.left) / (scale * canvas.clientWidth / canvas.width)
        //let y = (event.clientY - board.top) / (scale * canvas.clientHeight / canvas.height)


        //x = x - (scale * 1.01)
        //y = y - (scale * 1.01)



        var imgData = ctx.getImageData(x, y, 1, 1);

        console.log(imgData.data[0])
        console.log(typeof(imgData.data[0]))

        let r = imgData.data[0].toString(16)
        let g = imgData.data[1].toString(16)
        let b = imgData.data[2].toString(16)

        console.log(r)
        
        if (r.length == 1)
            r = "0" + r
        if (g.length == 1)
            g = "0" + g
        if (b.length == 1)
            b = "0" + b
        
        current_color = "#" + r + g + b

        if(current_color === "#000000" && imgData.data[3] === 0)
            current_color = "#ffffff"





        if(last_selected_button === "color1")
            color1.value = current_color
        else if(last_selected_button === "color2")
            color2.value = current_color
        else if(last_selected_button === "color3")
            color3.value = current_color
        else if(last_selected_button === "color4")
            color4.value = current_color
        else if(last_selected_button === "color5")
            color5.value = current_color



    }


    else if(event.button === 2)
    {
        event.preventDefault()
    }
})












// Connection opened
socket.addEventListener('open', (event) =>
{
    // Simple string sending
    //socket.send('Hello Server!')
})


// Listen for board state (pixel) updates from server
socket.addEventListener('message', (event) =>
{
    const data = JSON.parse(event.data)

    if(data.type === "board_state")
    {

        // Sends to the client the size of the canvas (controlled by server)
        canvas.width = data.width
        canvas.height = data.height





        // Iterates
        for(let pixel = 0; pixel < data.board_state.length; pixel++)
        {
            ctx.fillStyle = data.board_state[pixel].c
            ctx.fillRect(data.board_state[pixel].x, data.board_state[pixel].y, 1, 1)
        }


        // Now that the canvas height and width are properly set, we can build the grid canvas
        setup_canvas_grid()
    }


    else if(data.type === "tile_set")
    {
        ctx.fillStyle = data.new_color
        ctx.fillRect(data.x, data.y, 1, 1)
    }







    else if(data.type === "board_state_timeline")
    {

        drawing_allowed = false



        function sleep(ms)
        {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
        
        async function demo()
        {
            //let timeline_speed = 10
            for(let pixel = 0; pixel < data.board_state_timeline.length; pixel)

            {
                for(let i = 0; i < timeline_speed.value; i++)
                {

                    // Catches itself at the end of the timeline array. Any leftover searches basically get ignored by the code
                    try
                    {
                        ctx.fillStyle = data.board_state_timeline[pixel].c
                        ctx.fillRect(data.board_state_timeline[pixel].x, data.board_state_timeline[pixel].y, 1, 1)
                        pixel++
                    }
                    
                    catch (error)
                    {
                      //console.error(error)
                    }
                }


                await sleep(1)
            }
            console.log('Done')
            console.log("After timeline")

            drawing_allowed = true
        }

        
        demo()
    }



    // Triggers if malformed websocket injection is detected by the client
    else if(data.type === "malform_warning")
    {
        alert("Malformed websocket injection has been detected.\n\nNice try. Your IP has been logged.")
    
        drawing_allowed = false
    
        // Wipes the board to a white canvas
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.height, canvas.width)

    }



})
