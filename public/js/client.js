(() => {

    window.onload = () => {
        myStorage = window.localStorage;
        if(myStorage.getItem('username') !== null) {
            console.log("username niet undefined")
            window.location.href = "/chat";
        }
    }

    console.log("client.js loaded.")

    var form = document.getElementById("form");
    var username = document.getElementById('username')

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        setUsername();
        window.location.href = "/chat";

    })

    function setUsername() {
        myStorage.setItem('username', username.value)
    }

})();