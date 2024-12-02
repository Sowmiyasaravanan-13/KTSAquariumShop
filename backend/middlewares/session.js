const session = require('express-session');

app.use(session({
  secret: 'sk_test_51PmBBDLKF6cjSrz9RDrWZdzdWbLqUEZ4PdfZ1YBjsBYOsZgq9xuwQvJReRpdl9h0m227VgvPa85fKnyQSCLpEJnZ00mt1D6KWu', // change this to a secure secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // change to true if using HTTPS
}));
