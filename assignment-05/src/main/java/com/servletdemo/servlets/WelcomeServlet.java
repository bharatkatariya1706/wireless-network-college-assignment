package com.servletdemo.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get parameters from the URL
        String name = request.getParameter("name");
        if (name == null || name.isEmpty()) {
            name = "Guest";
        }
        
        // Set content type
        response.setContentType("text/html");
        
        // Get writer
        PrintWriter out = response.getWriter();
        
        // Write HTML response
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Welcome Servlet</title>");
        out.println("<link rel='stylesheet' href='css/style.css'>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='container'>");
        out.println("<h1>Welcome to Java Servlets Demo</h1>");
        out.println("<h2>Hello, " + name + "!</h2>");
        
        // Display client request details
        out.println("<h3>Request Details:</h3>");
        out.println("<ul>");
        out.println("<li><strong>IP Address:</strong> " + request.getRemoteAddr() + "</li>");
        out.println("<li><strong>User-Agent:</strong> " + request.getHeader("User-Agent") + "</li>");
        out.println("<li><strong>Request Method:</strong> " + request.getMethod() + "</li>");
        out.println("<li><strong>Protocol:</strong> " + request.getProtocol() + "</li>");
        out.println("<li><strong>Server Name:</strong> " + request.getServerName() + "</li>");
        out.println("<li><strong>Server Port:</strong> " + request.getServerPort() + "</li>");
        out.println("</ul>");
        
        out.println("<p><a href='index.html'>Back to Home</a></p>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doGet(request, response);
    }
}