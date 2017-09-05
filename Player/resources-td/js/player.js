var playerAppName = 'Плейлист';
var data1 = (localStorage.getItem('todoList1')) ? JSON.parse(localStorage.getItem('todoList1')):{playlist1: []};
var curentAutoPlay; var curentAutoMusic;
var nextRandom; var succses; var randomAutoMode = false;
var autoPlayIsOn = false; var musicIs = null; var warning = false; var isPaused = false;
var multippleValues = new Array ();
var randomPlayedAmmountMax = data1.playlist1.length ;
var randomPlayed = new Array(randomPlayedAmmountMax);
var empties = randomPlayed.length;

var groups = new Array();
var arrayFile = new Array();
var locationPlayList;
var fileInfo = new Array();

jQuery.get("playlist.txt", undefined, function(data) {

  locationPlayList = data;
  //   arrayFile = locationPlayList.split(',\n'); for Linux
  arrayFile = locationPlayList.split(',\r\n');
  fileInfo = new Array(arrayFile.length);
  for (var i = 0; i < arrayFile.length; i++) {
  fileInfo[i] = new Array(2);}

  arrayFile.forEach(function(element,index){
    groups[index] = element.split(' - ')[0];
    fileInfo[index][1] = element.split(' - ')[0];
    fileInfo[index][0] = element.split(' - ')[1];
  });

    arrayFile.sort();

    groups.sort();
    groups = unique(groups);

    groups.forEach(function(element,index){
      // addGroup(element);
      // console.log(element + ": ")
      namesOfGroup(element,index);
      // console.log("");
    });
  }, "html").done(function() {

  }).fail(function(jqXHR, textStatus) {
  alert(textStatus);
  }).always(function() {
});


function namesOfGroup(group,indexOfGroup){

  fileInfo.forEach(function(element,index){
  if(fileInfo[index][1] == groups[indexOfGroup]){
  // console.log(fileInfo[index][0]);
  addGroup(group,fileInfo[index][0]);
}
  });

}


function addGroup(group,element){
  var groupList = document.getElementById('groupList');
  var groupItem = document.createElement('li');
  groupItem.innerText = group +' - ' + element;
  var array = element.split(' ');
  var array2 = group.split(' ');
  element = null;
  group = null;
  var classOfItem = '';
  array.forEach(function(element,index){
    if(index != 0)
    classOfItem += '_' + element;
  else classOfItem +=  element;
  });
  groupItem.classList.add(classOfItem);


  var groupOfItem = '';
  array2.forEach(function(element,index){
    if(index != 0)
    groupOfItem += '_' + element;
  else groupOfItem +=  element;
  });
  groupItem.classList.add(groupOfItem);
  groupItem.onclick = function() { addFromSearch(this.innerText); };

  groupList.appendChild(groupItem, groupList.childNodes[0]);
}

    var container = $('#groupList');

    $('#searchGroup').click(function() {

        var selector = document.getElementById('groupInput').value;
        if(selector[0] != '!'){
        var array1 = selector.split(' ');
         selector = null;
         selector = '';
          array1.forEach(function(element,index){
          if(index != 0)
          selector += '_' + element;
          else selector +=  element;
          });

        if(document.getElementById('groupInput').value != '' || document.getElementById('groupInput').value) selector = "." + selector;
        document.getElementById('groupInput').value = '';
        container.isotope({
            filter: selector,
            layoutMode: 'vertical'
        });
        return false;
      }

    });


  document.getElementById('groupInput').addEventListener('keydown', function (e) {

    if (e.code === 'Enter' ){
      var selector = document.getElementById('groupInput').value;
          if(true){
          var array1 = selector.split(' ');
           selector = null;
           selector = '';
            array1.forEach(function(element,index){
            if(index != 0)
            selector += '_' + element;
            else selector +=  element;
            });

          if(document.getElementById('groupInput').value != '' || document.getElementById('groupInput').value) selector = '.' + selector;
          document.getElementById('groupInput').value = '';
          container.isotope({
              filter: selector,
              layoutMode: 'vertical'
          });
          return false;
        }
    }
  });

function addFromSearch(element){
  addItemIfNoRepeated(element);
}


randomPlayed.forEach(function(x){ empties--  });
var rSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.5-0.6-0.6v-6.8c0-0.4,0.5-0.6,0.6-0.6s0.6,0.5,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.5-0.6-0.6v-6.8c0-0.4,0.5-0.6,0.6-0.6c0.4,0,0.6,0.5,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.5-0.6-0.6v-6.8c0-0.4,0.5-0.6,0.6-0.6c0.4,0,0.6,0.5,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var cSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.5-0.5-0.5-0.8,0-1.1s0.8-0.5,1.1,0l2.1,2.1l4.8-4.8c0.5-0.5,0.8-0.5,1.1,0s0.5,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
renderThisPlayList();
document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';

