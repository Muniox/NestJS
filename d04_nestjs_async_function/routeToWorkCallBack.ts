function goToPkp(clb: () => void) {
    setTimeout(clb, 1000);
}

function waitForTrain(clb: () => void) {
    setTimeout(clb, 1500);
}

function travelToDestination(clb: () => void) {
    setTimeout(clb, 2000);
}

//use callBack
goToPkp(() => {
    console.log('Dotarłem do PKP');
    waitForTrain(() => {
        console.log('Pociąg przyjechał');
        travelToDestination(() => {
            console.log('Dojechałem!');
        })
    })
});