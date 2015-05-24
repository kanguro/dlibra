<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" 
%><%@ page import="java.util.ResourceBundle" 
%><%@ include file="common.jsp" 
%><%
	ResourceBundle errorMsg = ResourceBundle.getBundle("messages.errors", request.getLocale());
	ResourceBundle genericMsg = ResourceBundle.getBundle("messages.generic", request.getLocale());
	ResourceBundle pageMsg = ResourceBundle.getBundle("messages.sso_error", request.getLocale());
	ResourceBundle siteMsg = ResourceBundle.getBundle("messages.site", request.getLocale());
	
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
%>
<html>
 	<head>
		<title><%= pageMsg.getString("ID_PAGE_TITLE")%></title>
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/one_column.css" type="text/css" />
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/common.css" type="text/css" />
		<link rel="shortcut icon" href="<%= basePath %>/style/dlibra/favicon.ico" type="image/ico" />
	</head>
	<body>
		<div class="main">
			<h3><%= errorMsg.getString("ID_ERROR")%></h3>
			<div class="main_articles">
				<div class="LoginComponent">
					<div class="error">
						<%= errorMsg.getString((String)request.getAttribute("ERROR_ID")) %>
					</div>
					<div>
						<a href=javascript:history.go(-1)><%= genericMsg.getString("ID_GO_BACK")%></a>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>