document.getElementById('addMusic').addEventListener('click', function() {
  var value1 = document.getElementById('music').value;
  if(value1 == '!remove' || value1 == '!удалить' || value1 == '!delete' || value1 == '!Remove' || value1 == '!Удалить' || value1 == '!Delete'){
    if(!curentAutoMusic){
      while(randomPlayedAmmountMax > 0)
      data1.playlist1.forEach(function(element,index){
        removeAllItems(index);
        });
      document.getElementById('music').value = '';
    }
  }
  else if(value1 == '!all' || value1 == '!все' || value1 == '!addall' || value1 == '!aa' || value1 == '!добавитьвсе'){
    arrayFile.forEach(function(element,index){

        addFromSearch(element);
    });
  }
  else if(value1 == '!ID'){
    arrayFile.forEach(function(element,index){
        if (element.split(' - ')[0] == 'Imagine Dragons'){
            addFromSearch(element);
        }
    });
  }
  else if(value1 == '!Love'){
    love_list = ['Ellie Goulding - Every Time You Go',
                 'Ed Sheeran - Shape of You',
                 'Ed Sheeran - Shape of You',
                 'Ed Sheeran - Shape of You',
                 'Ellie Goulding - Hearts Without Chains',
                 'Ellie Goulding - How Long Will I Love You',
                 'Ellie Goulding - You My Everything',
                 'Austin Mahone - Say My Name',
                 'Calvin Harris - I Need Your Love',
                 'Coldplay - Magic',
                 'Coldplay - Sky Full Of Stars']
    arrayFile.forEach(function(element,index){
            if (love_list.includes(element)){
                addFromSearch(element);
            }
    });
  }
  else if(value1 == '!Fun'){
    fun_list = ['Birdy - White Winter Hymnal',
                'Coldplay - Miracles',
                'Coldplay - Fix You',
                'Coldplay - Paradise',
                'Coldplay - Sky Full Of Stars',
                'Ellie Goulding - Burn',
                'Imagine Dragons - Believer',
                'Imagine Dragons - Demons',
                'Imagine Dragons - Radioactive',
                'Imagine Dragons - Roots',
                'Imagine Dragons - Thunder',
                'Our Last Night - Sunrise',
                'Robin Schulz - Yellow',
                'The Black Eyed Peas - Just Can’t Get Enogh']
    arrayFile.forEach(function(element,index){
            if (fun_list.includes(element)){
                addFromSearch(element);
            }
    });
  }
  else if(value1 == '!CP'){
    arrayFile.forEach(function(element,index){
        if (element.split(' - ')[0] == 'Coldplay'){
            addFromSearch(element);
        }
    });
  }
  else if(value1 == '!EG'){
    arrayFile.forEach(function(element,index){
        if (element.split(' - ')[0] == 'Ellie Goulding'){
            addFromSearch(element);
        }
    });
  }
  else if(document.getElementById('music').value.split(' ')[0] == '!volume' || document.getElementById('music').value.split(' ')[0] == '!vol' || document.getElementById('music').value.split(' ')[0] == '!звук' || document.getElementById('music').value.split(' ')[0] == '!громкость'){
    curentAutoMusic.volume = document.getElementById('music').value.split(' ')[1]/100;
    document.getElementById('music').value = '';
  }
  else if(value1[0] == 'h' && value1[1] == 't' && value1[2] == 't' && value1[3] == 'p' ){
    var arrayWeb = value1.split(', ');
    var href = arrayWeb[0]; // ссылка
    var name = '' + arrayWeb[1]; // _имя
    addItemIfNoRepeatedWeb(name, href);
    saveFile(href,name);
  }else if(value1){
    multippleValues = value1.split(', ');
    multippleValues.forEach(function(element){ addItemIfNoRepeated(element); });
  }
});

