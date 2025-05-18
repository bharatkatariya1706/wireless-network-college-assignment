package com.servletdemo.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Cookie;

@WebServlet("/session-demo")
public class SessionDemoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get or create session
        HttpSession session = request.getSession();
        
        // Check if this is a new session
        boolean isNewSession = session.isNew();
        
        // Get username from session or set default
        String username = (String) session.getAttribute("username");
        if (username == null) {
            username = "Guest";
            session.setAttribute("username", username);
        }
        
        // Handle theme preference (from parameter or cookie)
        String theme = request.getParameter("theme");
        if (theme != null && !theme.isEmpty()) {
            // Store theme in session
            session.setAttribute("theme", theme);
            
            // Store theme in cookie
            Cookie themeCookie = new Cookie("preferred_theme", theme);
            themeCookie.setMaxAge(60 * 60 * 24 * 30); // 30 days
            response.addCookie(themeCookie);
        } else {
            // Try to get theme from session
            theme = (String) session.getAttribute("theme");
            
            // If not in session, try to get from cookies
            if (theme == null) {
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if ("preferred_theme".equals(cookie.getName())) {
                            theme = cookie.getValue();
                            session.setAttribute("theme", theme);
                            break;
                        }
                    }
                }
            }
            
            // Default theme if not found
            if (theme == null) {
                theme = "light";
                session.setAttribute("theme", theme);
            }
        }
        
        // Set content type
        response.setContentType("text/html");
        
        // Get writer
        PrintWriter out = response.getWriter();
        
        // Write HTML response
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Session Management Demo</title>");
        out.println("<link rel='stylesheet' href='css/style.css'>");
        out.println("<style>");
        if ("dark".equals(theme)) {
            out.println("body { background-color: #333; color: #fff; }");
            out.println(".container { background-color: #444; }");
        }
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='container'>");
        out.println("<h1>Session Management Demo</h1>");
        
        out.println("<h2>Session Information</h2>");
        out.println("<ul>");
        out.println("<li><strong>Session ID:</strong> " + session.getId() + "</li>");
        out.println("<li><strong>New Session:</strong> " + isNewSession + "</li>");
        out.println("<li><strong>Creation Time:</strong> " + new java.util.Date(session.getCreationTime()) + "</li>");
        out.println("<li><strong>Last Accessed Time:</strong> " + new java.util.Date(session.getLastAccessedTime()) + "</li>");
        out.println("<li><strong>Max Inactive Interval:</strong> " + session.getMaxInactiveInterval() + " seconds</li>");
        out.println("</ul>");
        
        out.println("<h2>User Information</h2>");
        out.println("<p><strong>Username:</strong> " + username + "</p>");
        out.println("<p><strong>Theme Preference:</strong> " + theme + "</p>");
        
        out.println("<h2>Change Theme</h2>");
        out.println("<p>Click to change theme (demonstrates cookies):</p>");
        out.println("<a href='session-demo?theme=light' class='btn'>Light Theme</a> ");
        out.println("<a href='session-demo?theme=dark' class='btn'>Dark Theme</a>");
        
        out.println("<h2>URL Rewriting Demo</h2>");
        out.println("<p>This link includes the session ID if cookies are disabled:</p>");
        out.println("<a href='" + response.encodeURL("session-demo") + "'>Refresh with Session ID</a>");
        
        out.println("<p><a href='index.html'>Back to Home</a></p>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}