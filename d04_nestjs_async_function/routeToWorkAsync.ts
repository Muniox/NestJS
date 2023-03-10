function goToPkp(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

function waitForTrain(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

function travelToDestination(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

(async () => {
    await goToPkp();
    console.log('Dotarłem do PKP!');
    await waitForTrain();
    console.log('Pociąg Przyjechał!');
    await travelToDestination();
    console.log('Dojechałem!')
})();



