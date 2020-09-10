import React from 'react'

export default function ResultScreen({ result, setFinalResponse, refetch, totalTime }) {
    return (
        <div>
            {result.status && result.status === "success" ?
                <div className="w-full  bg-white  p-4 border-2 border-gray-400 rounded rounded-sm">
                    <div className="text-gray-600 text-sm font-bold text-center">
                        <p className="text-center">Congratulations! Falcone Has Found , King Shan Is Mighty Pleased</p>
                    </div>
                    <div className="mt-4 flex text-sm text-gray-500 font-bold justify-center flex-col  items-center">
                        <p>Found on Planet  : {result.planet_name}</p>
                        <p className="mt-4">Total Time Took : <span className="text-indigo-500">{totalTime} Sec</span></p>
                    </div>
                </div> : <div className="p-4 text-center border-2 border-gray-400 bg-white rounded rounded-sm">
                    <p className="text-center text-red-600 text-xs font-bold">Falcone hasn't found on any of the chosen planets.</p>
                </div>
            }
            <div className="flex mt-4 justify-center items-center">
                <button className="px-2 py-2 bg-indigo-500 text-white border-0 rounded  rounded-sm" onClick={() => {
                    setFinalResponse({})
                    refetch()
                }}>Restart</button>
            </div>
        </div>
    )
}
