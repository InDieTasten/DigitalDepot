let updateIntervalId;
let apiResponse = {
    buses: [
        {
            vehicleNo: "101",
            type: "",
            positionId: ""
        }
    ]
}

function initialize() {
    console.log("init");

    // initialize dom
}

function updateDom() {
    console.log("update");

    // update dom with new bus positions and status
}

function startLoop() {
    initialize();
    updateIntervalId = setInterval(() => {
        updateDom();
    }, 1000);
}

startLoop();