import jwt from 'jsonwebtoken'

export const verifyUser = req => {
  const bearerHeader = req.headers.authorization
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1]
    const payload = jwt.verify(token, 'SECRET')
    
  }
}