document.getElementById('music').addEventListener('keydown', function (e) {
  var value1 = this.value;
  if (e.code === 'Enter' ){
    if(value1 == '!remove' || value1 == '!удалить' || value1 == '!delete' || value1 == '!Remove' || value1 == '!Удалить' || value1 == '!Delete'){
      if(!curentAutoMusic){
      while(randomPlayedAmmountMax > 0)
            data1.playlist1.forEach(function(element,index){
        removeAllItems(index);
        });
      document.getElementById('music').value = '';
    }
    }else if(value1 == '!all' || value1 == '!все' || value1 == '!addall' || value1 == '!aa' || value1 == '!добавитьвсе'){
    arrayFile.forEach(function(element,index){
      addFromSearch(element);
    });
  }
  else if(value1 == '!ID'){
    arrayFile.forEach(function(element,index){
        if (element.split(' - ')[0] == 'Imagine Dragons'){
            addFromSearch(element);
        }
    });
  }
  else if(value1 == '!EG'){
    arrayFile.forEach(function(element,index){
        if (element.split(' - ')[0] == 'Ellie Goulding'){
            addFromSearch(element);
        }
    });
  }
  else if(value1 == '!CP'){
    arrayFile.forEach(function(element,index){
        if (element.split(' - ')[0] == 'Coldplay'){
            addFromSearch(element);
        }
    });
  }
  else if(value1 == '!Love'){
    love_list = ['Ellie Goulding - Every Time You Go',
                 'Ed Sheeran - Shape of You',
                 'Ed Sheeran - Shape of You',
                 'Ed Sheeran - Shape of You',
                 'Ellie Goulding - Hearts Without Chains',
                 'Ellie Goulding - How Long Will I Love You',
                 'Ellie Goulding - You My Everything',
                 'Austin Mahone - Say My Name',
                 'Calvin Harris - I Need Your Love',
                 'Coldplay - Magic',
                 'Coldplay - Sky Full Of Stars']
    arrayFile.forEach(function(element,index){
            if (love_list.includes(element)){
                addFromSearch(element);
            }
    });
  }
  else if(value1 == '!Fun'){
    fun_list = ['Birdy - White Winter Hymnal',
                'Coldplay - Miracles',
                'Coldplay - Fix You',
                'Coldplay - Paradise',
                'Coldplay - Sky Full Of Stars',
                'Ellie Goulding - Burn',
                'Imagine Dragons - Believer',
                'Imagine Dragons - Demons',
                'Imagine Dragons - Radioactive',
                'Imagine Dragons - Roots',
                'Imagine Dragons - Thunder',
                'Our Last Night - Sunrise',
                'Robin Schulz - Yellow',
                'The Black Eyed Peas - Just Can’t Get Enogh']
    arrayFile.forEach(function(element,index){
            if (fun_list.includes(element)){
                addFromSearch(element);
            }
    });
  }
  else if(document.getElementById('music').value.split(' ')[0] == '!volume' || document.getElementById('music').value.split(' ')[0] == '!vol' || document.getElementById('music').value.split(' ')[0] == '!звук' || document.getElementById('music').value.split(' ')[0] == '!громкость'){
    curentAutoMusic.volume = document.getElementById('music').value.split(' ')[1]/100;
    document.getElementById('music').value = '';
  }
    else if(value1[0] == 'h' && value1[1] == 't' && value1[2] == 't' && value1[3] == 'p' ){
      var arrayWeb = value1.split(', ');
      var href = arrayWeb[0]; // ссылка
      var name = '' + arrayWeb[1]; //имя
      addItemIfNoRepeatedWeb(name, href);
      saveFile(href,name);
    }else if(value1){
      multippleValues = value1.split(', ');
      multippleValues.forEach(function(element){ addItemIfNoRepeated(element); });
    }
  }else{
    if(value1[0] == 'h' && value1[1] == 't' && value1[2] == 't' && value1[3] == 'p' ){
      var arrayWeb = value1.split('.mp3?');
      if(arrayWeb[1]){
        var href = arrayWeb[0]+'.mp3'; // ссылка
        document.getElementById('music').value = href;
      }
    }
  }
});

function addItemWeb (value1,href) {
  if(musicIs == null){
    addItemToDOM1(value1);
    document.getElementById('music').value = '';
    data1.playlist1.push(value1);
    dataObjectUpdated1();
    randomPlayedAmmountMax += 1;
    document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
    document.getElementById('title').innerHTML = 'Start Page';
    var newAudio = document.createElement('audio');
    newAudio.setAttribute("id", value1);
    var newSource = document.createElement('source');
    newSource.setAttribute("src", href + "");
    newSource.setAttribute("hidden", "true");
    newAudio.appendChild(newSource);
    document.getElementById('audiocode').appendChild(newAudio);
  }else{
    warning = true;
    document.getElementById('music').value = '';
    document.getElementById('music').placeholder = 'Нельзя добавлять во время воспроизведения';
    setTimeout( function() {
      warning = false;
      document.getElementById('music').placeholder = 'Добавить песню...';
    } , 1500);
  }
}

