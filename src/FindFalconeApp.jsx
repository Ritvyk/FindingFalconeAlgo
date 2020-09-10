import React, { useContext, useState } from 'react'
import Header from './components/Header';
import MainSection from './components/MainSection';
import FalconeAPIContext from './app_data_providers/FalconeAPIProvider';
import Footer from './components/Footer';
import _ from "lodash"

import ResultScreen from './components/ResultScreen';

function FindFalconeApp() {
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


    return (
        <div className="w-full h-full bg-gray-200">
            <Header />
            {/* main section */}
            <div className="flex justify-center items-center h-full w-full">
                {_.isEmpty(finalResponse) ? <MainSection /> : <ResultScreen totalTime={totalTime} refetch={refetchAndSetResources} result={finalResponse} setFinalResponse={setFinalResponse} />}
            </div>
            <Footer />
        </div>
    )
}


export default FindFalconeApp;