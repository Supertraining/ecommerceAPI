import { routeLogger } from '../../utils/logger.js'

const nonExistentRoute = ((req, res, next) => {
  res.status(404).json({ error: 'Nonexistent Route' });
	routeLogger(req, 'warn')
});

export default nonExistentRoute;