function addItemIfNoRepeatedWeb(value1,href){
  var notvalue = value1;
  data1.playlist1.forEach(function(element){
    if(element == value1){value1 = null; return;}
  });
  if(value1){
    addItemWeb(value1,href);
  }else{
    warning = true;
    document.getElementById('music').value = '';
    document.getElementById('music').placeholder = notvalue + ' уже есть в плейлисте';
    setTimeout( function() {
      warning = false; notvalue = null;
      document.getElementById('music').placeholder = 'Добавить песню...';
    } , 1500);
  }
}

function addItemIfNoRepeated(value1){
  var notvalue = value1;
  data1.playlist1.forEach(function(element){
    if(element == value1){
      value1 = null;
      return;
    }
  });
  if(value1){
    addThisItem(value1);
  }else{
     console.log(notvalue)
    warning = true;
    document.getElementById('music').value = '';
    document.getElementById('music').placeholder = notvalue + ' уже есть в плейлисте';
    setTimeout( function() {
      warning = false; notvalue = null;
      document.getElementById('music').placeholder = 'Добавить песню...';
    } , 1500);
  }
}




function addThisItem (value1) {
  if(musicIs == null){


  addItemToDOM1(value1);
  document.getElementById('music').value = '';

  data1.playlist1.push(value1);
  dataObjectUpdated1();
  randomPlayedAmmountMax += 1;
  document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
  document.getElementById('title').innerHTML = 'Start Page';

  var newAudio = document.createElement('audio');
  newAudio.setAttribute("id", value1);
  var newSource = document.createElement('source');
  newSource.setAttribute("src",'music/' + value1 + ".mp3");
  newSource.setAttribute("hidden", "true");

  newAudio.appendChild(newSource);
  document.getElementById('audiocode').appendChild(newAudio);



 } else {
  warning = true;
  document.getElementById('music').value = '';
    document.getElementById('music').placeholder = 'Нельзя добавлять во время воспроизведения';
    setTimeout( function() {
    warning = false;
    document.getElementById('music').placeholder = 'Добавить песню...';
    } , 1500);
 }


}

function renderThisPlayList() {
  if (!randomPlayedAmmountMax) return;


  for (var i = 0; i < randomPlayedAmmountMax; i++) {
  var value1 = data1.playlist1[i];
  addItemToDOM1(value1);
  var newAudio = document.createElement('audio');
  newAudio.setAttribute("id", value1);
  var newSource = document.createElement('source');
  newSource.setAttribute("src",'music/' + value1 + ".mp3");
  newSource.setAttribute("hidden", "true");

  newAudio.appendChild(newSource);
  document.getElementById('audiocode').appendChild(newAudio);
  }
}

function dataObjectUpdated1() {
  localStorage.setItem('todoList1', JSON.stringify(data1));

}

function removeAllItems(index) {
  if(musicIs == null){
  var item1 = document.getElementById('playlist').children[index+1];
  var parent1 = item1.parentNode;
  var id1 = parent1.id;
  var value1 = item1.innerText;



  if (id1 === 'playlist') {
    data1.playlist1.splice(data1.playlist1.indexOf(value1), 1);
  }

  dataObjectUpdated1();

  parent1.removeChild(item1);
  document.getElementById('audiocode').removeChild(document.getElementById(value1));
  randomPlayedAmmountMax = data1.playlist1.length;
  document.getElementById('playerStatus').innerText = playerAppName + ' | '+data1.playlist1.length +' песни';
  document.getElementById('title').innerHTML = 'Start Page';

 }else {
    warning = true;
    document.getElementById('music').placeholder = 'Нельзя удалять во время воспроизведения';
    setTimeout( function() {
    warning = false;
    document.getElementById('music').placeholder = 'Добавить песню...';
    } , 1500);
 }
}

function removeThisItem() {
  if(musicIs == null){
  var item1 = this.parentNode.parentNode;
  var parent1 = item1.parentNode;
  var id1 = parent1.id;
  var value1 = item1.innerText;



  if (id1 === 'playlist') {
    data1.playlist1.splice(data1.playlist1.indexOf(value1), 1);
  }

  dataObjectUpdated1();

  parent1.removeChild(item1);
  document.getElementById('audiocode').removeChild(document.getElementById(value1));

  randomPlayedAmmountMax = data1.playlist1.length;
  document.getElementById('playerStatus').innerText = playerAppName + ' | '+data1.playlist1.length +' песни';
  document.getElementById('title').innerHTML = 'Start Page';

 }else {
    warning = true;
    document.getElementById('music').placeholder = 'Нельзя удалять во время воспроизведения';
    setTimeout( function() {
    warning = false;
    document.getElementById('music').placeholder = 'Добавить песню...';
    } , 1500);
 }
}

