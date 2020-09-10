import React, { createContext, useState, useEffect } from 'react'
import { fetchFromFalconeAPI, postToFalconeAPI, makeData } from "../components/Utils"
import _ from "lodash"
import { reactQueryConfigurations } from '../config/config';

const FalconeAPIContext = createContext()
export function FalconeAPIProvider(props) {

    const [planets, setPlanets] = useState([])
    const [totalTime, setTotalTime] = useState(0)
    const [vehicles, setVehicles] = useState([])
    const [accessToken, setAccessToken] = useState("")
    const [finalResponse, setFinalResponse] = useState({})
    const [selectedVehicles, setSelectedVehicles] = useState([])

    useEffect(() => {
        let isMounted = false
        if (!isMounted) {
            fetchFromFalconeAPI("planets", setPlanets)
            fetchFromFalconeAPI("vehicles", setVehicles)
        }
        return () => {
            isMounted = true
        }
    }, [])



    const updateAccessToken = (accessToken) => {
        setAccessToken(accessToken)
    }

    const handlePostQuery = (resource, vehicleNames = "", planetNames = "") => {
        let requestBody = {}
        let setResourceData = ""
        if (resource === "GT") {
            requestBody = null
            setResourceData = setAccessToken
        }
        if (resource === "FF") {
            requestBody["token"] = accessToken.token
            requestBody["vehicle_names"] = vehicleNames
            requestBody["planet_names"] = planetNames
            setResourceData = setFinalResponse
        }
        console.log("request body", requestBody)
        postToFalconeAPI({
            resource: resource,
            requestBody: requestBody,
            setResourceData: setResourceData
        })

    }

    const handleSelectPlanet = (planetIds) => {
        const allPlanets = planets
        allPlanets.forEach((planet) => {
            if (planetIds.includes(planet.id)) {
                planet.isSelected = true
            }
            else {
                planet.isSelected = false
            }
        })

        setPlanets(allPlanets)
    }

    const handleSelectVehicle = ({ vehicleId, delta, prevVehicleId, planetId }) => {
        const allVehicles = vehicles
        allVehicles.forEach((vehicle) => {
            if (vehicle.id === vehicleId) {
                vehicle.total_no += delta
                let allPlanets = planets.forEach(planet => {
                    if (planet.id === planetId) {
                        planet["travelVehicle"] = vehicleId
                    }
                })
            }
            if (vehicle.id === prevVehicleId) {
                vehicle.total_no += 1 //reset previous

            }
        })
        setVehicles(allVehicles)
    }

    const refetchAndSetResources = () => {
        fetchFromFalconeAPI("planets", setPlanets)
        fetchFromFalconeAPI("vehicles", setVehicles)
    }
    return (
        _.isEmpty(vehicles && planets) ? <p className="text-gray-700 font-bold ml-4">Fetching Resources ...</p> :
            <FalconeAPIContext.Provider
                value={[
                    planets,
                    vehicles,
                    accessToken,
                    setAccessToken,
                    finalResponse,
                    handlePostQuery,
                    handleSelectPlanet,
                    handleSelectVehicle,
                    setFinalResponse,
                    refetchAndSetResources,
                    totalTime,
                    setTotalTime

                ]}>
                {props.children}
            </FalconeAPIContext.Provider>)
}

export default FalconeAPIContext;
