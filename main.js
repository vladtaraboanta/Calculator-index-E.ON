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
    var energieActiva = content.find('#energie-activa');
    var contributieCogenerare = content.find('#contributie-cogenerare');
    var accizaNecomerciala = content.find('#acciza-necomerciala');
    var certificateVerzi = content.find('#certificate-verzi');
    var totalCurent = content.find('#total-curent');

    //Default text curent
    var energieActivaDefault = energieActiva.html();
    var contributieCogenerareDefault = contributieCogenerare.html();
    var accizaNecomercialaDefault = accizaNecomerciala.html();
    var certificateVerziDefault = certificateVerzi.html();
    var totalCurentDefault = totalCurent.html();

    // Gaz
    var consumGaz = content.find('#consum-gaz');
    var documentFacturare = content.find('#document-facturare');
    var totalGaz = content.find('#total-gaz');

    var abonament = content.find('#abonament');
    var pretTotal = content.find('#pret-total');

    //Default text gaz
    var consumGazDefault = consumGaz.html();
    var documentFacturareDefault = documentFacturare.html();
    var totalGazDefault = totalGaz.html();

    var abonamentDefault = abonament.html();
    var pretTotalDefault = pretTotal.html();


    $('button').on('click', function (e) {
        var count = 0;
        $('input[type="number"]').each(function () {
            if ($(this).val() != "") {
                count++;
            }
        });

        if (count === $('input').length) {
            e.preventDefault();
            if (allowSubmit) {
                allowSubmit = false;
            }
            else {
                return false
            }

            $('body').find('.error').fadeOut(0);

            var indexContorCurent = $('body').find('input[name="index-contor-curent"]').val();
            var indexContorGaz = $('body').find('input[name="index-contor-gaz"]').val();

            content.slideToggle(200);

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

            function round(number) {
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
        }
        else {
            $('body').find('.error').fadeIn(200);
            return false;
        }
    });

    $('.reset').on('click', function () {
        allowSubmit = true;

        content.slideToggle(200);

        var delay = setTimeout(function () {
            $('body').find("input[type=number], textarea").val("");

            // Afisare Costuri Curent
            energieActiva.html(energieActivaDefault);
            contributieCogenerare.html(contributieCogenerareDefault);
            accizaNecomerciala.html(accizaNecomercialaDefault);
            certificateVerzi.html(certificateVerziDefault);
            totalCurent.html(totalCurentDefault);

            // Afisare Costuri Gaz
            consumGaz.html(consumGazDefault);
            documentFacturare.html(documentFacturareDefault);
            totalGaz.html(totalGazDefault);

            abonament.html(abonamentDefault);

            pretTotal.html(pretTotalDefault);
        }, 200);
    });
});
