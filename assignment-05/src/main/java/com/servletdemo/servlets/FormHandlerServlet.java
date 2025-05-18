package com.servletdemo.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/form-handler")
public class FormHandlerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Start time for performance measurement
        long startTime = System.currentTimeMillis();
        
        // Get form parameters
        String name = request.getParameter("name");
        if (name == null || name.isEmpty()) {
            name = "Guest";
        }
        
        String email = request.getParameter("email");
        if (email == null || email.isEmpty()) {
            email = "Not provided";
        }
        
        // End time for performance measurement
        long endTime = System.currentTimeMillis();
        long processingTime = endTime - startTime;
        
        // Set content type
        response.setContentType("text/html");
        
        // Get writer
        PrintWriter out = response.getWriter();
        
        // Write HTML response
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Servlet Form Handler</title>");
        out.println("<link rel='stylesheet' href='css/style.css'>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='container'>");
        out.println("<h1>Servlet Form Processing</h1>");
        out.println("<div class='result'>");
        out.println("<h2>Form Data Received:</h2>");
        out.println("<p><strong>Name:</strong> " + name + "</p>");
        out.println("<p><strong>Email:</strong> " + email + "</p>");
        out.println("<p><strong>Processing Time:</strong> " + processingTime + " ms</p>");
        out.println("</div>");
        out.println("<p><a href='index.html'>Back to Home</a></p>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doPost(request, response);
    }
}