function completeThisItem() {
	var item3 = this.parentNode.parentNode;
	var audioid = item3.innerText;
	var audio = document.getElementById(audioid);

	if(!musicIs){
	audio.play();
	audio.onended = function() {
    musicIs = null;
    document.getElementById('music').placeholder = 'Добавить песню...';
       document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
       document.getElementById('title').innerHTML = 'Start Page';
       document.getElementById('progress').style.width = '0%';
    item3.style.background = "rgba(255,255,255,1)";
    item3.style.background = "rgba(255,255,255,1)";
    curentAutoPlay = null;
    curentAutoMusic = null;
    autoPlayIsOn = false;
    randomAutoMode = false;

	};
	musicIs = audioid;
	item3.style.background = "rgba(69,95,234,0.1)";

  curentAutoPlay = item3;
  curentAutoMusic = audio;


	}
	else if (audioid == musicIs) {
	audio.pause();
	audio.load();
	musicIs = null;
	item3.style.background = "rgba(255,255,255,1)";
  document.getElementById('music').placeholder = 'Добавить песню...';
     document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
     document.getElementById('title').innerHTML = 'Start Page';
     document.getElementById('progress').style.width = '0%';
  curentAutoPlay = null;
  curentAutoMusic = null;
  autoPlayIsOn = false;
  randomAutoMode = false;
      if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }

	}
	else if (item3 == curentAutoPlay && musicIs == 'auto'){
	audio.pause();
	audio.load();
	musicIs = null;
	item3.style.background = "rgba(255,255,255,1)"
  document.getElementById('music').placeholder = 'Добавить песню...';
   document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
   document.getElementById('title').innerHTML = 'Start Page';
   document.getElementById('progress').style.width = '0%';
      curentAutoPlay = null;
    curentAutoMusic = null;
    autoPlayIsOn = false;
    randomAutoMode = false;

    empties = randomPlayedAmmountMax;

    randomPlayed = new Array(randomPlayedAmmountMax);

    console.log('-----Отмена Авто ----')
    document.getElementById('autoB').style.color = "#fff";
    document.getElementById('randB').style.color = "#fff";
        if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }

	}
  else if (musicIs == 'auto') {
    // warning = true;
    // document.getElementById('music').placeholder = 'Чтобы изменить режим или песню - остановите плеер';
    // setTimeout( function() {
    // warning = false;
    // document.getElementById('music').placeholder = 'Добавить песню...';
    // } , 2500);
    selectMusic(audio,item3);
  }

  else if (musicIs){
    stopMusic();
    audio.play();
      audio.onended = function() {
    musicIs = null;
    document.getElementById('music').placeholder = 'Добавить песню...';
       document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
       document.getElementById('title').innerHTML = 'Start Page';
       document.getElementById('progress').style.width = '0%';
    item3.style.background = "rgba(255,255,255,1)";
    item3.style.background = "rgba(255,255,255,1)";
    curentAutoPlay = null;
    curentAutoMusic = null;
    autoPlayIsOn = false;
    randomAutoMode = false;

  };
    musicIs = item3.innerText;
    curentAutoMusic = audio;
    curentAutoPlay = item3;
    curentAutoPlay.style.background = "rgba(69,95,234,0.1)";



    if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }
  }
}


function stopMusic(){
if(curentAutoMusic && musicIs == 'auto') {
    autoPlayIsOn = false;

    document.getElementById('music').placeholder = 'Добавить песню...';
       document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
       document.getElementById('title').innerHTML = 'Start Page';
       document.getElementById('progress').style.width = '0%';
    curentAutoPlay.style.background = "rgba(255,255,255,1)";
    curentAutoMusic.pause();
    curentAutoMusic.load();
    musicIs = null;
    curentAutoPlay = null;
    curentAutoMusic = null;
    randomAutoMode = false;
    empties = randomPlayedAmmountMax;
    randomPlayed = new Array(randomPlayedAmmountMax);
    console.log('-----Отмена Авто ----')
    document.getElementById('autoB').style.color = "#fff";
        document.getElementById('randB').style.color = "#fff";
            if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }
  }

  if(curentAutoMusic && musicIs != null){
  curentAutoMusic.pause();
  curentAutoMusic.load();
  musicIs = null;
  curentAutoPlay.style.background = "rgba(255,255,255,1)"
  document.getElementById('music').placeholder = 'Добавить песню...';
  document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
  document.getElementById('title').innerHTML = 'Start Page';
  document.getElementById('progress').style.width = '0%';
  curentAutoPlay = null;
  curentAutoMusic = null;
  autoPlayIsOn = false;
  randomAutoMode = false;
document.getElementById('autoB').style.color = "#fff";
document.getElementById('randB').style.color = "#fff";
      if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }

}
else {
  warning = true;
  document.getElementById('music').placeholder = 'Плеер уже остановлен';
  setTimeout( function() {
    warning = false;
    document.getElementById('music').placeholder = 'Добавить песню...';
  } , 2500);
}

}

