var bDebugVerboseOn = false;
var bDebugShowPopups = false;

$(document).ready(function() {

   $("#idResultsPane").html("<br /><br /><br />" +
      "Select an option on the left to begin.");

   $(".listServers").on("click", function() {
     var $sURL = $(this).find('a');
     if ($sURL.attr('href').length > 0) {
       var sHREF = $sURL.attr('href');
       //alert("You selected " + sHREF);
       var bForSwitch = (sHREF.toLowerCase().indexOf("switchto") > 0);
       if (bForSwitch)
         return true; //go to that URL..
       else {
         DoPOS_JsonCall(sHREF, "#idResultsPane");
         return false; //(confirm("View server JSON data?"));
       };
     };
     return false; //(confirm("View server JSON data?"));
   }); //end listServers.onClick

   $(".listStores").on("click", function() {
     var $sURL = $(this).find('a');
     if ($sURL.attr('href').length > 0) {
       var sHREF = $sURL.attr('href');
       //alert("You selected " + sHREF);
       var bForSwitch = (sHREF.toLowerCase().indexOf("switchto") > 0);
       if (bForSwitch)
         return true; //go to that URL..
       else {
         DoPOS_JsonCall(sHREF, "#idResultsPane");
         return false; //(confirm("View server JSON data?"));
       };
     } else {
       return false; //invalid href, do nothing
     }
   }); //end listStores.onClick

}); //end (document).ready for jQuery

var arrHeaders = ['DBSQL', 'Name', 'Type', 'WebServer', 'DBHost',
         'SubType', 'StoreName'];
var arrHeaderSort = ['asc', 'asc', 'asc', 'asc', 'asc',
                  'asc', 'asc'];

function GetTH(colID, colSpan, colText) {
  var sAlign = "";
  if (colText == "AC") sAlign = " text-center";
  if (colText == "LOB") sAlign = " text-center";
  if (colText == "World") sAlign = " text-center";
  return "<th class='col-xs-" + colSpan + sAlign + " attribute' "
    + " data-sortable='true' data-field='rowid' "
    + " onclick='sortTable(" + colID + ")'>"
    + colText + "</th>";
}

function DoPOS_JsonCall(psHREF, pIDObj) {
  var sShowText = "All " + psHREF.substring(1); //(remove 1st)
  var sTHead = "<table sortable container-fluid "
      + " border=1 width='100%' id='tblListing' " //bootstrap styles:
      + " class='table table-bordered table-condensed "
      + " table-hover table-responsive'>\r\n";
  var sTBody = "\r\n</thead>\r\n<tbody>\r\n";
  var sFooter = "\r\n</tbody>\r\n</table>";
  var bForServers = (psHREF.toLowerCase().indexOf("server") > 0);
  var bForStores = (psHREF.toLowerCase().indexOf("store") > 0);
  var bForAdmin = (psHREF.toLowerCase().indexOf("admin") > 0);
  var bForSQLDB = (psHREF.toLowerCase().indexOf("sqldb") > 0)

  //set up header based on the HREF subject:
  if (bForServers) {
    sTHead += "<thead>\r\n<tr class='attributes'"
           + " style='color:blue;' id='idHeaderTopRow'>\r\n";
    sTHead += " "  + GetTH(1, 1, "SQLDB")
        + GetTH(2, 2, "Server-Name")
        + GetTH(3, 1, "Type")
        + GetTH(4, 1, "Back-Office")
        + GetTH(5, 2, "Host-Name");
    if (bForSQLDB) {
      //MS SQL has more fields to present:
      sTHead += GetTH(6, 1, "MSP")
              + GetTH(7, 1, "RmsID");
    }
    sTHead += "</tr>\r\n</thead>\r\n";
  };
  if (bForStores) {
    sTHead += "<thead>\r\n<tr class='attributes'"
           + " style='color:green;' id='idHeaderTopRow'>\r\n";
     sTHead += " "  + GetTH(1, 1, "SQLDB")
        + GetTH(2, 1, "World")
        + GetTH(3, 1, "Store#")
        + GetTH(4, 1, "TermBase")
        + GetTH(5, 2, "StoreName")
        + GetTH(6, 1, "AC")
        + GetTH(7, 1, "LOB")
        + GetTH(8, 1, "SubType");
      sTHead += "</tr>\r\n</thead>\r\n";
  };

  var iQQ = sShowText.indexOf('?q=');
  if (iQQ > 0) {
    sShowText = psHREF.substring(1); //remove All..
    iQQ = sShowText.indexOf('?q=');
    var sRight = sShowText.substring(iQQ + 3);
    sShowText = sShowText.substring(0, iQQ) + " for the " + sRight;
  } else {
    sShowText += " Full Listing"; //(all servers)
  }
  $(pIDObj).html("<strong>" + sShowText + "</strong>"
     + " - URL: <a href='" + psHREF + "'>" + psHREF + "</a>");

  var iRecsFound = 0;
  if (bDebugShowPopups) {
    alert("caling ajax for " + psHREF);
  };
  // if (bDebugVerboseOn) {
  //   $('#idMessage').html(mySearchURL);
  // };

  //NOW DO SOMETHING!
  $.ajax({
    url: psHREF, /* tracks is the topmost obj */
    data: { get_param: 'value' },
    dataType: 'json',
    /* NOTE: complete: is called AFTER success/error */
    success: function(data) {
      /* Navigate down this json object:

      */
      if (bDebugShowPopups) {
        alert("returned recs: " + data.length);
      };
      if (data && data.length > 0) {
        /***** DO THE PARSING OF [array] ********/
        if (bForServers) {
          iRecsFound = data.length;
          sTBody = processJSONArray_Servers(data, bForSQLDB, bForAdmin);
        };
        if (bForStores) {
          iRecsFound = data.length;
          sTBody = processJSONArray_Stores(data, bForSQLDB, bForAdmin);
        }
        /*****************************************/
        if (bDebugShowPopups) {
          alert("RETURNED-iRecsFound=" + iRecsFound);
        };
      }; //end each(data element of JSON)

      if (iRecsFound > 0) {
        //do some work here:
        // Trackster.renderTracks(arrSongs);
        // ShowRecordsTableStatus(iRecsFound);
        $(pIDObj).append(sTHead + sTBody + sFooter);
        /*****************************/
      } else {
        //$('#idMessage').html('No records were found.');
        if (bForStores)
          sTBody += "<tr><td colspan=8>No records were found.</td></tr>";
        else
          sTBody += "<tr><td colspan=5>No records were found.</td></tr>";
        $(pIDObj).append(sTHead + sTBody + sFooter);
      };

    }
  }).fail(function(data) {
    if (bDebugShowPopups) {
      alert("Callback failed! \r\n"
         + JSON.stringify(data) );
    } else {
      //$('#idMessage').append(' - '
      //    + JSON.stringify(data)  );
      var sText = JSON.stringify(data);
      sText = sText.replace("\r\n", "<br />");
      if (bForStores) {
        sTBody += "<tr><td colspan=8>" + sText + "</td></tr>";
      } else {
        sTBody += "<tr><td colspan=5>" + sText + "</td></tr>";
      };
      $(pIDObj).append(sTHead + sTBody + sFooter);
    }
  });
}  //end DoPOS_JsonCall


