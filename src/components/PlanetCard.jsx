import React, { useState, useContext, useEffect } from 'react'
import FalconeAPIContext from '../app_data_providers/FalconeAPIProvider';
import _ from "lodash"

export default function PlanetCard({
    selectedPlanets,
    selectedVehicles, setSelectedVehicles,
    setSelectedPlanets, cardNumber
}) {

    const [
        planets,
        vehicles,
        accessToken,
        setAccessToken,
        finalResponse,
        handlePostQuery,
        handleSelectPlanet,
        handleSelectVehicle
    ] = useContext(FalconeAPIContext)

    const [planetCardDetails, setPlanetCardDetails] = useState({
        planetName: "",
        planetId: "",
        vehicleName: "",
        vehicleId: "",
    })
    const selectPlanet = (e) => {
        const cardNumber = e.target.name
        const planetId = e.target.value

        //setting local state for selectedPlanets
        setSelectedPlanets({
            ...selectedPlanets,
            ["planet" + cardNumber]: planetId
        }
        )

        setPlanetCardDetails({
            ...planetCardDetails,
            planetName: _.filter(planets, (planet => {
                return planet.id === planetId
            }))[0].name,
            planetId: planetId
        })
    }

    const selectVehicle = (e) => {
        const vehicleId = e.target.dataset.vehicleid
        const vehicleName = e.target.dataset.vehiclename

        if (vehicleId !== planetCardDetails.vehicleId) {
            handleSelectVehicle({
                delta: -1,
                vehicleId: vehicleId,
                planetId: planetCardDetails.planetId,
                prevVehicleId: planetCardDetails.vehicleId
            })
        }

        setPlanetCardDetails({
            ...planetCardDetails,
            vehicleId: vehicleId,
            vehicleName: vehicleName
        })

        setSelectedVehicles({
            ...selectedVehicles,
            ["planet" + cardNumber]: vehicleId
        }
        )

    }

    //check if the planet is selected within 4 cards , if true --> disable else show option
    const checkIfSelected = (planetId) => {
        let isSelected = false
        Object.keys(selectedPlanets).forEach(key => {
            if (selectedPlanets[key] === planetId) {
                isSelected = true
            }
        })

        return isSelected
    }

    //check if vehicle can reach the planet or not
    const checkIfInReach = (vehicleId) => {
        let canReach = true
        let totalVehicles = 0
        const destPlanet = _.filter(planets, (planet) => {
            return planet.id === planetCardDetails.planetId
        })[0]
        vehicles.forEach(vehicle => {
            if (vehicle.id === vehicleId) {
                if (vehicle.max_distance < destPlanet.distance) {
                    canReach = false
                }
                if (vehicle.total_no === 0 && planetCardDetails.vehicleId !== vehicleId) {
                    canReach = false
                }
            }
        })

        return canReach
    }

    const markChecked = (vehicleId) => {
        if (planetCardDetails.vehicleId === vehicleId) {
            return true
        }
        else {
            return false
        }
    }



    return (
        <div className="p-4 rounded rounded-sm border border-gray-400 ml-2 ">
            <div className="mb-2 mt-2">
                <p className="text-center font-bold text-xl text-gray-600">{_.startCase(planetCardDetails.planetName)}</p>
            </div>
            <div className="mt-2 mb-2 ">
                <div className="inline-block relative w-64">
                    <select
                        name={cardNumber}
                        onChange={selectPlanet} value={planetCardDetails.planetId} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Select</option>
                        {planets.map((planet, idx) => {
                            return (
                                <option disabled={checkIfSelected(planet.id)} className={`bg-white text-gray-800 ${planet.isSelected ? "bg-gray-600" : ""}`} key={planet.id} id={planet.id} value={planet.id}>{_.startCase(planet.name)}</option>
                            )
                        })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
            {
                planetCardDetails.planetName !== "" && <div className="">
                    <p className="text-xs font-bold text-center mt-2 text-gray-800">Select Vehicle</p>
                    <div className="mt-2">
                        <ul className="list-none">
                            {vehicles.map((vehicle, idx) => {
                                return (
                                    <li key={idx} className="text-gray-600 flex justify-start items-center">
                                        <label className="flex items-center">
                                            {<input data-vehicleid={vehicle.id} data-vehiclename={vehicle.name} data-cardnumber={cardNumber} onChange={selectVehicle} checked={markChecked(vehicle.id)} disabled={!checkIfInReach(vehicle.id)} type="checkbox" className="form-checkbox" />}
                                            <span className={`ml-2 ${checkIfInReach(vehicle.id) ? "" : "line-through"}`}>{_.startCase(vehicle.name)} <span className="text-indigo-600  font-bold text-xs">({vehicle.total_no})</span> </span>
                                            {!checkIfInReach(vehicle.id) && <span className="ml-2 text-xs">{vehicle
                                                .total_no === 0 ? <span className="bg-gray-400 text-gray-800 px-1 py-1">Not Available</span> : <span className="text-red-400 bg-red-200 px-1 py-1">Unreachable</span>}</span>}
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }

        </div>
    )
}
