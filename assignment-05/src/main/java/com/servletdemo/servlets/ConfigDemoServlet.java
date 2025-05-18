package com.servletdemo.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;

public class ConfigDemoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    private String username;
    private String password;
    private String dbDriver;
    private String dbURL;
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        
        // Get servlet-specific init parameters from ServletConfig
        username = config.getInitParameter("username");
        password = config.getInitParameter("password");
        
        // Get application-wide context parameters from ServletContext
        ServletContext context = getServletContext();
        dbDriver = context.getInitParameter("dbDriver");
        dbURL = context.getInitParameter("dbURL");
        
        // Store a value in ServletContext to be shared across servlets
        context.setAttribute("appStartTime", System.currentTimeMillis());
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get the shared attribute from ServletContext
        ServletContext context = getServletContext();
        Long appStartTime = (Long) context.getAttribute("appStartTime");
        long uptime = System.currentTimeMillis() - appStartTime;
        
        // Set content type
        response.setContentType("text/html");
        
        // Get writer
        PrintWriter out = response.getWriter();
        
        // Write HTML response
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>ServletConfig & ServletContext Demo</title>");
        out.println("<link rel='stylesheet' href='css/style.css'>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='container'>");
        out.println("<h1>ServletConfig & ServletContext Demo</h1>");
        
        out.println("<h2>ServletConfig Parameters (Servlet-specific)</h2>");
        out.println("<ul>");
        out.println("<li><strong>Username:</strong> " + username + "</li>");
        out.println("<li><strong>Password:</strong> " + password + "</li>");
        out.println("</ul>");
        
        out.println("<h2>ServletContext Parameters (Application-wide)</h2>");
        out.println("<ul>");
        out.println("<li><strong>Database Driver:</strong> " + dbDriver + "</li>");
        out.println("<li><strong>Database URL:</strong> " + dbURL + "</li>");
        out.println("</ul>");
        
        out.println("<h2>Shared Data in ServletContext</h2>");
        out.println("<p><strong>Application Uptime:</strong> " + (uptime / 1000) + " seconds</p>");
        
        out.println("<p><a href='index.html'>Back to Home</a></p>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}