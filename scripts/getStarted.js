setTimeout(()=>{document.body.style.setProperty('opacity','100%');
document.body.style.setProperty('background-color','#0F0F0F');}, 100)


document.getElementById('getStarted').addEventListener('click', () => {
    document.body.style.setProperty('opacity','0%');
    document.body.style.setProperty('background-color','#000000');
    document.querySelector('title').textContent = "New tab"
    setTimeout(()=>{window.location.href = "index.html"}, 700)
})

document.getElementById('next-1').addEventListener('click', () => {
    document.getElementById('back-2').style.setProperty('left','0%')
    document.getElementById('para-1').style.setProperty('transform','translateX(-150%)')
    document.getElementById('para-2').style.setProperty('transform','translateX(0%) translateY(-110%)')
    document.getElementById('para-3').style.setProperty('transform','translateX(150%) translateY(-220%)')
    document.getElementById('para-4').style.setProperty('transform','translateX(150%) translateY(-220%)')
})

document.getElementById('next-2').addEventListener('click', () => {
    document.getElementById('back-3').style.setProperty('left','0%')
    document.getElementById('para-1').style.setProperty('transform','translateX(-300%)')
    document.getElementById('para-2').style.setProperty('transform','translateX(-150%) translateY(-110%)')
    document.getElementById('para-3').style.setProperty('transform','translateX(0%) translateY(-220%)')
    document.getElementById('para-4').style.setProperty('transform','translateX(150%) translateY(-330%)')  
})

document.getElementById('next-3').addEventListener('click', () => {
    document.getElementById('back-4').style.setProperty('left','0%')
    document.getElementById('para-1').style.setProperty('transform','translateX(-450%)')
    document.getElementById('para-2').style.setProperty('transform','translateX(-300%) translateY(-110%)')
    document.getElementById('para-3').style.setProperty('transform','translateX(-150%) translateY(-220%)')
    document.getElementById('para-4').style.setProperty('transform','translateX(0%) translateY(-330%)')
})

document.getElementById('back-2').addEventListener('click', () => {
    document.getElementById('para-1').style.setProperty('transform','translateX(0%)')
    document.getElementById('para-2').style.setProperty('transform','translateX(150%) translateY(-110%)')
    document.getElementById('para-3').style.setProperty('transform','translateX(300%) translateY(-220%)')
    document.getElementById('para-4').style.setProperty('transform','translateX(450%) translateY(-330%)')
})

document.getElementById('back-3').addEventListener('click', () => {
    document.getElementById('para-1').style.setProperty('transform','translateX(-150%)')
    document.getElementById('para-2').style.setProperty('transform','translateX(0%) translateY(-110%)')
    document.getElementById('para-3').style.setProperty('transform','translateX(150%) translateY(-220%)')
    document.getElementById('para-4').style.setProperty('transform','translateX(300%) translateY(-330%)')
})

document.getElementById('back-4').addEventListener('click', () => {
    document.getElementById('para-1').style.setProperty('transform','translateX(-300%)')
    document.getElementById('para-2').style.setProperty('transform','translateX(-150%) translateY(-110%)')
    document.getElementById('para-3').style.setProperty('transform','translateX(0%) translateY(-220%)')
    document.getElementById('para-4').style.setProperty('transform','translateX(150%) translateY(-330%)')
})

document.getElementById("preference").addEventListener('click', function() { 
    chrome.windows.getCurrent().then((result) => {
        chrome.sidePanel.open({"windowId":result.id})
    });
    chrome.sidePanel.setOptions({"path":"settings/index.html"})
})