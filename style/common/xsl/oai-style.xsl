<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet
   xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
   xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.0"
   xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"
   xmlns:oai="http://www.openarchives.org/OAI/2.0/"
   xmlns:friends="http://www.openarchives.org/OAI/2.0/friends/"
   xmlns:toolkit="http://oai.dlib.vt.edu/OAI/metadata/toolkit"
   xmlns:id="http://www.openarchives.org/OAI/2.0/oai-identifier"
   >

<xsl:output method="html" encoding="utf-8" indent="yes" />

<xsl:template match="/">
	 <html>
     <head>
         <link rel="stylesheet" href="../style/common/oai.css" type="text/css"/>
     </head>
     <body id="body">
		     <xsl:apply-templates />
     </body>
  </html>
</xsl:template>

<xsl:template match="oai:ListRecords | oai:GetRecord">

    <h2><xsl:value-of select="name()"/></h2>
    <ul>
    <xsl:for-each select="//oai:record">
       <li>		
		<h3><xsl:value-of select="oai:header/oai:identifier"/></h3>
		<p>
		    <xsl:apply-templates select="./oai:metadata"/>
		</p>
	   </li>
	</xsl:for-each>
    <xsl:apply-templates select="oai:resumptionToken"/>
    </ul>

</xsl:template>

<xsl:template match="oai:resumptionToken">
  <li> 
    <h2><xsl:value-of select="name()"/> :  <xsl:value-of select="text()"/></h2>
    complete list size : <xsl:value-of select="@completeListSize"/>
    cursor : <xsl:value-of select="@cursor"/>
    expiration date: <xsl:value-of select="substring(@expirationDate,0,11)"/>
  </li>
</xsl:template>

<xsl:template match="oai:Identify">

   <h2><xsl:value-of select="name()"/></h2>
        
   <xsl:value-of select="oai:repositoryName" /> <br/>
   <xsl:value-of select="oai:adminEmail"/> <br/>
   <xsl:element name="a">
     <xsl:attribute name="href"> <xsl:value-of select="oai:baseURL"/></xsl:attribute>
	 <xsl:value-of select="oai:baseURL"/>
   </xsl:element> <br/>
   protocol version: <b><xsl:value-of select="oai:protocolVersion"/> </b><br/>
   earliest datastamp: <b><xsl:value-of select="substring(oai:earliestDatestamp,0,11)"/> </b><br/>
   delete record: <b><xsl:value-of select="oai:deletedRecord"/> </b><br/>
   <xsl:apply-templates select="oai:description"/>
   
</xsl:template>

<xsl:template match="oai:description">
  <b> Description </b>
  <ul>
  <xsl:apply-templates />
  </ul>	
</xsl:template>

<xsl:template match="friends:friends">

 <li>
  <b> Friends </b>
  <ul>
    <xsl:for-each select="./*">
     <li><xsl:value-of select="name()"/> : <xsl:value-of select="text()" /> </li>
    </xsl:for-each>
  </ul>
 </li>
</xsl:template>

<xsl:template match="toolkit:toolkit">
 <li>
  <b> Toolkit </b>
  <ul>
    <xsl:for-each select="./*">
      <xsl:choose>
        <xsl:when test="not(child::*)">
          <li><xsl:value-of select="name()"/> : <xsl:value-of select="text()" /> </li>
        </xsl:when>
        <xsl:when test="child::*">
          <li><xsl:value-of select="name()"/> <xsl:value-of select="text()" /> </li>
          <ul>
            <xsl:for-each select="./*">
              <li><xsl:value-of select="name()"/> : <xsl:value-of select="text()" /> </li>
            </xsl:for-each>
          </ul>
        </xsl:when>
      </xsl:choose>
    </xsl:for-each>
  </ul>
 </li>
</xsl:template>

<xsl:template match="id:oai-identifier">
 <li>
  <b> Identifier </b>
  <ul>
    <xsl:for-each select="./*">
     <li><xsl:value-of select="name()"/> : <xsl:value-of select="text()" /> </li>
    </xsl:for-each>
  </ul>
 </li>
</xsl:template>

<xsl:template match="oai:request">
 <br/>	
	<xsl:for-each select="@*">
		<xsl:value-of select="name()"/> : <b><xsl:value-of select="." /></b><xsl:text>      </xsl:text>
	</xsl:for-each>
 <br/>
</xsl:template>

<xsl:template match="oai:responseDate">
   <b> date:  <xsl:value-of select="substring(text(),0, 11)" /> </b>   
</xsl:template>

<xsl:template match="oai:metadata">

  <ul>
    <xsl:for-each select="./oai_dc:dc/*">
      <li> 
		 <xsl:value-of select="name()"/> 
  		 <xsl:if test="@xml:lang"> 
			 (<xsl:value-of select="@xml:lang"/>)
		 </xsl:if>  
		  : <xsl:value-of select="text()" /> 
	  </li>
    </xsl:for-each>
  </ul>

</xsl:template>

</xsl:stylesheet>
