<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" 
%><%@ page import="org.guanxi.common.Utils, 
                 java.util.Hashtable, 
                 java.util.Enumeration" 
%><%@ page import="java.util.ResourceBundle" 
%><%@ include file="common.jsp" 
%><%
	ResourceBundle msg = ResourceBundle.getBundle("messages.authenticator", request.getLocale());

	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	
	String mainServlet = application.getInitParameter("main.servlet.name");	
%>
<html>
    <head>
		<title><%= msg.getString("ID_PAGE_TITLE")%></title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/one_column.css" type="text/css" />
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/common.css" type="text/css" />
		<link rel="shortcut icon" href="<%= basePath %>/style/dlibra/favicon.ico" type="image/ico" />

    </head>
    <body>
        	</body>
</html>
