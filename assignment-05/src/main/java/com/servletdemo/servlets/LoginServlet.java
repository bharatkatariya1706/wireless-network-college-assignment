package com.servletdemo.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Forward to login form
        RequestDispatcher dispatcher = request.getRequestDispatcher("/login.jsp");
        dispatcher.forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get form parameters
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Simple validation (in a real app, check against database)
        if ("admin".equals(username) && "password".equals(password)) {
            // Create a session and store username
            HttpSession session = request.getSession();
            session.setAttribute("username", username);
            
            // Forward to welcome servlet
            RequestDispatcher dispatcher = request.getRequestDispatcher("/welcome");
            dispatcher.forward(request, response);
        } else {
            // Set error message as request attribute
            request.setAttribute("errorMessage", "Invalid username or password");
            
            // Forward back to login page
            RequestDispatcher dispatcher = request.getRequestDispatcher("/login.jsp");
            dispatcher.forward(request, response);
        }
    }
}