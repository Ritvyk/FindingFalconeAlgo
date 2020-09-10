export const configs = {

    planets: "https://findfalcone.herokuapp.com/planets",

    vehicles: "https://findfalcone.herokuapp.com/vehicles",

    postURLS: {
        getToken: "https://findfalcone.herokuapp.com/token",
        findFalcone: "https://findfalcone.herokuapp.com/find",
        config: {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
    },
    numPlanetCanVisit: [1, 2, 3, 4]

}

export const reactQueryConfigurations = {
    refetchOnWindowFocus: false
}

