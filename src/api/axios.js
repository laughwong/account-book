import axios from 'axios'

const http = axios.create({
    timeout: 180
})

http.interceptors.request.use(
    function (config) {
        return config
    }
)
http.interceptors.response.use()

export default http