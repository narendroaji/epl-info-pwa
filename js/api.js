const BASE_URL = 'https://api.football-data.org/v2';
const PREMIER_LEAGUE = `2021`;
const OPTIONS = {
    headers: {
        'X-Auth-Token': 'f9f27c8e03f444149eba13c8f6868f2b',
    }
};

const addZero = number => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}

const status = response => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}

const error = error => {
    console.log(`ERROR: ${error}`);
}

const getTeams = () => {
    if ('caches' in window) {
        caches.match(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/teams`)
        .then(response => {
            if (response) {
                response.json()
                .then(data => {
                    showTeams(data);
                })
            }
        })
    }

    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/teams`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showTeams(data);
    })
    .catch(error);
}

const getTeamById = () => {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(`${BASE_URL}/teams/${idParam}`)
            .then(response => {
                if (response) {
                    response.json()
                    .then(data => {
                        showTeamById(data);
                        resolve(data);
                    })
                }
            })
        }

        fetch(`${BASE_URL}/teams/${idParam}`, OPTIONS)
        .then(status)
        .then(json)
        .then(data => {
            showTeamById(data);
            resolve(data)
        })
        .catch(error);
    })
}

const getUpcomingMatchesByTeamId = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    let yearNow = moment().get('year');
    let monthNow = (moment().get('month')) + 1;
    let dateNow = moment().get('date');
    let dateFrom = `${yearNow}-${addZero(monthNow)}-${addZero(dateNow)}`;
    
    let limit = moment().add(14, 'days');
    let limitYear = limit.get('year');
    let limitMonth = (limit.get('month')) + 1;
    let limitDate = limit.get('date');
    let dateTo = `${limitYear}-${addZero(limitMonth)}-${addZero(limitDate)}`;

    if ('caches' in window) {
        caches.match(`${BASE_URL}/teams/${idParam}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(response => {
            if (response) {
                response.json()
                .then(data => {
                    showUpcomingMatchesByTeamId(data);
                })
            }
        })
    }

    fetch(`${BASE_URL}/teams/${idParam}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showUpcomingMatchesByTeamId(data);
    })
    .catch(error);
}

const getStandings = () => {
    if ('caches' in window) {
        caches.match(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/standings?standingType=TOTAL`)
        .then(response => {
            if (response) {
                response.json()
                .then(data => {
                    showStandings(data);
                })
            }
        })
    }

    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/standings?standingType=TOTAL`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showStandings(data);
    })
    .catch(error);
}

const getScorers = () => {
    if ('caches' in window) {
        caches.match(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/scorers`)
        .then(response => {
            if (response) {
                response.json()
                .then(data => {
                    showScorers(data);
                })
            }
        })
    }

    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/scorers`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showScorers(data);
    })
    .catch(error);
}

const getUpcomingMatches = () => {    
    let yearNow = moment().get('year');
    let monthNow = (moment().get('month')) + 1;
    let dateNow = moment().get('date');
    let dateFrom = `${yearNow}-${addZero(monthNow)}-${addZero(dateNow)}`;
    
    let limit = moment().add(14, 'days');
    let limitYear = limit.get('year');
    let limitMonth = (limit.get('month')) + 1;
    let limitDate = limit.get('date');
    let dateTo = `${limitYear}-${addZero(limitMonth)}-${addZero(limitDate)}`;

    if ('caches' in window) {
        caches.match(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then(response => {
            if (response) {
                response.json()
                .then(data => {
                    showUpcomingMatches(data);
                })
            }
        })
    }

    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showUpcomingMatches(data);
    })
    .catch(error);
}

const getFavoriteTeams = () => {
    getAll()
    .then(favorite => {
        showFavoriteTeams(favorite);
    });
}

const getFavoriteTeamsById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam)
    .then(data => {
        getTeamById(data);
    });
}