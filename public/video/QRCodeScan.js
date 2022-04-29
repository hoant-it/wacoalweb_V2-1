
function onScanSuccess(qrCodeMessage) {
    // document.getElementById('result').innerHTML = '<span class="result">'+qrCodeMessage+'</span>';
    document.location=qrCodeMessage;
    // window.open(qrCodeMessage, '_blank');
}
function onScanError(errorMessage) {
  //handle scan error
//   alert(errorMessage);
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);
