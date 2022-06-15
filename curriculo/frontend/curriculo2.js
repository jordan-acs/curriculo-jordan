const button = $('button');

const popup = $('.popup-wrapper')
/*button.addEventListener('click',() => {
    popup.style.display = 'block'
})*/
button.click(function() {
    popup.css('display','block');
});

function openYT() {
    window.open("www.google.com")
}