function processJSONArray_Servers(poJSONArray, pbForSQLDB, pbForAdmin) {
  /* Loop through each array element: */
  sRows = "";
  $.each(poJSONArray, function(index, element) {
    if (bDebugShowPopups) {
      alert("Found element[]! " +
        JSON.stringify(element));
    };
    var sID = (pbForSQLDB ? element.Server_Set_ID : element._id);
    var sDBSQL = element.DBSQL.toLowerCase();
    var sDBName = element.Server_Set_Name;
    var sDBHost =  (pbForSQLDB ? element.DB : element.DBHost);
    var sWebDNS =  (pbForSQLDB ? element.Web : element.WebDNSAlias);
    var sIPDomain = element.ServerIPDomain;
    var sWorldCode = element.ServerWorldCode;
    var sDBType = "", sRowStyle = "", sIsActive = "";

    if  (pbForSQLDB) {
        //SQL Server fields only
      sDBType = element.ServerLOB;
      sIsActive = element.IsActive.toString().toUpperCase();
      if ((sIsActive == "N") || (sIsActive == "0") ||
          (sIsActive == "FALSE")) {
        sRowStyle = " style='color:red;'";
      };
    } else {
      var bIsOP = element.IsOperParticipant;
      var bIsFNB = element.IsFNBUserBase;
      var bIsMerch = element.IsMerchUserBase;
      sDBType = sWorldCode;
      if (bIsOP) {
        sDBType += "-OP";
      } else {
        if (bIsFNB) sDBType += "-FnB";
        else sDBType += "-Merch";
      }
    };

    //sTHead: <th>SQLDB</th><th>Server-Name</th><th>Type</th>"
    //    + "<th>Web-Back-Office</th><th>Host-Name</th>";
    sRows += "<tr " + sRowStyle + ">"
         + "<td>" + sDBSQL + "</td><td>" + sDBName + "</td>"
         + "<td class='text-center'>" + sDBType + "</td><td>" + sWebDNS + "</td>"
         + "<td>" + sDBHost + "</td>";
    if (pbForSQLDB) {
      //extra mssql fields
      var sMSP = element.MSP;
      var sRmsID = element.Returns_Server_ID;
      sRows +=  "<td>" + sMSP + "</td><td class='text-center'>" + sRmsID + "</td>";
    };
    sRows += "</tr>\r\n";

  }); //end for-each
  return sRows;
} //end processJSONArray_Servers