// Adds a new item to the playlist1
function addItemToDOM1(text, completed) {
  var list1 = document.getElementById('playlist');


  var item1 = document.createElement('li');
  item1.innerText = text;

  var buttons1 = document.createElement('div');
  buttons1.classList.add('buttons');

  var remove1 = document.createElement('button');
  remove1.classList.add('remove');
  remove1.innerHTML = rSVG;

  // Add click event for removing the item
  remove1.addEventListener('click', removeThisItem);

  var complete1 = document.createElement('button');
  complete1.classList.add('complete');
  complete1.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"></rect><g></g></svg>';

  // Add click event for completing the item
  complete1.addEventListener('click', completeThisItem);

  buttons1.appendChild(remove1);
  buttons1.appendChild(complete1);
  item1.appendChild(buttons1);

  list1.appendChild(item1, list1.childNodes[0]);
}


document.onkeydown = function checkKeycode(event)
{
var keycode;
if(!event) var event = window.event;
if (event.keyCode) keycode = event.keyCode; // IE
else if(event.which) keycode = event.which; // all browsers

  if(keycode == 32){
    // console.log(curentAutoMusic.volume);
    // curentAutoMusic.volume = 0;
  }

}


function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }

  return Object.keys(obj); // или собрать ключи перебором для IE8-
}


function saveFile(url,name) {
  // Get file name from url.
  var filename = name + '.mp3';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };
  xhr.open('GET', url);
  xhr.send();
}


function pauseMusic(){
  if(curentAutoMusic){

  if(!isPaused){
  curentAutoMusic.pause();
  document.getElementById('pauseB').style.color = "#455FEA";
  isPaused = true;
}
  else {
    curentAutoMusic.play();
    document.getElementById('pauseB').style.color = "#fff";
    isPaused = false;
  }
}
  else {
  warning = true;
    document.getElementById('music').placeholder = 'Ничего не воспроизводится';
    setTimeout( function() {
    warning = false;
    document.getElementById('music').placeholder = 'Добавить песню...';
    } , 2500);
}
}



function randomAutoModeOn(){

  if(randomPlayedAmmountMax > 0){
  if(!autoPlayIsOn && !curentAutoPlay){
  if(!randomAutoMode){
  randomAutoMode = true;
  empties = randomPlayedAmmountMax;
    randomPlayed = new Array(randomPlayedAmmountMax);
      }
    }
  }
  autoPlayOn();
}



function autoPlayOn() {
if(randomPlayedAmmountMax > 0){
  if(!autoPlayIsOn && !curentAutoPlay){
      arrayForEach();
  autoPlayIsOn = true;
    	if(musicIs == null || musicIs == 'autoPause'){
      if(randomAutoMode){
      	musicIs = 'auto';
        succses = false;

        while(!succses){
        var nextRandom1 = Math.floor((Math.random() * randomPlayedAmmountMax) + 0);
        if(!curentAutoPlay){
          succses = true;
          randomPlayed[0] = data1.playlist1[nextRandom1];
          console.log('Всего песен - ' + randomPlayedAmmountMax);
          console.log('Песня № 1 - ' + randomPlayed[0]);
          empties -= 1;
        }
        else if(document.getElementById('playlist').children[index+1].innerText != document.getElementById('playlist').children[nextRandom+1].innerText){
          succses = true;
          randomPlayed[0] = data1.playlist1[nextRandom1];
          console.log('Всего песен - ' + randomPlayedAmmountMax);
          console.log('Песня № 1 - ' + randomPlayed[0]);
          empties -= 1;
        }
      }
      	document.getElementById('playlist').children[nextRandom1+1].style.background = "rgba(255,255,255,1)";
      	document.getElementById(data1.playlist1[nextRandom1]).load();
      	document.getElementById(data1.playlist1[nextRandom1]).play();
      	document.getElementById('playlist').children[nextRandom1+1].style.background = "rgba(69,95,234,0.1)";
        curentAutoPlay = document.getElementById('playlist').children[nextRandom1+1];
        curentAutoMusic = document.getElementById(data1.playlist1[nextRandom1]);

        document.getElementById('autoB').style.color = "#455FEA";
        document.getElementById('randB').style.color = "#455FEA";

      }
      else  {
        musicIs = 'auto';

      document.getElementById(data1.playlist1[0]).load();
      document.getElementById(data1.playlist1[0]).play();
      document.getElementById('playlist').children[1].style.background = "rgba(69,95,234,0.1)";
      curentAutoPlay = document.getElementById('playlist').children[1];
      curentAutoMusic = document.getElementById(data1.playlist1[0]);
      document.getElementById('autoB').style.color = "#455FEA";

      }
    }
  }
  else if(musicIs == 'auto') {
    autoPlayIsOn = false;

    document.getElementById('music').placeholder = 'Добавить песню...';
       document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
       document.getElementById('title').innerHTML = 'Start Page';
       document.getElementById('progress').style.width = '0%';
    curentAutoPlay.style.background = "rgba(255,255,255,1)";
    curentAutoMusic.pause();
    curentAutoMusic.load();
    musicIs = null;
    curentAutoPlay = null;
    curentAutoMusic = null;
    randomAutoMode = false;
    empties = randomPlayedAmmountMax;
    randomPlayed = new Array(randomPlayedAmmountMax);
    console.log('-----Отмена Авто ----')
    document.getElementById('autoB').style.color = "#fff";
        document.getElementById('randB').style.color = "#fff";
            if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }
  }
  else {
    warning = true;
    document.getElementById('music').placeholder = 'Чтобы изменить режим - остановите плеер';
    setTimeout( function() {
    warning = false;
    document.getElementById('music').placeholder = 'Добавить песню...';
    } , 2500);
  }
}
}

