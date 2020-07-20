let dbPromised = idb.open("epl-info", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite")) {
        upgradeDb.createObjectStore("favorite");
    }
});

const addFavoriteTeam = (team) => {
    dbPromised
    .then(db => {
        const tx = db.transaction("favorite", "readwrite");
        const store = tx.objectStore("favorite");
        const item = team;
        console.log(item);
        store.put(item, team.id);
        return tx.complete;
    })
    .then(() => {
        console.log("Succesfully added!");
    })
    .catch(e => {
        console.log(e);
    });
}

const getAll = () => {
    return new Promise ((resolve, reject) => {
        dbPromised
        .then(db => {
            const tx = db.transaction("favorite", "readonly");
            const store = tx.objectStore("favorite");
            return store.getAll();
        })
        .then(data => resolve(data));
    })
}

const getById = id => {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("favorite", "readonly");
            var store = tx.objectStore("favorite");
            return store.get(id);
        })
        .then(data => resolve(data));
    });
}

const deleteFavoriteTeam = id => {
    dbPromised
    .then(db => {
        const tx = db.transaction("favorite", "readwrite");
        const store = tx.objectStore("favorite");
        store.delete(parseInt(id));
        return tx.complete;
    }).then(() => console.log(`Successfully Deleted!`))
}