class Bus {
    constructor(uuid,isMaxi,isElectric, lenght) {
        this.id = uuid;
        this.isMaxi = isMaxi;
        this.isElectric = isElectric;
        this.length = lenght;
    }
}

class BusQueue {
    constructor(bus, startTime, endTime)
    {
        this.bus = bus;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class Lane {
    constructor() {
        this.isElectric = false;
        this.isMaxi = false;
        this.maxCapacity = 0;
        this.currentCapacity = 0;
        this.buses = [];
    }

    enqueue(bus, startTime, endTime) {
        if (bus.isElectric && !this.supportsCharging)
        {
            throw 'Electric buses must be charged.';
        }

        if (bus.isMaxi && !this.supportsMaxi)
        {
            throw 'Maxi buses do not fit in this lane.';
        }

        if (!this.hasCapacity())
        {
            throw 'Lane is full and bus will not fit.';
        }

        this.buses.push(new BusQueue(bus, startTime, endTime));
    }

    dequeue() {
        return this.buses.shift();
    }

    hasCapacity(bus)
    {
        return bus.length + this.currentCapacity <= this.maxCapacity
    }
}



class BusDepot {
    constructor() {
        this.lanes = [];
    }
}

function initializeBuses() {
    window.buses = []

    for (let i = 0; i < 64; ++i)
    {
        
        isElectric = ((Math.random() * 100 < 80)? true: false);

        isMaxi = (isElectric? false: ((Math.random() * 100 < 5) ? true: false)); 
        
        lenght = (isMaxi? 24: ((Math.random() * 100 < 50) ? 12: 18));

        let bus = new Bus(i,isElectric,isElectric,length);
        window.buses.push(bus);
    }
}

function initializeBusDepot() 
{
    window.busDepot = new BusDepot();
    var lane1 = new Lane();
    lane1.maxCapacity = 7;
    lane1.isElectric = true;
    busDepot.lanes[0] = lane1;
    var lane2 = new Lane();
    lane2.maxCapacity = 7;
    lane2.isElectric = true;
    busDepot.lanes[1] = lane2;
    var lane3 = new Lane();
    lane3.maxCapacity = 7;
    lane3.isElectric = true;
    busDepot.lanes[2] = lane3;
    var lane4 = new Lane();
    lane4.maxCapacity = 7;
    busDepot.lanes[3] = lane4;
    var lane5 = new Lane();
    lane5.maxCapacity = 7;
    lane5.isMaxi = true;
    busDepot.lanes[4] = lane5;
    var lane6 = new Lane();
    lane6.maxCapacity = 7;
    busDepot.lanes[5] = lane6;
    var lane7 = new Lane();
    lane7.maxCapacity = 7;
    lane7.isElectric = true;
    busDepot.lanes[6] = lane7;
    var lane8 = new Lane();
    lane8.maxCapacity = 7;
    lane8.isElectric = true;
    busDepot.lanes[7] = lane8;
    var lane9 = new Lane();
    lane9.maxCapacity = 7;
    lane9.isElectric = true;
    busDepot.lanes[8] = lane9;
    var lane10 = new Lane();
    lane10.maxCapacity = 7;
    lane10.isElectric = true;
    busDepot.lanes[9] = lane10;
    var lane11 = new Lane();
    lane11.maxCapacity = 7;
    lane11.isElectric = true;
    busDepot.lanes[10] = lane11;
    var lane12 = new Lane();
    lane12.maxCapacity = 7;
    lane12.isElectric = true;
    busDepot.lanes[11] = lane12;
}

(function(){
    initializeBuses();
    initializeBusDepot();
}())