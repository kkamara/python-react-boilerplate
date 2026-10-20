import HttpService from "./HttpService"

export const RegisterUserService = (data) => {
  const http = new HttpService()
  return http.postData("/users/register", data)
    .then((response) => {
      return response.data
    })
    .catch(err => { throw err })
}

export const LoginUserService = (credentials) => {
  const http = new HttpService()
  const accessTokenId = "access-token"
  const refreshTokenId = "refresh-token"
  
  return http.postData("/users/login", credentials)
    .then(response => {
      localStorage.setItem(accessTokenId, response.data.data.access)
      localStorage.setItem(refreshTokenId, response.data.data.refresh)
      return response.data
    })
    .catch(err => { throw err })
}

export const AuthoriseUserService = () => {
  const http = new HttpService()
  const tokenId = "access-token"
  
  return http.getData("/users/authorise", tokenId)
    .then(response => {
      return response.data
    })
    .catch(err => { throw err })
}

export const LogoutUserService = () => {
  const http = new HttpService()
  const accessTokenId = "access-token"
  const refreshTokenId = "refresh-token"
  const refreshToken = localStorage.getItem(refreshTokenId)
  return http.postData(
    "/users",
    { refresh: refreshToken },
    accessTokenId,
  )
    .then((response) => {
      if (null !== localStorage.getItem(accessTokenId)) {
        localStorage.removeItem(accessTokenId)
      }
      if (null !== localStorage.getItem(refreshTokenId)) {
        localStorage.removeItem(refreshTokenId)
      }
      window.location = "/user/login"
      return response.data
    })
    .catch(err => { throw err })
}