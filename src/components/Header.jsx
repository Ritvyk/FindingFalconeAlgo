import React from 'react'

import rocketLogo from "../imgs/rocket.png"

function Header() {
    return (
        <div className="w-full h-12  bg-black px-2 py-2 text-white flex justify-between items-center">
            <div className="flex justify-center items-center">
                <div className="w-8 h-8">
                    <img src={rocketLogo} className="w-full h-full" alt="Rocket" />
                </div>
                <h3 className="ml-2 font-bold">Finding Falcone!</h3>
            </div>
            {/* Header RightSide Div */}
            <div className="flex justify-center items-center text-xs font-bold">
                <a href="https://geektrust.in" target="_blank" className="text-white font-bold  ">Geektrust</a>
            </div>
        </div>
    )
}

export default Header;
