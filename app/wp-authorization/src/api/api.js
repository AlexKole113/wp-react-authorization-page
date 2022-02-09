class API {

    static apiHost = `http://localhost:10008/wp-json/`;
    static token = null;

    static authorization = ({username, password}) => fetch( API.apiHost + 'jwt-auth/v1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password} )
        })
        .then((r) => r.json())
        .then((response) => {
            if(response.token){
                API.token = response.token;
                localStorage.setItem('token', API.token )
            }
            return response;
        })

    static addPost = ({title, content}) => {
        const body = JSON.stringify({
            title,
            content,
            status: 'publish'
        })
        return fetch( API.apiHost + 'wp/v2/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + API.token
        },
        body
    }).then((r) => r.json())}
}
export default API;
