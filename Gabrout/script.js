window.onload = function() {
    let canvasJogo = document.querySelector("#canvasJogo")
    canvasJogo.width = 500
    canvasJogo.height = 500
    let pincel = canvasJogo.getContext("2d")

    let x = 250
    let y = 0
    function main() {
        pincel.clearRect(0, 0, 500, 500)
        pincel.beginPath()
        pincel.fillStyle = "yellow"
        pincel.fillRect(x, y, 50, 50) 
        //x++
        //y++   
        requestAnimationFrame(main)
    }
    requestAnimationFrame(main)

    



}