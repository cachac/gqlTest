import jwt from 'jsonwebtoken'

export default {
  verifyUser: async req => {
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      return new Promise(resolve => {
        jwt.verify(token, 'SECRET', (err, decoded) => {
          console.log('token err: ', err)
          if (err) return resolve(null)
          console.log('decoded: ', decoded)
          resolve({ ...decoded })
        })
      })
    }
    return null
  }
}
