export default class APIService {
    static scoresAPIFunction(body){
        return fetch(`https://eope3o6d7z7e2cc.m.pipedream.net`, {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
    .then(resp => resp.json())
    }

    
}