/*



var loadPOKRS = function(){
  chrome.storage.sync.get('objectives_array', function(stored_obj){
    if (!stored_obj['objectives_array']){
      $('.content_wrapper').load( '../src/new_user.html' );
    }
    else{
      objectivesArray = stored_obj['objectives_array'];
      $('.content_wrapper').load( '../src/POKR.html', function(){

        for (var i = 0; i < objectivesArray.length; i++){
          objectiveHTMLString = "";
          objectiveHTMLString = objectiveHTMLString.concat(
            "<tr><td class=\"objective_description\">",
            objectivesArray[i]['description'],
            "<div class=\"objective_date\">",
            objectivesArray[i]['due_date'],
          );
          $('#content').append
          for (var j = 0; j < objectivesArray[i]['keyresults_array'].length; j++){

          };
        };

      });
    };

};


<table id="content">
  <% @objectives.each_with_index do |objective, index|%>
    <tr><td class="objective_description"><%= objective.description %><div class="objective_date"><%= objective.due.strftime('%b %e, %Y') %></div></td></tr>
    <% @keyresults[index].each do |keyresult|%>
      <tr><td><input class="keyresult_index_input" name="<%= keyresult.id %>" type="text" value="<%= keyresult.number %>" ></input> /<%= keyresult.goal %>  <%= keyresult.unit %> <%= keyresult.action %></td></tr>
    <% end %>
    <tr><td> &nbsp; </td></tr>
  <% end %>
  <input type="hidden" name="_method" value="put"/>
  <tr><td><input id="homepage_submit" type="submit" value="Update POKRs" ></tr></td>
</table>

*/












































$( document ).ready( function(){

// JQuery for navbars

  $('#settings').on('click', function(){
    $('.content_wrapper').load( '../src/settings/index.html' );
    $('#head').focus();
  });

  $('#home').on('click', function(){

  });

  $('#about').on('click', function(){
    chrome.storage.sync.clear(function(){
      console.log("Memory cleared");
    })
  });






// JQuery for settings index

  $('.content_wrapper').on('click', '#keyresults', function(){
    $('.content_wrapper').load( '../src/construction.html' );
  });

// JQuery for profile settings

  $('.content_wrapper').on('click', '#profile', function(){
    $('.content_wrapper').load( '../src/settings/profile.html', function(){
      chrome.storage.sync.get('profileSettings', function(stored_obj){
        $('#update_frequency').val(stored_obj['profileSettings']['updateFrequency']);
        $('#alternate_homepage').val(stored_obj['profileSettings']['alternateHomepage']);
      });
    });
  });

  $('.content_wrapper').on('click', '#profile_settings_submit', function(){
    var updateFrequency = $('#update_frequency').val();
    var alternateHomepage = $('#alternate_homepage').val();
    chrome.storage.sync.set({'profileSettings': {'updateFrequency': updateFrequency, 'alternateHomepage': alternateHomepage}}, function(){
      console.log("Saved!");
    });
    $('.content_wrapper').load( '../src/settings/index.html' );
  });








// JQuery for objective settings

$('.content_wrapper').on('click', '#objectives', function(){
  $('.content_wrapper').load( '../src/settings/objectives.html', function(){
    chrome.storage.sync.get('objectives_array', function(stored_obj){
      var objectivesArray = stored_obj['objectives_array'];
      console.log(objectivesArray);
      for (var i = 0; i < objectivesArray.length; i++){
        objectiveHTMLString = "";
        objectiveHTMLString = objectiveHTMLString.concat(
          "<div id=\"update_objective_row",
          i,
          "\"><input class=\"objectives_description_input\" type=\"text\" value=\"",
          objectivesArray[i]['description'],
          "\" id=\"description",
          i,
          "\"> <input class=\"objectives_due_input\" type=\"date\" value=\"",
          objectivesArray[i]['due_date'],
          "\" id=\"due_date",
          i,
          "\">",
          "<a class=\"objective_delete\" id=\"",
          i,
          "\">X</a></div>"
        );
        $('#objectives_list').append(objectiveHTMLString);
      };
    });
  });
});

$('.content_wrapper').on('click', '#update_objectives_submit', function(){
  chrome.storage.sync.get('objectives_array', function(stored_obj){
    var objectivesArray = stored_obj['objectives_array'];
    var newArray = [];
    for (var i = 0; i < objectivesArray.length; i++){
      var keyresultsArray = [];
      if (objectivesArray[i]['keyresults_array']){
        keyresultsArray = objectivesArray[i]['keyresults_array'];
      };
      newObject = {
        description: $('#description' + i).val(),
        due_date: $('#due_date' + i).val(),
        keyresults_array: keyresultsArray
      };
      if (newObject.description && newObject.due_date){
        newArray.push(newObject);
      }
    };
    chrome.storage.sync.set({'objectives_array': newArray}, function(){
      $('.content_wrapper').load( '../src/settings/index.html' );
    });
  });
});

$('.content_wrapper').on('click', '.objective_delete', function(){
  console.log("This worked");
  var id = $(this).attr('id');
  console.log(id);
  $('#update_objective_row' + id).remove();
});

// JQuery for new objective

  $('.content_wrapper').on('click', '#new_objective_nav', function(){
    $('.content_wrapper').load( '../src/settings/new_objective.html', function(){});
  });

  $('.content_wrapper').on('click', '#new_objective_submit', function(){
    var description = $('#description').val();
    var dueDate = $('#due_date').val();
    var newObjective = {'description': description, 'due_date': dueDate, 'keyresults_array' : []};
    var objectivesArray = [];

    chrome.storage.sync.get('objectives_array', function(stored_obj){
      if (stored_obj['objectives_array']){
        console.log("Found objectives!");
        objectivesArray = stored_obj['objectives_array'];
      };
      objectivesArray.push(newObjective);
      console.log(objectivesArray);
      chrome.storage.sync.set({'objectives_array': objectivesArray}, function(){
        console.log("Saved!");
        $('.content_wrapper').load( '../src/settings/index.html' );
      });
    });

  });



// JQuery for key results settings

  $('.content_wrapper').on('click', '#new_keyresult_nav', function(){
    chrome.storage.sync.get('objectives_array', function(stored_obj){
      if (!stored_obj['objectives_array']){
        $('.content_wrapper').load( '../src/settings/new_keyresult_error.html')
      }
      else {
        $('.content_wrapper').load( '../src/settings/new_keyresult.html', function(){
          var objectivesArray = stored_obj['objectives_array'];
          for (var i = 0; i < objectivesArray.length; i++){
            optionHTML = "";
            optionHTML = optionHTML.concat(
              "<option value=\"",
              i,
              "\">",
              objectivesArray[i]['description'],
              "</option>"
            );
            $('#key_result_objective_selector').append(optionHTML);
          };
        });
      };
    });
  });

  $('.content_wrapper').on('click', '#new_keyresult_submit', function(){
    chrome.storage.sync.get('objectives_array', function(stored_obj){
      var objectivesArray = stored_obj['objectives_array'];
      var objectiveID = $('#key_result_objective_selector').val();

      var newKeyResult = {
        goal: $('#goal_submit').val(),
        unit: $('#unit_submit').val(),
        action: $('#action_submit').val()
      };

      objectivesArray[objectiveID]['keyresults_array'].push(newKeyResult);

      chrome.storage.sync.set({'objectives_array': objectivesArray}, function(){
        console.log("Saved!");
        $('.content_wrapper').load( '../src/settings/index.html' );
      });
    });
  });
});







