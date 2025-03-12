const mongoose = require('mongoose')

const  carSchema = new mongoose.Schema({
    brand: {
        type: String,
        enum: ['tata', 'maruthi', 'mahendra'],
        required: true
    },
    model: {
        type: String,
        required: true
    },
    varients : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "varients",
        required: true
    },
    fuelType: {
        type: String,
        enum: ['petrol', 'electric', 'diesel', 'cng', 'hybrid', 'hydrogen'],
        required: true
    },
    engine:  {
        cc: {
            type: Number,
            required: true
        },
        torque: {
            type: Number,
            required: true
        },
        engineType: {
            type: String,
            required: true
        }
    },
    features: [{
        type: String,
        required: true
    }],
    sunRoof:{ 
        type: String,
        enum: ['YES', 'NO'],
        required: true
    },
    color: color,
    transmission: {
        type: String,
        enum: ['manual', 'automatic', 'semi-automatic'],
        required: true
    },
    gallery: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        min:1,
        max:5
    },
    reviews: {
        type: String,
        required: true
    },
    lauchedDate :{
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    noOfAirBags :{
        type: Number,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    noOfCylinders: {
        type: Number,
        required: true
    },
    valvesPerCulinders: {
        type: Number,
        required: true
    },
    fuelTanksCapacity: {
        type: Number,
        required: true
    },
    gearBox : {
        type: Number,
        required: true
    },
    dimensions: {
        length: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    seatCapacity: {
        type: Number,
        required: true
    },
    noOfDoors: {
        type: Number,
        required: true
    },
    wheelBase: {
        type: Number,
        required: true
    },
    seatBeltWarnings: {
        type: String,
        enum: ['YES', "NO"],
        required: true
    },
    interior: {
        techometer: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        gloveBox: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        additionalFeatures: [{
            type: String,
            required: true
        }]
    },
    exterior: {
        RearWindowWiper: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        rearWindowWasher: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        rearWindowDefogger: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        wheelCovers: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        outSideRearViewMirrors: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        roofRails: {
            type: String,
            enum: ['YES', "NO"],
            required: true
        },
        additionalFeatures: [{
            type: String,
            required: true
        }]
    }
})


const Car = mongoose.model("Car", carSchema)
module.exports = { Car };