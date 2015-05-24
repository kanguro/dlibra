<% if (request.getAttribute("ERROR_ID")==null) return; %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" 
%><%@ page import="java.util.ResourceBundle" 
%><%@ include file="../WEB-INF/guanxi_idp/jsp/common.jsp" 
%><%
 	ResourceBundle errorMsg = ResourceBundle.getBundle("messages.errors", request.getLocale());
 	ResourceBundle msg = ResourceBundle.getBundle("messages.sp_error", request.getLocale());
 	ResourceBundle siteMsg = ResourceBundle.getBundle("messages.site", request.getLocale());
 	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	String mainServletName = application.getInitParameter("main.servlet.name");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title><%= msg.getString("ID_PAGE_TITLE")%></title>
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/one_column.css" type="text/css" />
		<link rel="stylesheet" href="<%= basePath + themeDir +  styleVariant %>/common.css" type="text/css" />
		<link rel="shortcut icon" href="<%= basePath %>/style/dlibra/favicon.ico" type="image/ico" />
		<script type="text/javascript" src="<%= basePath %>/style/common/js/jquery.js"></script>
		<script type="text/javascript">
		$(document).ready(function(){
			$(".btn-show").click(function(){
				$("#panel").show("slow");
				$("#link").hide();
				return false;
			});
		});
		</script>
	</head>
	<body>
		<div class="main">
			<h3><%= errorMsg.getString("ID_ERROR")%></h3>
			<div class="main_articles">
				<div class="LoginComponent">
		 			<div class="error">	
						<%= msg.getString("ID_ERROR_EXPLAIN")%>
					</div>
					<div id="panel" style="display: none;">
						<div>
							<%= errorMsg.getString((String)request.getAttribute("ERROR_ID")) %>
						</div>
						<div>	
							<%= request.getAttribute("ERROR_MESSAGE") %>
						</div>
					</div>
					<p id="link">
						<a href="#" class="btn-show"><%= errorMsg.getString("ID_SHOW_MORE")%></a>
					</p>
					<p>
						<a href="<%= basePath + "/" + mainServletName %>"><%= errorMsg.getString("ID_GO_TO_MAIN_PAGE")%></a>
					</p>
				</div>
			</div>
		</div>
	</body>
</html>