function arrayForEach(){
     if(randomAutoMode){
       data1.playlist1.forEach(function(element, index) {
         if(index <= randomPlayedAmmountMax && randomPlayedAmmountMax > 1) {
           document.getElementById(data1.playlist1[index]).load();
           document.getElementById(data1.playlist1[index]).onended = function() {
             succses = false;
             while(!succses){
               nextRandom = Math.floor((Math.random() * randomPlayedAmmountMax) + 0);
               var repeated = false;
               randomPlayed.forEach(function(element){
                 if(data1.playlist1[nextRandom] == element) repeated = true;
               });
               if((document.getElementById('playlist').children[index+1].innerText != document.getElementById('playlist').children[nextRandom+1].innerText) && !repeated ){
                 succses = true;
                 if(empties != 0)
                 empties -= 1;
                 var randomIndex = randomPlayedAmmountMax - empties - 1;
                 console.log('Песня № ' + (randomIndex + 1) + ' - ' + data1.playlist1[nextRandom]);
                 randomPlayed[randomIndex] = data1.playlist1[nextRandom];

                 if(empties == 0){
                   empties = randomPlayedAmmountMax;
                   randomPlayed = new Array(randomPlayedAmmountMax);
                   console.log('-----заного----')
                 }
               }
             }
             document.getElementById(data1.playlist1[nextRandom]).play();
             document.getElementById('playlist').children[index+1].style.background = "rgba(255,255,255,1)";
             document.getElementById('playlist').children[nextRandom+1].style.background = "rgba(69,95,234,0.1)";
             curentAutoPlay = document.getElementById('playlist').children[nextRandom+1];
             curentAutoMusic = document.getElementById(data1.playlist1[nextRandom]);
         };
         nextRandom = 0;
       }
       else if(randomPlayedAmmountMax == 1) {
         document.getElementById(data1.playlist1[index]).onended = function() {
           document.getElementById(data1.playlist1[0]).load();
           document.getElementById(data1.playlist1[0]).play();
           document.getElementById('playlist').children[1].style.background = "rgba(69,95,234,0.1)";
           curentAutoPlay = document.getElementById('playlist').children[1];
           curentAutoMusic = document.getElementById(data1.playlist1[0]);
         };
       }
     });
    }
    else {
        data1.playlist1.forEach(function(element, index) {
        if(index < randomPlayedAmmountMax-1 && randomPlayedAmmountMax > 1) {
          document.getElementById(data1.playlist1[index]).load();
          document.getElementById(data1.playlist1[index]).onended = function() {
            document.getElementById(data1.playlist1[index+1]).play();
            document.getElementById('playlist').children[index+1].style.background = "rgba(255,255,255,1)";
            document.getElementById('playlist').children[index+2].style.background = "rgba(69,95,234,0.1)";
            curentAutoPlay = document.getElementById('playlist').children[index+2];
            curentAutoMusic = document.getElementById(data1.playlist1[index+1]);
          };
        }else if(randomPlayedAmmountMax == 1) {
          document.getElementById(data1.playlist1[index]).onended = function() {
            document.getElementById(data1.playlist1[0]).load();
            document.getElementById(data1.playlist1[0]).play();
            document.getElementById('playlist').children[1].style.background = "rgba(69,95,234,0.1)";
            curentAutoPlay = document.getElementById('playlist').children[1];
            curentAutoMusic = document.getElementById(data1.playlist1[0]);
          };
        }else if(index == randomPlayedAmmountMax-1){
          document.getElementById(data1.playlist1[index]).onended = function() {
            document.getElementById(data1.playlist1[0]).load();
            document.getElementById(data1.playlist1[0]).play();
            document.getElementById('playlist').children[1].style.background = "rgba(69,95,234,0.1)";
            document.getElementById('playlist').children[index+1].style.background = "rgba(255,255,255,1)";
            curentAutoPlay = document.getElementById('playlist').children[1];
            curentAutoMusic = document.getElementById(data1.playlist1[0]);
          };
        }
      });
    }
}

