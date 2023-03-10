function goToPkp(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

function waitForTrain(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

function travelToDestination(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

//use promise
// goToPkp().then(() => {
//     console.log('Dotarłem do PKP!');
//     waitForTrain().then(() => {
//         console.log('Pociąg przyjechał!');
//         travelToDestination().then(() => {
//             console.log('Dojechałem!');
//         });
//     });
// });

//lepsze wyjście:

goToPkp().then(() => {
    console.log('Dotarłem do PKP!');
    return waitForTrain();
}).then(() => {
    console.log('Pociąg przyjechał!');
    return travelToDestination();
}).then(() => {
    console.log('Dojechałem!');
});



