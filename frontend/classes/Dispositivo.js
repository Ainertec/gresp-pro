
//------------------------------------------------- classe dispositivos --------------------------------------------------------------------

//funcao responsavel por gerar a tela de ip de configuracao do dispositivo celular
function telaDeConfiguracaoDispositivo() {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalConfigDispositivo" tabindex="-1" role="dialog" aria-labelledby="modalDispositivo" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDispositivo">
                        <span class="fas fa-mobile-alt"></span> Configurar Dispositivo
                    </h5>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Faça a leitura do código QR abaixo com seu dispositivo celular para efetuar a configuração básica!</p>
                    <div class="qrcode rounded mx-auto d-block" id="qr2" style="margin-top: 30px;" align="middle"></div>
                    <h3 id="ipNumber" class="text-danger text-center" style="margin-top: 10px;"></h3>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalConfigDispositivo').modal('show');
    animacaoSlideUp(['#qr2']);
    pegarIpLocal();
}

//funcao responsavel por pegar o ip local da maquina
function pegarIpLocal() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            document.getElementById('ipNumber').innerHTML = myIP;
            gerarQRcodeDispositivo((myIP).toString());
            pc.onicecandidate = noop;
            animacaoSlideDown(['#qr2']);
        }
    };
}

//funcao responsavel por gerar o qrcode de configuracao de ip do dispositivo celular
function gerarQRcodeDispositivo(ip) {
    new QRCode("qr2", {
        text: ip,
        width: 256,
        height: 256,
        colorDark: "black",
        colorLight: "white",
        correctLevel: QRCode.CorrectLevel.H
    });
}