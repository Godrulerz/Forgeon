const logger = (req, res, next) => {
  const startTimeMs = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTimeMs;
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;
    console.log(`[${new Date().toISOString()}] ${method} ${url} ${status} - ${durationMs}ms`);
  });

  next();
};

module.exports = logger;


