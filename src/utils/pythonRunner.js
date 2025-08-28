const { spawn } = require('child_process');

// Runs a python script with JSON stdin; expects JSON on stdout
function runPython(scriptPath, payload) {
  return new Promise((resolve, reject) => {
    const py = spawn('python', [scriptPath]);
    let stdout = '';
    let stderr = '';

    py.stdout.on('data', (d) => { stdout += d.toString(); });
    py.stderr.on('data', (d) => { stderr += d.toString(); });

    py.on('error', reject);
    py.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python exited ${code}: ${stderr}`));
      }
      try {
        const json = JSON.parse(stdout);
        resolve(json);
      } catch (e) {
        reject(new Error(`Invalid JSON from python: ${stdout}\n${stderr}`));
      }
    });

    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();
  });
}

module.exports = { runPython };


