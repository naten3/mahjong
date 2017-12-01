import {Express } from 'express'
import {IndexRoute} from './index.server.route'

export function startRoutes(app: Express) {
  new IndexRoute(app);
}
