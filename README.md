# sudoku-api
 
## Overview
- POST endpoint for solving 9x9 sudoku written using JavaScript, Node.js and Express.js. In-memory caching has been implemented using Redis in order to avoid 
re-computing sudoku boards which have been encountered before. Currently, the default Redis "noeviction policy" is used but for a production setting, an 
LRU eviction policy will be more appropriate.

- The Sudoku solver picks a number for each cell that doesn’t violate the row, column and sub-grid constraints imposed by Sudoku and backtracks upon encountering an
invalid Sudoku board configuration. This approach significantly reduced the search space as compared to a brute force algorithm that checks all 9^81 possible 
configurations for a 9x9 Sudoku board, many of which can be determined to be invalid early into the search.

## Usage
The input board needs to be specified in the POST request as a JSON object with a "board" field and a string value which consists of the sudoku board in the form 
of comma separated characters. For example - 
curl --header 'content-type: application/json' localhost:3000/solve-sudoku --data '{"board":"0, 2, 0, 0, 9, 0, 1, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 1, 9, 0, 4, 0, 0, 0, 0, 0, 0, 6, 0, 5, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 8, 5, 4, 9, 0, 0, 3, 0, 0, 0, 0"}'

The endpoint returns a JSON object with 3 fields - "hasSolution", "solvedBoard" and "numBacktracks". For example the response to the above request is - 
{"hasSolution":true,"solvedBoard":"5, 2, 4, 3, 9, 6, 1, 7, 8, 3, 6, 7, 8, 4, 1, 9, 5, 2, 1, 8, 9, 7, 5, 2, 3, 6, 4, 2, 5, 1, 9, 7, 4, 8, 3, 6, 9, 4, 3, 6, 8, 5, 2, 1, 7, 8, 7, 6, 2, 1, 3, 5, 4, 9, 6, 1, 5, 4, 2, 8, 7, 9, 3, 7, 3, 2, 1, 6, 9, 4, 8, 5, 4, 9, 8, 5, 3, 7, 6, 2, 1","numBacktracks":17034}

** curl-commands.txt file contains curl commands that can be used to test the endpoint. **

## Examples

1)curl --header 'content-type: application/json' localhost:3000/solve-sudoku --data '{"board":"0, 2, 0, 0, 9, 0, 1, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 1, 9, 0, 4, 0, 0, 0, 0, 0, 0, 6, 0, 5, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 8, 5, 4, 9, 0, 0, 3, 0, 0, 0, 0"}'

| Cache Miss                                                                                                                                                      | Cache Hit                                                                                                                                                     | 
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/arjnbli/project-media/blob/6a57dd95163ecd6bb7b4440c5e13bd1160fd570e/sudoku-api/first_board_computed.png" alt="drawing" width="300"/>|<img src="https://github.com/arjnbli/project-media/blob/6a57dd95163ecd6bb7b4440c5e13bd1160fd570e/sudoku-api/first_board_cached.png" alt="drawing" width="300"/>|

| Endpoint Response                                                                                                                                               |
------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/arjnbli/project-media/blob/558617c5f143e2318fa4ab16cc6416f6511e8b15/sudoku-api/first_board_response.png" alt="drawing" height="40"/>|




2)curl --header 'content-type: application/json' localhost:3000/solve-sudoku --data '{"board":"7, 8, 0, 4, 0, 0, 1, 2, 0, 6, 0, 0, 0, 7, 5, 0, 0, 9, 0, 0, 0, 6, 0, 1, 0, 7, 8, 0, 0, 7, 0, 4, 0, 2, 6, 0, 0, 0, 1, 0, 5, 0, 9, 3, 0, 9, 0, 4, 0, 6, 0, 0, 0, 5, 0, 7, 0, 3, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 7, 4, 0, 0, 0, 4, 9, 2, 0, 6, 0, 0, 7"}'

| Cache Miss                                                                                                                                                       | Cache Hit                                                                                                                                                      | 
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/arjnbli/project-media/blob/558617c5f143e2318fa4ab16cc6416f6511e8b15/sudoku-api/second_board_computed.png" alt="drawing" width="300"/>|<img src="https://github.com/arjnbli/project-media/blob/558617c5f143e2318fa4ab16cc6416f6511e8b15/sudoku-api/second_board_cached.png" alt="drawing" width="300"/>|

| Endpoint Response                                                                                                                                                |
-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/arjnbli/project-media/blob/3f2013dbbb8d67033f3f657f765948645fca133e/sudoku-api/second_board_response.png" alt="drawing" height="40"/>|


3)curl --header 'content-type: application/json' localhost:3000/solve-sudoku --data '{"board":"5, 3, 8, 0, 1, 0, 0, 0, 0, 0, 7, 9, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 2, 3, 4, 0, 0, 0, 0, 5, 0, 8, 0, 0, 0, 9, 4, 6, 0, 0, 9, 0, 0, 0, 1, 0, 9, 0, 2, 3, 4, 1, 5, 0, 0, 4, 1, 5, 0, 0, 2, 0, 0, 0, 0, 0, 8, 6, 1, 0, 3, 0"}'

| Cache Miss                                                                                                                                                       | Cache Hit                                                                                                                                                      | 
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/arjnbli/project-media/blob/3f2013dbbb8d67033f3f657f765948645fca133e/sudoku-api/third_board_computed.png" alt="drawing" width="300"/> |<img src="https://github.com/arjnbli/project-media/blob/3f2013dbbb8d67033f3f657f765948645fca133e/sudoku-api/third_board_cached.png" alt="drawing" width="300"/> |

| Endpoint Response                                                                                                                                               |
------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/arjnbli/project-media/blob/60c7d4cbc3464575c8ba5c1f7628b7a7b83dbb92/sudoku-api/third_board_response.png" alt="drawing" height="40"/>|


## Performance
Testing locally, the response time when sudoku board solutions were computed from scratch was observed to be in the 5ms - 120ms range depending upon the 
difficulty of the board. However, for cache hits, the response time was observed to be in the 5-10ms range consistently.
