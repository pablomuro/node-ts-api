import api from './api';
import logger from './utils/logger'

const port = process.env.PORT || '8000';

api.connectDatabase().then(async () => {
  api.express.listen(port, err => {
    if (err) return console.error(err);
    logger.info(`Server is listening on ${port}`);
    return console.log(`Server is listening on ${port}`);
  });

}).catch(error => {
  logger.error(error);
  console.log(error)
});
