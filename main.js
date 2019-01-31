$(function () {
    var allowSubmit = true;

    // Preturi Curent
    var pretEnergieActiva = 0.45;
    var pretContributieCogenerare = 0.01;
    var pretAccizaNecomerciala = 4.9;
    var pretCertificateVerzi = 58;

    // Preturi Gaz
    var pretConsumGaz = 139.1;
    var pretDocumentFacturare = 9;

    var pretAbonament = 7.2;
    var tva = 0.19;

    var content = $('body').find('.content');

    // Curent
    var energieActiva = $('body').find('.content #energie-activa');
    var contributieCogenerare = $('body').find('.content #contributie-cogenerare');
    var accizaNecomerciala = $('body').find('.content #acciza-necomerciala');
    var certificateVerzi = $('body').find('.content #certificate-verzi');
    var totalCurent = $('body').find('.content #total-curent');

    // Gaz
    var consumGaz = $('body').find('.content #consum-gaz');
    var documentFacturare = $('body').find('.content #document-facturare');
    var totalGaz = $('body').find('.content #total-gaz');

    var abonament = $('body').find('.content #abonament');
    var pretTotal = $('body').find('.content #pret-total');

    $(document).on('submit', '.form', function (e) {
        e.preventDefault();
        if (allowSubmit) {
            allowSubmit = false;
        }
        else {
            return false
        }

        var indexContorCurent = $('body').find('input[name="index-contor-curent"]').val();
        var indexContorGaz = $('body').find('input[name="index-contor-gaz"]').val();

        content.show(200);

        // Functii calcul curent
        function energie_activa(index) {
            var total = (index * pretEnergieActiva) + (index * pretEnergieActiva) * tva;

            return total;
        }

        function contributie_cogenerare(index) {
            var total = (index * pretContributieCogenerare) + (index * pretContributieCogenerare) * tva;

            return total;
        }

        function acciza_necomerciala(index) {
            var total = ((index * pretAccizaNecomerciala) / 1000) + (((index * pretAccizaNecomerciala) * tva) / 1000);

            return total;
        }

        function certificate_verzi(index) {
            var total = ((index * pretCertificateVerzi) / 1000) + (((index * pretCertificateVerzi) * tva) / 1000);

            return total;
        }

        function total_curent() {
            var total = energie_activa(indexContorCurent) + contributie_cogenerare(indexContorCurent) + acciza_necomerciala(indexContorCurent) + certificate_verzi(indexContorCurent) + calcul_abonament();

            return total;
        }

        // Functii calcul gaz
        function consum_gaz(index) {
            // 10.55 Convert m3 to kWh
            index = index * 10.55;

            var total = ((index * pretConsumGaz) / 1000) + (((index * pretConsumGaz) / 1000) * tva);

            return total;
        }

        function total_gaz() {
            var total = consum_gaz(indexContorGaz) + pretDocumentFacturare + calcul_abonament();

            return total;
        }

        function calcul_abonament() {
            var total = pretAbonament + (pretAbonament * tva);

            return total;
        }

        function pret_total() {
            var total = total_curent() + total_gaz();

            return total;
        }

        function round (number) {
            var total = parseFloat(number);
            total = total.toFixed(2);

            return total;
        }

        // Afisare Costuri Curent
        energieActiva.html(energieActiva.html() + ' ' + '<span>' + round(energie_activa(indexContorCurent)) + '</span>');
        contributieCogenerare.html(contributieCogenerare.html() + ' ' + '<span>' + round(contributie_cogenerare(indexContorCurent)) + '</span>');
        accizaNecomerciala.html(accizaNecomerciala.html() + ' ' + '<span>' + round(acciza_necomerciala(indexContorCurent)) + '</span>');
        certificateVerzi.html(certificateVerzi.html() + ' ' + '<span>' + round(certificate_verzi(indexContorCurent)) + '</span>');
        totalCurent.html(totalCurent.html() + ' ' + '<span>' + round(total_curent()) + '</span>');

        // Afisare Costuri Gaz
        consumGaz.html(consumGaz.html() + ' ' + '<span>' + round(consum_gaz(indexContorGaz)) + '</span>');
        documentFacturare.html(documentFacturare.html() + ' ' + '<span>' + round(pretDocumentFacturare) + '</span>');
        totalGaz.html(totalGaz.html() + ' ' + '<span>' + round(total_gaz()) + '</span>');

        abonament.html(abonament.html() + ' ' + '<span>' + round(calcul_abonament()) + '</span>');

        pretTotal.html(pretTotal.html() + ' ' + '<span>' + round(pret_total()) + '</span>');

        return false;
    });

    $('.reset').on('click', function () {
        allowSubmit = true;
        content.hide(200);

        $('body').find("input[type=text], textarea").val("");

        // Afisare Costuri Curent
        energieActiva.html('Energie Activă');
        contributieCogenerare.html('Contribuție Cogenerare');
        accizaNecomerciala.html('Acciză Necomercială');
        certificateVerzi.html('Certificate Verzi');
        totalCurent.html('Preț total curent');

        // Afisare Costuri Gaz
        consumGaz.html('Consumul de gaz');
        documentFacturare.html('Document de facturare SD');
        totalGaz.html('Preț total gaz');

        abonament.html('Abonament');

        pretTotal.html('Preț total');
    });
});
