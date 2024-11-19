import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import settingsRoutes from './routes/settingsRoutes';
import workHoursRoutes from './routes/workHoursRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(settingsRoutes);
app.use(workHoursRoutes);

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

