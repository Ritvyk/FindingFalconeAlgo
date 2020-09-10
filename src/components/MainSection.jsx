import React, { useState, useEffect, useContext } from 'react'
import { fetchFromFalconeAPI, calculateTravellingTime } from "../components/Utils"
import _ from "lodash"
import FalconeAPIContext from '../app_data_providers/FalconeAPIProvider';
import { configs } from '../config/config';
import PlanetCard from './PlanetCard';

function MainSection() {
    const [
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
    ] = useContext(FalconeAPIContext)

    const [selectedPlanets, setSelectedPlanets] = useState({})
    const [selectedVehicles, setSelectedVehicles] = useState({})

    const getPlanetVehicleData = () => {
        const selectedVehicleIds = Object.keys(selectedVehicles).map((key) => {
            return selectedVehicles[key]
        })

        const selectedPlanetIds = Object.keys(selectedPlanets).map((key) => {
            return selectedPlanets[key]
        })


        const planetObjects = []
        const vehicleObjects = []
        const relativeGroups = []

        planets.forEach((planet, idx) => {
            if (selectedPlanetIds.includes(planet.id)) {
                planetObjects.push(planet)
            }
        })

        selectedVehicleIds.forEach(vehicleId => {
            vehicles.forEach(vehicle => {
                if (vehicle.id === vehicleId) {
                    vehicleObjects.push(vehicle)
                }
            })
        })

        return {
            vehicleObjects,
            planetObjects,
        }
    }

    useEffect(() => {
        if (_.isEmpty(selectedPlanets)) return
        //setting the global object
        let newSelectedPlanets = []
        Object.keys(selectedPlanets).forEach((key) => {
            newSelectedPlanets.push(selectedPlanets[key])
        })
        //push the latest planet selected as well

        handleSelectPlanet(newSelectedPlanets)
    }, [selectedPlanets])

    useEffect(() => {
        if (_.isEmpty(selectedVehicles)) return
        const response = getPlanetVehicleData()

        calculateTravellingTime(response.planetObjects, response.vehicleObjects, setTotalTime)

    }, [selectedVehicles])

    //disable untill all 4 planets and 4 vehicles are selected
    const submitDisabled = () => {
        if (Object.keys(selectedVehicles).length < 4 || Object.keys(selectedVehicles).length < 4) {
            return true
        }
        return false
    }

    useEffect(() => {
        if (accessToken === "") return
        const response = getPlanetVehicleData()
        console.log(response)
        const planetNames = response.planetObjects.map(planet => {
            return planet.name
        })
        const vehicleNames = response.vehicleObjects.map(vehicle => {
            return vehicle.name
        })
        //if access token obtained
        handlePostQuery("FF", vehicleNames, planetNames)

    }, [accessToken])

    const findFalcone = () => {
        handlePostQuery("GT") //get token and  fetch results
    }

    return (
        <div className="w-full p-2 flex justify-center flex-col items-center">
            <div className="rounded rounded-sm bg-gray-300 p-4">
                <div className="px-2 py-2 text-gray-800 flex justify-center items-center flex-col">
                    <h2 className="text-xl"> Find Falcone ! </h2>
                    <p className="text-xs font-bold mt-2"> Help King Shan <span role="img" aria-label="kingshan">🦅</span> </p>
                </div>
                <div className="border-t-2 border-indigo-400 mt-2 flex justify-between items-center">
                    <h5 className="text-gray-500 font-bold text-sm  ml-2">Select Planet To Search For Falcone</h5>
                    <h5 className="text-green-800 mr-2 font-bold text-sm  ml-2">Estimated Time  -  {totalTime} Sec</h5>

                </div>
                <div className="flex justify-around  flex-wrap items-center">
                    {
                        configs.numPlanetCanVisit.map((num, idx) => {
                            return (
                                <div key={idx}>
                                    <PlanetCard
                                        selectedVehicles={selectedVehicles} setSelectedVehicles={setSelectedVehicles}
                                        planets={planets} vehicles={vehicles} selectedPlanets={selectedPlanets} setSelectedPlanets={setSelectedPlanets} cardNumber={idx} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <button onClick={findFalcone} title={submitDisabled() ? "Cannot Find Please Select All 4 Planets" : "Find Falcone"} disabled={submitDisabled()} className={`hover:shadow-outline px-4 py-4 text-center bg-gray-800  focus:shadow-outline text-white border-0 rounded rounded-sm ${submitDisabled() ? "opacity-75 cursor-not-allowed" : ""}`}>Find Falcone</button>
            </div>
        </div>
    )
}


export default MainSection;