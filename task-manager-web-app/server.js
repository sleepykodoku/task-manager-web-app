import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import taskRoutes from './routes/taskRoutes.js';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Configure EJS
app.use(methodOverride('_method'));
app.engine('html', (await import('ejs')).renderFile);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use task routes
app.use('/', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
