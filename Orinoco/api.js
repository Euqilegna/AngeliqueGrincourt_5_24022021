class CameraApi {

    apiUrl
    constructor() {
        this.apiUrl = "http://localhost:3000/api/cameras"
    }

    getAll() {

        fetch(this.apiUrl, {
            method: 'GET',
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}
