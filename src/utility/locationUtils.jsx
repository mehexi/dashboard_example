export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
        } else {
            const options = {
                enableHighAccuracy: true,         
                maximumAge: 0  
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position)
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            reject(new Error("User denied the request for Geolocation."));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error("Location information is unavailable."));
                            break;
                        case error.TIMEOUT:
                            reject(new Error("The request to get user location timed out."));
                            break;
                        case error.UNKNOWN_ERROR:
                        default:
                            reject(new Error("An unknown error occurred."));
                            break;
                    }
                },
                options // Pass the options parameter here
            );
        }
    });
};
