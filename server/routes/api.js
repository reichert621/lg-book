import * as prompts from '../controllers/prompts'
import * as goals from '../controllers/goals'
import * as entries from '../controllers/entries'
import * as fb from '../controllers/fb'

export function routes (app) {
  app.get('/api/prompts', prompts.list);
  app.post('/api/prompts', prompts.create);
  // app.get('/api/prompts/:id', prompts.show);
  app.put('/api/prompts/:id', prompts.update);
  app.delete('/api/prompts/:id', prompts.destroy);

  app.get('/api/goals', goals.list);
  app.post('/api/goals', goals.create);
  // app.get('/api/goals/:id', goals.show);
  app.put('/api/goals/:id', goals.update);
  app.delete('/api/goals/:id', goals.destroy);

  app.get('/api/entries', entries.list);
  // app.post('/api/entries', entries.create);
  app.get('/api/entries/:dateId', entries.show);
  app.put('/api/entries/:id', entries.update);

  app.get('/api/fb', fb.verify);

};

