document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get("id");
    const isFromSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const btnDelete = document.getElementById("delete");

    if (isFromSaved) {
        btnSave.style.display = 'none';
        let item = getFavoriteTeamsById();
        btnDelete.onclick = function() {
            console.log("Tombol delete ditekan.");
            deleteFavoriteTeam(teamId);
        }
    } else {
        btnDelete.style.display = 'none';
        let item = getTeamById();
        getUpcomingMatchesByTeamId();
        btnSave.onclick = function () {
            console.log("Tombol save ditekan.");
            item.then(function (team) {
                addFavoriteTeam(team);
            });
        }
    }
});