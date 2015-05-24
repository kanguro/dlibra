<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name="prefix_url"/>
<xsl:param name="viewport_width"/>
<xsl:param name="viewport_height"/>
<xsl:param name="control_width"/>
<xsl:param name="control_height"/>
<xsl:param name="x_pos" select="($viewport_width - product/@width) div 2"/>
<xsl:param name="y_pos" select="($viewport_height - product/@height) div 2"/>
<xsl:template match="/">
<product backgroundcolor="#FFFFFF" start="" speed="75">
<xsl:attribute name="width">
	<xsl:value-of select="$viewport_width"/>
</xsl:attribute>
<xsl:attribute name="height">
	<xsl:value-of select="$viewport_height"/>
</xsl:attribute>
<control width="1000" color1="#4e4e4e" color2="#FFFFFF" height="500" playpause="off" playpause-x="0" playpause-y="0">
<xsl:attribute name="width">
	<xsl:value-of select="$control_width"/>
</xsl:attribute>
<xsl:attribute name="height">
	<xsl:value-of select="$control_height"/>
</xsl:attribute>
<xsl:text>premium</xsl:text>
</control>
<images turn="full">
	<xsl:for-each select="product/images/row">
	<row>
	<xsl:attribute name="nr">
		<xsl:value-of select="attribute::nr"/>
	</xsl:attribute>
	<xsl:for-each select="image">
	<image>
		<preview>
		<xsl:attribute name="x">
			<xsl:choose>
				<xsl:when test="$x_pos &lt; 0">
					<xsl:value-of select="0"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$x_pos"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
		<xsl:attribute name="y">
			<xsl:choose>
				<xsl:when test="$y_pos &lt; 0">
					<xsl:value-of select="0"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$y_pos"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
		<xsl:value-of select="$prefix_url"/><xsl:value-of select="preview"/>
		</preview>
		<detail>
		<xsl:value-of select="$prefix_url"/><xsl:value-of select="detail"/>
		</detail>
	</image>
	</xsl:for-each>
	</row>
	</xsl:for-each>
</images>
<links alpha="80" fontsize="11" font="Arial" background="#FFFFFF"/>
</product>
</xsl:template>
</xsl:stylesheet>