function processJSONArray_Stores(poJSONArray, pbForSQLDB, pbForAdmin) {
  /* Loop through each array element: */
  sRows = "";
  $.each(poJSONArray, function(index, element) {
    if (bDebugShowPopups) {
      alert("Found element[]! " +
        JSON.stringify(element));
    };
    if (pbForAdmin) {
      var sState = element.readyState;
      var sResponse = element.responseText;
    } else {
      var sID = (pbForSQLDB ? element.ID : element._id);
      var sWorldCode = element.WorldCode;
      var sStore_ID = element.Store_ID;
      var sTermBase = element.Terminal_Base;
      var sIsActive = element.IsActive.toString().toUpperCase();
      var sDBSQL = (pbForSQLDB ? element.DBSQL : element.SQL_Server);
      var sStoreName = element.Name;
      var sLOB = element.LOB;
      var sSubType = element.LOB_SubType;
      var sRowStyle = "";
      if ((sIsActive == "FALSE") || (sIsActive == "0") || (sIsActive == "N")) {
        sRowStyle = " style='color:red;'";
        sIsActive = "No";
      };
      sDBSQL = sDBSQL.toLowerCase();

      //sTHead: <th>DBSQL</th><th>World</th><th>Store#</th><th>TermBase</th>"
      // + "<th>AC</th><th>LOB</th><th>SubType</th><th>StoreName</th>";
      sRows += "<tr " + sRowStyle + ">"
         + "<td>" + sDBSQL + "</td><td class='text-center'>" + sWorldCode + "</td>"
         + "<td class='text-center'>" + sStore_ID + "</td><td>" + sTermBase + "</td>"
         + "<td>" + sStoreName + "</td><td class='text-center'>" + sIsActive + "</td>"
         + "<td class='text-center'>" + sLOB + "<td>" + sSubType + "</td></tr>\r\n";
    };
  }); //end for-each
  return sRows;
} //end processJSONArray_Stores


function ShowRecordsTableStatus( piSongsRendered ) {
  var sTxt = "Viewing " + (mi_startRecordIndex + 1).toString();
  sTxt += "-" + (mi_startRecordIndex + piSongsRendered);
  sTxt += " of " + mi_totRecordsAvailable + " song(s).";

  $('#idMessage').html(sTxt);

  if (mi_startRecordIndex > 0) {
    $('#prevURL').show();
  } else {
    $('#prevURL').hide();
  }

  //Show the id='nextURL' link if there is a next
  //set of records available:
  if ((mi_startRecordIndex + piSongsRendered) <
      mi_totRecordsAvailable) {
    $('#nextURL').show();
  };
} //end ShowRecordsTableStatus



function sortTable(n) {
  var isSwitching, shouldSwitch, dir, iSwitchCnt = 0;
  var hasSwitched = false;
  var $table = $("#tblListing");
  var iRowID = 0, iTableLen = $table.length;
  var iTryCount = 0;
  var $thisColHeader = $('#idHeaderTopRow')
        .find('th').eq(n - 1); /* 0-based */

  isSwitching = true;
  //Set the sorting direction to ascending:
  dir = arrHeaderSort[n];

  /*Make a loop that will continue until
  no switching has been done:*/
  if (bDebugShowPopups) {
    alert("sorting table of len=" + $table.length
      + " on col " + $thisColHeader.text() );
  };

  while (isSwitching && (iTableLen > 0)) {
    //start by saying: no switching is done:
    iSwitchCnt = 0; iTryCount++;
    //isSwitching = false;
    hasSwitched = false;
    var $rows = $table.find("tbody tr.row");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    if (bDebugShowPopups) {
      alert("Sorting col " + n +
            " of rows.length=" + $rows.length);
    };

    //for (i = 1; i < ($rows.length - 1); i++) {
    $.each( $rows, function( iRowID, myRow ) {
      //alert( "row=" + iRowID + ": " + myRow );
      // This returns row=#: [HTMLTableRowElement]
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      //x = $rows[i].getElementsByTagName("TD")[n];
      //y = $rows[i + 1].getElementsByTagName("TD")[n];
      if (hasSwitched == false)
      {
        var rowX = $(this).find('td').eq(n).text();
        var rowX2 = $(this).next('tr').find('td').eq(n).text();

        if ((iRowID < 3) && bDebugShowPopups) {
          alert(iRowID + "-rowX=" + rowX +
                       ", rowX2=" + rowX2);
        };
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (rowX.toLowerCase() > rowX2.toLowerCase()) {
            shouldSwitch= true;
          }
        } else if (dir == "desc") {
          if (rowX.toLowerCase() < rowX2.toLowerCase()) {
            shouldSwitch= true;
          }
        }; //end if/else (dir == "asc")

        if (shouldSwitch) {
          //Switch current row with next:
          hasSwtiched = true;
          var nextRow = $(this).next('tr');
          nextRow.after(this);
          iSwitchCnt++;
        };
      }; //if (hasSwtiched == false)

    }); //end for-each $row

    if ((iSwitchCnt == 0) || (iTryCount > 10000)) {
      /* no more swaps found, so end loop */
      isSwitching = false;
    };
  }; //while (isSwitching..)
}
