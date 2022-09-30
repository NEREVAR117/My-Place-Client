

let container = document.querySelector('.container')
let size = 50
const color = document.querySelector('.color')
const reset_button = document.querySelector('.reset-button')
var test_array = ['rgb(0, 128, 0)', 'rgb(128, 0, 0)', 'rgb(0, 0, 128)', 'rgb(128, 0, 128)']

let draw = false

const pixels_div = []

const address = ''






// Create WebSocket connection.
const socket = new WebSocket(address, 'echo-protocol')

// Connection opened
socket.addEventListener('open', (event) =>
{
    // Simple string sending
    //socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', (event) =>
{
    console.log('Server is pinging', event.data)
    //console.log(event.data.gameboard)

    const data = JSON.parse(event.data)

    if(data.type === "gameboard")
    {
        data.gameboard.forEach((color, index) =>
        {
            pixels_div[index].style.backgroundColor = color
        })
    }
})





//console.log(container)
//console.log(container.innerHTML)



function populate(size)
{
    container.style.setProperty('--size', size)

    for(let i = 0; i < size * size; i++)
    {
        const div = document.createElement('div')
        pixels_div.push(div)
        div.classList.add('pixel')

        //div.style.backgroundColor = test_array[i]

        div.addEventListener('mousedown', function()
        {



            div.style.backgroundColor = color.value
            socket.send(JSON.stringify({type: "set_tile", index : i, color : color.value}))

            
            

            //console.log(div)
            //console.log(div.classList)
            //console.log(container.style)
            //console.log(container)
            //console.log(container.innerHTML)

        })

        container.appendChild(div)


    }
}

window.addEventListener('mousedown', function()
{
    draw = true
})

window.addEventListener('mouseup', function()
{
    draw = false
})

function reset()
{
    //console.log(container.innerHTML)
    //container.innerHTML = ''
    //container.innerHTML = '<div class="pixel" style="background-color: rgb(255, 0, 6);"></div><div class="pixel" style="background-color: rgb(0, 255, 64);"></div><div class="pixel" style="background-color: rgb(0, 255, 64);"></div><div class="pixel" style="background-color: rgb(0, 255, 64);"></div><div class="pixel"></div>'
    //container = document.querySelector('.container')
    //console.log(container.innerHTML)
    //console.log(container.innerHTML)
    //populate(size)
}

reset_button.addEventListener('click', reset)

populate(size)