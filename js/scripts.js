$(document).ready(function(){

    let $inputFontPreview = $('.input-preview-font'),
        $fontSwitcher = $('.font-switcher-select'),
        $previewBlock = $('.font-preview-cont');

    let apiKey = 'AIzaSyD9VeJ-OZPTCcU9ANRSb7Kc31wdO-VPlnI';
    let url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

    // Show text from input on each key press
    $inputFontPreview.on('keyup', (e) => {
        e.preventDefault();

        let $this = $(e.currentTarget),
            textTyped = $this.val();

        $previewBlock.html(textTyped);
    });

    // Update font after selecting from select dropdown
    $fontSwitcher.on('change', (e) => {
        e.preventDefault();

        let $this = $(e.currentTarget),
            fontChosen = $this.val();

        $previewBlock.css({
            'font-family': fontChosen
        });
    });

    ajaxRequest(url).then((response) => {

        // At first, splice first 50 results
        let firstFiftyFonts = response.items.splice(0, 50);
        let arrFontsToLoad = [];

        // Create options for select tag, save font family names into a new array
        _.forEach(firstFiftyFonts, (currentEl) => {
            let currentElFontFamily = currentEl.family;

            $fontSwitcher.append(`<option value="${currentElFontFamily}">${currentElFontFamily}</option>`);
            arrFontsToLoad.push(currentElFontFamily);
        });

        // Load fonts from saved array
        WebFont.load({
            google: {
                families: arrFontsToLoad
            }
        });
    });
});

const ajaxRequest = (url, dataToSend, type) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: type || "GET",
            url: url,
            data: dataToSend || {}
        })
            .done((response) => {
                // Just a quick check-up to avoid undefined response etc.
                if (response) {
                    resolve(response);
                }
                else {
                    // There could be some user notification about bad response
                }
            })
            .fail((errorMsg) => {
                console.log(errorMsg);
                resolve(reject);
            });
    });
};