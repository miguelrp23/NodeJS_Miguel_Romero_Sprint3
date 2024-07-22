const http = require('http');
const bl = require('bl');

// Mocking http module
jest.mock('http');

describe('HTTP GET Request Test', () => {
  it('should print the received data', (done) => {
    const mockUrl = 'http://www.example.com'; // Simulated URL for testing

    // Mock implementation of the response object
    const mockResponse = {
      pipe: jest.fn((stream) => {
        stream.write(Buffer.from('simulated data'));
        stream.end();
      })
    };

    // Mock implementation of http.get
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      callback(mockResponse); // Call the callback with the simulated response
      return {
        on: jest.fn(),
      } as any;
    });

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Spy on console.log

    process.argv[2] = mockUrl; // Simulate URL in process.argv

    // Require the module being tested
    require('./app');

    // Wait a sufficient time to process asynchronous operations
    setTimeout(() => {
      // Check that console.log was called with the expected data length
      expect(logSpy).toHaveBeenCalledWith('simulated data'.length);
      // Check that console.log was called with the expected data
      expect(logSpy).toHaveBeenCalledWith('simulated data');
      done(); // Indicate that the test has finished successfully
    }, 100);
  });
});
