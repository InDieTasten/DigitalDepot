let updateIntervalId;

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

function initialize() {
    console.log("init");

    // initialize dom
    window.laneElements = document.querySelectorAll(".lane");
    laneElements.forEach(lane => lane.positions = lane.querySelectorAll(".position"));
    window.positionElements = document.querySelectorAll(".position");
    window.positionElements.forEach(position => position.classList.add("available"));

    window.buses = [];
    window.lanes = [];
    Promise.all([
        fetch("http://localhost:8080/buses/all")
            .then(response => response.json())
            .then(data => data.forEach(item => window.buses.push(item))),
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
    position.bus = bus;
    bus.position = position;
}

function updateDom() {
    console.log("update");

    // update dom with new bus positions and status
    window.lanes.forEach((lane, laneIndex) => 
        lane.buses.forEach((bus, busIndex) => {
            let position = window.laneElements[laneIndex].positions[busIndex];
            addBusToPosition(position, bus);
        }));
}

function startLoop() {
    initialize();
    updateIntervalId = setInterval(() => {
        updateDom();
    }, 1000);
}

startLoop();