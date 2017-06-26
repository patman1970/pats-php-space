<header id="idTitleBar">
  <div class="titleBarLeft">
    <!-- This reads from .DS_Store to render
         the logo image resource -->
    <img class="titleLogoImg"
         src="images/Pat.jpg"
         alt="Patrick - 2001" />
    <h2 class="titleDarker"  role="presentation" style="color:green;">PHP /
        <span style="color:blue;">mySQL</span></h2> &nbsp;
    <h2 class="titleLighter" role="presentation">Development</h2>
  </div><!-- end titleBarLeft -->
  <div class="titleBarRight" role="presentation">
    <nav role="presentation">
      <button class="titleNavButton"
       onclick="window.location='../AboutMe/index.html'">
        About
      </button>
      <button class="titleNavButton"
        onclick="window.location='../AboutMe/index.html#JQuery'">
        jQuery
      </button>
      <button class="titleNavButton"
       onclick="window.location='../AboutMe/index.html#CSS'">
        CSS
      </button>
      <button class="titleNavButton"
       onclick="window.location='../AboutMe/index.html#Favorites'">
        Favorites
      </button>
      <button class="titleNavButton"
       onclick="window.location='../AboutMe/index.html#MyTools'">
        MyTools
      </button>
    </nav>

  </div><!-- end titleBarRight -->
  <!-- these hidden icons replace the
       titleBarRight in small-screen mode: -->
  <!--
  <img id="idJQuery" class="mottoButtonImg"
       alt="jQuery Examples"
       src="jQueryExamples/jquery.png" />
  <img id="idCSS" class="mottoButtonImg"
       alt="CSS Code Samples"
       src="CSSExamples/css3.png" />
  -->

  <!-- hidden debug section -->
  <input type=hidden id=idError1 value=""/>
  <input type=hidden id=idError2 value=""/>
  <input type=hidden id=idError3 value=""/>
</header><!-- end idTitleBar section -->

<div id="idIntroSection">
  <div class="halfScreenLeft">
    <br />
    <h4 style="margin: 0 0.5 0.5rem 1rem"><?php echo $topMessage; ?></h4>
    <br />
  </div>
  <div class="halfScreenRight toLeft">

    <span style='margin: 0 0 0 0.5rem; <%= dbMessageStyle %>'>
       <?php echo $sideTopMessage ?>
    </span>

  </div>
</div><!-- end divIntroSection -->
