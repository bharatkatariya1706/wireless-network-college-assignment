<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Protected Page - Servlet Demo</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="container">
        <h1>Protected Page</h1>
        
        <p>This is a protected page that can only be accessed by authenticated users.</p>
        <p>If you can see this page, it means you are logged in as: <strong><%= session.getAttribute("username") %></strong></p>
        
        <p><a href="../index.html">Back to Home</a></p>
    </div>
</body>
</html>