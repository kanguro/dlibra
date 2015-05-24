<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" 
%><%@ page import="java.util.ResourceBundle" 
%><%@ include file="common.jsp"
%><%
	if (request.getParameter("url") == null) {
	request.setAttribute("ERROR_ID", "ID_NEED_ALL_PARAMETERS");
    request.getRequestDispatcher("/WEB-INF/guanxi_idp/jsp/sso_error.jsp").forward(request, response);
    return;
  	} 
%><%
	ResourceBundle msg = ResourceBundle.getBundle("messages.idp_logout", request.getLocale());
	ResourceBundle siteMsg = ResourceBundle.getBundle("messages.site", request.getLocale());
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
%>
<html>
	<head>
		<title><%= msg.getString("ID_PAGE_TITLE")%></title>
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/one_column.css" type="text/css" />
		<link rel="shortcut icon" href="<%= basePath %>/style/dlibra/favicon.ico" type="image/ico" />
		<meta http-equiv="refresh" content="3;url=<%= request.getParameter("url") %>"/>
	</head>
	<body>
		<div class="main">
			<h3><%= msg.getString("ID_LOGOUT")%></h3>
			<div class="main_articles">
				<div class="LoginComponent">
					<div class="LoginComponent_help">
						<ul>
							<li><%= msg.getString((String)request.getAttribute("LOGOUT_MESSAGE")) %></li>
							<li><%= msg.getString("ID_REDIRECT")%></li>
							<li><a href="<%= request.getParameter("url") %>"><%= msg.getString("ID_RETURN")%></a></li>
						</ul>
					</div>
				</div>
			</div>	
		</div>
	</body>
</html>