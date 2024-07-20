import { mock_users } from './constants.mjs'

export const resolveUserMiddleware = (req, res, next) => {
  const parsedId = parseInt(req.params.id)

  if (isNaN(parsedId)) return res.sendStatus(400)

  const userIdx = mock_users.findIndex((user) => user.id === parsedId)
  if (userIdx === -1) return res.sendStatus(404)
  req.userIdx = userIdx
  next()
}
