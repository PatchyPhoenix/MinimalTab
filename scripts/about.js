setTimeout(()=>{document.body.style.setProperty('opacity','100%');
document.body.style.setProperty('background-color','#050505');}, 100)

document.getElementById('backBt').addEventListener('click', function() {
    window.location.href = "settings/index.html"
})