export default class APIService {
    static scoresAPIFunction(body){
        return fetch(`https://eope3o6d7z7e2cc.m.pipedream.net`, {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => console.log(resp))
    }

    static retrievePlayer(id){
        return fetch(`http://127.0.0.1:5000/getPlayer/${id}`, {
            'method':'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resp => resp.json())
        //.then(resp => console.log(resp))
        .catch(error => console.log(error))
    }

}