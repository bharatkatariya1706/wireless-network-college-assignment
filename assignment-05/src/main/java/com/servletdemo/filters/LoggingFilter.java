package com.servletdemo.filters;

import java.io.IOException;
import java.util.Date;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter("/*")
public class LoggingFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
            throws IOException, ServletException {
        
        // Cast to HttpServletRequest to get more information
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        
        // Log request details
        System.out.println("=== Logging Filter ===");
        System.out.println("Time: " + new Date());
        System.out.println("IP Address: " + request.getRemoteAddr());
        System.out.println("Request URI: " + httpRequest.getRequestURI());
        System.out.println("Method: " + httpRequest.getMethod());
        System.out.println("User-Agent: " + httpRequest.getHeader("User-Agent"));
        System.out.println("=====================");
        
        // Continue with the request
        chain.doFilter(request, response);
    }
    
    @Override
    public void destroy() {
        // Cleanup code
    }
}