var intervalID = window.setInterval(myCallback, 50);
var timePlaying;
function myCallback() {
  if(musicIs && !warning){
    var timePlaying = curentAutoMusic.currentTime;
    if((timePlaying - (Math.floor(timePlaying/60))*60) < 9.5)
      document.getElementById('playerStatus').innerHTML = "" + curentAutoPlay.innerText + "" + "<span style='color: white; font-weight: bold; position: absolute; right: 260px; '>" + '   ' + Math.floor(timePlaying/60) + ':0' + (timePlaying- (Math.floor(timePlaying/60))*60).toFixed(0) + "</span>";
    else
      document.getElementById('playerStatus').innerHTML = "" + curentAutoPlay.innerText + "" + "<span style='color: white; font-weight: bold; position: absolute; right: 260px; '>" + '   ' + Math.floor(timePlaying/60) + ':' + (timePlaying- (Math.floor(timePlaying/60))*60).toFixed(0) + "</span>";
    document.getElementById('title').innerHTML = curentAutoPlay.innerText.split(' - ')[1];
    document.getElementById('progress').style.width = curentAutoMusic.currentTime*100/curentAutoMusic.duration + '%' ;
  }

}

$("#progressback").click(function(event) {
  if(curentAutoMusic){
    var x = event.clientX;
    var w = $( window ).width() * 0.4;
    var positionMusic = x/w * curentAutoMusic.duration;
      curentAutoMusic.currentTime = positionMusic ;
    }
});

$("#progress").click(function(event) {
  if(curentAutoMusic){
    var x = event.clientX;
    var w = $( window ).width() * 0.4;
    var positionMusic = x/w * curentAutoMusic.duration;
      curentAutoMusic.currentTime = positionMusic ;
    }
});

function nextMusic(){
  if(curentAutoMusic && musicIs == 'auto'){
    curentAutoMusic.currentTime = curentAutoMusic.duration - 0.1 ;
    if(isPaused){
      curentAutoMusic.currentTime = curentAutoMusic.duration
      setTimeout( function() {
        curentAutoMusic.pause();
      }, 20);
    }
  }
  else {
    warning = true;
    document.getElementById('music').placeholder = 'Доступно только в авто-воспроизведении';
    setTimeout( function() {
      warning = false;
      document.getElementById('music').placeholder = 'Добавить песню...';
      } , 2500);
  }
}

function selectMusic(audio,list){
  if(curentAutoMusic && musicIs == 'auto'){
    curentAutoMusic.pause();
    curentAutoMusic.load();
    curentAutoPlay.style.background = "rgba(255,255,255,1)";
    audio.play();
    curentAutoMusic = audio;
    curentAutoPlay = list;
    curentAutoPlay.style.background = "rgba(69,95,234,0.1)";
    if(isPaused){
      document.getElementById('pauseB').style.color = '#fff';
      isPaused = false;
    }
  }
}



  // audio.play();
  // audio.onended = function() {
  //   musicIs = null;
  //   document.getElementById('music').placeholder = 'Добавить песню...';
  //      document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
  //      document.getElementById('progress').style.width = '0%';
  //   item3.style.background = "rgba(255,255,255,1)";
  //   item3.style.background = "rgba(255,255,255,1)";
  //   curentAutoPlay = null;
  //   curentAutoMusic = null;
  //   autoPlayIsOn = false;
  //   randomAutoMode = false;

  // };
  // musicIs = audioid;
  // item3.style.background = "rgba(69,95,234,0.1)";

  // curentAutoPlay = item3;
  // curentAutoMusic = audio;


  // window.onload = (function() {
  //     VK.init({
  //           apiId: 2046606 //id подключенного сайта
  //         });
  //     function authInfo(response)
  //     {
  //       if (response.session)
  //       {
  //         alert( "Your ID: " + response.session.mid );
  //       }
  //       else
  //       {
  //         alert( 'Вы не авторизованы вконтакте.' );
  //       }
  //     }
  //     VK.Auth.getLoginStatus(authInfo);
  //     alert(1);
  // });
