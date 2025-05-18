package com.servletdemo.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

@WebServlet("/ajax-form")
public class AjaxFormServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get form parameters
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        
        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        
        if (name == null || name.isEmpty() || email == null || email.isEmpty()) {
            jsonResponse.put("success", false);
jsonResponse.put("message", "Name and email are required");
        } else {
            jsonResponse.put("success", true);
            jsonResponse.put("message", "Form submitted successfully");
            
            // Create data object
            JSONObject data = new JSONObject();
            data.put("name", name);
            data.put("email", email);
            data.put("timestamp", System.currentTimeMillis());
            
            jsonResponse.put("data", data);
        }
        
        // Send JSON response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(jsonResponse.toJSONString());
        out.flush();
    }
}