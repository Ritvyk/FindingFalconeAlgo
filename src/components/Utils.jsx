import axios from "axios"
import { configs } from "../config/config"
import { v4 as uuidV4 } from "uuid"
import _ from "lodash"

export const fetchFromFalconeAPI = (resource, setResourceData) => {
    let fetchURL = ""
    if (resource === "planets") {
        //setting fetch URL
        fetchURL = configs.planets
    }
    if (resource === "vehicles") {
        fetchURL = configs.vehicles
    }

    axios.get(fetchURL).then(value => {
        if (!_.isEmpty(value.data)) {
            setResourceData(makeData(resource, value.data))
        }
    })
}

export const calculateTravellingTime = (selectedPlanets, selectedVehicles, setTotalTime) => {
    if (selectedPlanets.length === 0 || selectedVehicles.length === 0) {
        setTotalTime(0)
        return
    }
    let totalTime = 0

    const getVehicle = (vehicleId) => {
        return _.filter(selectedVehicles, (vehicle) => {
            return vehicle.id === vehicleId
        })[0]
    }

    selectedPlanets.forEach(planet => {
        let distance = planet.distance
        let speed = 0
        if (planet.travelVehicle) {
            speed = getVehicle(planet.travelVehicle).speed
        }
        let time = speed === 0 ? 0 : Math.floor(distance / speed)
        totalTime += time

    })

    setTotalTime(totalTime)

}

export const postToFalconeAPI = ({ resource, requestBody, setResourceData }) => {
    let postURL = ""
    if (resource === "GT") {
        //GT -> Get Token , setting postURL
        postURL = configs.postURLS.getToken;
    }
    if (resource === "FF") {
        //FF-> Find Falcone 
        postURL = configs.postURLS.findFalcone;
    }

    axios.post(postURL, requestBody, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(value => {
        console.log("responsedata", value.data)
        setResourceData(value.data)
    })
}

const makeData = (resource, resourceData) => {
    console.log(resource)
    let data = []
    let addtionalAttributes = {}
    if (resource === "planets") {
        addtionalAttributes["id"] = ""
        addtionalAttributes["isSelected"] = false
    }
    if (resource === "vehicles") {
        addtionalAttributes["id"] = ""
    }
    resourceData.forEach((item, index) => {
        data.push({
            ...item,
            ...addtionalAttributes,
            id: uuidV4()
        })
    })

    return data
}