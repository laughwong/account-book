import http from './axios'

export const getCategory = async function () {
    return await http.get("/api/backend/index.php?type=1");
}

export const getList = async function () {
    return await http.get("/api/backend/index.php?type=2");
}

export const setData = function () {
    console.log('set data')
}

