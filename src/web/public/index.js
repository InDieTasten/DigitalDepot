let updateIntervalId;

class Bus {
    constructor(bus) {
        this.id = bus?.id;
        this.isMaxi = bus?.isMaxi;
        this.isElectric = bus?.isElectric;
        this.length = bus?.length;
        this.fuel = Math.floor(Math.random() * 100);
    }
}


class Lane {
    constructor(lane)
    {
        this.isElectric = lane?.isElectric;
        this.isMaxi = lane?.isMaxi;
        this.maxCapacity = lane?.maxCapacity;
        this.currentCapacity = 0;
        this.buses = [];
    }

    enqueue(bus) {
        if (bus.isElectric && !this.isElectric)
        {
            throw 'Electric buses must be charged.';
        }

        if (bus.isMaxi && !this.isMaxi)
        {
            throw 'Maxi buses do not fit in this lane.';
        }

        if (!this.hasCapacity())
        {
            throw 'Lane is full and bus will not fit.';
        }

        this.buses.push(bus);
        this.currentCapacity++;
    }

    dequeue() {
        this.currentCapacity--;
        return this.buses.shift();
    }

    hasCapacity()
    {
        return this.currentCapacity < this.maxCapacity
    }
}

function resetPosition(position) {
    position.classList.add("available");
    position.classList.remove("hasBus");
    position.classList.remove("isElectric");
    position.bus = undefined;
    position.innerHTML = "";
}

function resetPositions() {
    window.positionElements.forEach(position => {
        resetPosition(position);
    });
}

function initialize() {
    console.log("init");

    // initialize dom
    window.laneElements = document.querySelectorAll(".lane");
    laneElements.forEach(lane => lane.positions = lane.querySelectorAll(".position"));
    window.positionElements = document.querySelectorAll(".position");
    resetPositions();

    window.buses = [];
    window.lanes = [];
    Promise.all([
        fetch("http://localhost:8080/buses/all")
            .then(response => response.json())
            .then(data => data.forEach(item => window.buses.push(new Bus(item)))),
        fetch("http://localhost:8080/lanes/all")
            .then(response => response.json())
            .then(data => data.forEach(item => window.lanes.push(new Lane(item))))])
    .then(() => initializeBusPositions());
}

function initializeBusPositions()
{
    console.log("initializing bus positions");
    for (let i = 0; i < 64; ++i)
    {
        try {
            let bus = window.buses[i];
            console.log(window.buses[i]);
            let availableLanes = window.lanes.filter(lane => 
                lane.hasCapacity 
                && ((bus.isElectric && lane.isElectric) || !bus.isElectric) 
                && lane.isMaxi == bus.isMaxi
                && (!lane.buses[0] || (lane.buses[0].length == bus.length && lane.buses[0].isElectric == bus.isElectric)));
            let lane = availableLanes[Math.floor(Math.random()*availableLanes.length)];
            lane.enqueue(bus);
        } catch {}
    }
}

function addBusToPosition(position, bus)
{
    position.classList.remove("available");
    position.classList.add("hasBus");
    if (bus.isElectric) {
        position.classList.add("isElectric");
    }
    position.title = (bus.isElectric ? " Elektro-" : "") + "Bus: " + bus.id + " Lange: " + bus.length;
    position.innerHTML = "<div class=\"busfuel\" style=\"height:" + (100 - bus.fuel) + "px;\"></div><span>" + bus.id + "</span>";
    position.bus = bus;
    bus.position = position;
}

function updateDom() {
    console.log("update");

    // update dom with new bus positions and status
    resetPositions();
    window.lanes.forEach((lane, laneIndex) => 
        lane.buses.forEach((bus, busIndex) => {
            let position = window.laneElements[laneIndex].positions[busIndex];
            addBusToPosition(position, bus);
        }));
}

function dequeueRandomBuses() {
    let availableBuses = window.buses.filter(bus => bus.position && bus.fuel > 90);
    let numberToDequeue = Math.min(Math.floor(Math.random()*availableBuses.length), 20);
    for(let i = 0; i < numberToDequeue; ++i) {
        dequeueRandomBus();
    }
}

function dequeueRandomBus() {
    let availableLanes = window.lanes.filter(lane => lane.buses[0] && (lane.buses[0].fuel > 90 || !lane.buses[0].isElectric));
    let lane = availableLanes[Math.floor(Math.random()*availableLanes.length)];
    if (lane) {
        let bus = lane.dequeue();
        bus.position = undefined;
    }
}

function fuelBuses() {
    let availableBuses = window.buses.filter(bus => bus.position && bus.isElectric);
    availableBuses.forEach(bus => bus.fuel = Math.min(100, bus.fuel + 10));
}

function enqueueRandomBuses() {
    let availableBuses = window.buses.filter(bus => !bus.position);
    let numberToQueue = Math.floor(Math.random()*availableBuses.length);
    for(let i = 0; i < numberToQueue; ++i) {
        enqueueRandomBus();
    }
}

function enqueueRandomBus() {
    let availableBuses = window.buses.filter(bus => !bus.position);
    let bus = availableBuses[Math.floor(Math.random()*availableBuses.length)];
    let availableLanes = window.lanes.filter(lane => 
        lane.hasCapacity 
        && ((bus.isElectric && lane.isElectric) || !bus.isElectric) 
        && lane.isMaxi == bus.isMaxi
        && (!lane.buses[0] || (lane.buses[0].length == bus.length && lane.buses[0].isElectric == bus.isElectric)));
    let lane = availableLanes[Math.floor(Math.random()*availableLanes.length)];
    if (lane && lane.hasCapacity) {
        try {
            if (bus.isElectric) {
                bus.fuel = Math.floor((Math.random() * 45) + 5);
            } else {
                bus.fuel = Math.floor((Math.random() * 95) + 5)
            }

            lane.enqueue(bus);
        } catch {}
    }
}

function startLoop() {
    initialize();
    updateIntervalId = setInterval(() => {
        dequeueRandomBuses();
        fuelBuses();
        enqueueRandomBuses();
        updateDom();
    }, 1000);
}

startLoop();