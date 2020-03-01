import jwt from 'jsonwebtoken'

export default {
  verifyUser: async req => {
    const bearerHeader = req.headers.authorization
    // req.email = null
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      return new Promise(resolve => {
        jwt.verify(token, 'SECRET', (err, decoded) => {
          if (err) return resolve(null)
          return resolve({ ...decoded })
        })
      })
    }
    return null
  }
}
