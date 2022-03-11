const SudokuSolver = require('./src/solver.js')
const { validateInput, displayBoard } = require('./lib/utils.js');

const express = require('express');
const morgan = require('morgan');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/solve-sudoku',(req, res, next) => {
    const boardString = req.body.board;
    if (!boardString) {
        return res.status(400).send('\nInvalid input\n');
    }
    if (!validateInput(boardString)) {
        return res.status(400).send('\nInvalid input\n')
    }
    req.boardString = boardString;
    next();
});

app.post('/solve-sudoku', async (req, res, next) => {
    try {
        //Search for the input board in cache first, if found return it
        const client = createClient();
        await client.connect();
        const cachedResponse = JSON.parse(await client.get(req.boardString));
        const solver = new SudokuSolver(req.boardString);
        if (cachedResponse) {
            client.quit();
            console.log('--------------------------------------');
            console.log('\n** Retrieved from cache **');
            console.log('\nGiven Board:\n');
            displayBoard(solver.sudokuBoard.boardString);
            console.log('\nSolved Board:\n');
            if (cachedResponse.hasSolution) {
                displayBoard(cachedResponse['solvedBoard']);
            } else {
                console.log('No Solution');
            }
            console.log('--------------------------------------');
            res.status(201).send('\n' + JSON.stringify(cachedResponse) + '\n');     
        //If the input board is not found in the cache, the solver calculates the solution.
        //The cache is updated and the response is sent
        } else {
            const solverOutput = solver.solve();
            if (solverOutput) {  
                await client.set(req.boardString, JSON.stringify(solverOutput));
                client.quit();
                res.status(201).send('\n' + JSON.stringify(solverOutput) + '\n');
            } else {
                res.status(500).send('\nInternal Error\n');
            }
        }
    //Passing any errors to express' error handler
    } catch(err) {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});