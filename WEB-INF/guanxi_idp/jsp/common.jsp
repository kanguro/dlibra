<%@ page import="java.util.StringTokenizer" 
%><%
	String themeDir =  getServletContext().getInitParameter("theme.dir");
	String styleVariant = "";
	String viewStyle = getServletContext().getInitParameter("view.style");
	StringTokenizer st = new StringTokenizer(viewStyle, ":");
	String styleName = st.nextToken();
	if (st.hasMoreTokens()) {
		styleVariant = st.nextToken();
	}
	if (!styleVariant.equals(""))
		styleVariant = "/" + styleVariant;
%>