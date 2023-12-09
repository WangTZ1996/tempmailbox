import fetch from './request'

const apis = {
    randomEmailName: '/api/tempMail',
    emailList: '/api/emailList'
}

export const randomEmailName = () => {
    return fetch.post(apis.randomEmailName)
}

export const emilList = (emailName: string) => {
    return fetch.post(apis.emailList, { emailName: emailName })
}