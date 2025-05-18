#!/usr/bin/env python
import cgi
import cgitb
import time

# Enable CGI error reporting
cgitb.enable()

# Start time for performance measurement
start_time = time.time()

# Print HTTP headers
print("Content-Type: text/html")
print()

# Get form data
form = cgi.FieldStorage()
name = form.getvalue("name", "Guest")
email = form.getvalue("email", "Not provided")

# End time for performance measurement
end_time = time.time()
processing_time = (end_time - start_time) * 1000  # Convert to milliseconds

# Generate HTML response
print("""
<!DOCTYPE html>
<html>
<head>
    <title>CGI Form Handler</title>
    <link rel="stylesheet" href="../src/main/webapp/css/style.css">
</head>
<body>
    <div class="container">
        <h1>CGI Form Processing</h1>
        <div class="result">
            <h2>Form Data Received:</h2>
            <p><strong>Name:</strong> {}</p>
            <p><strong>Email:</strong> {}</p>
            <p><strong>Processing Time:</strong> {:.2f} ms</p>
        </div>
        <p><a href="../src/main/webapp/index.html">Back to Home</a></p>
    </div>
</body>
</html>
""".format(name, email, processing_time))