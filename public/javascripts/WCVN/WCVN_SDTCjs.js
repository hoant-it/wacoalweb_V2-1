function loadPdf(){
    // console.log('Page is loaded');
    // alert("Page is loaded");
    let hostName=window.location.origin;
    let href='/pdf/Or_chart_4_2020.pdf';
    var source=`https://drive.google.com/viewerng/viewer?embedded=true&url=${hostName}${href}`;
    console.log(source);
    var game=document.getElementById("embedPdfLoad");
    var clone=game.cloneNode(true);
    clone.setAttribute('src',source);
    game.parentNode.replaceChild(clone,game)
  }