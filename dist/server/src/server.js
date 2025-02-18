import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import routes from './routes/api/index';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// TODO: Serve static files of entire client dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Implement middleware to connect the routes
app.use('/api', routes);
// Catch-all route to serve the client’s index.html
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
