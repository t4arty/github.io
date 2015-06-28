/**
 * 
 */

VK.init({
    apiId: 1755175
});


var grp = '';
var us = '';
var grpAvatar = '';

var obj = [];
var parsed = [];

function getGroupInfo(groupId) {
    
    VK.api("groups.getById", { 'group_id': Math.abs(groupId), 'fields': 'members_count,photo_100' }, function (data) {
        console.log(data);
	for(var i=0;i<data.response.length;i++) {
	    grp = data.response[i].name;
	    us = data.response[i].members_count;
	    grpAvatar = data.response[i].photo_100;
	    
	    obj[0] = grp;
	    obj[1] = us;
	    obj[2] = grpAvatar;
	    
	    wait();
	}
    });
}
function getGroupData() {
    return obj;
}

function wait() {
    var a = getGroupData();
    document.getElementById('groupName').innerHTML = a[0];
    document.getElementById('members_count').innerHTML = a[1];
    document.getElementById('av').src = a[2];
    console.log('Done');
}

function parseLink() {
    var link = String(document.getElementById('post').value);
    
    if (link != '' && (link.match('vk.com')=='vk.com')) {
	var a = document.createElement('a');
	a.href = link;
	parsed[0] = a.search.split('=wall')[1].split('_')[0];
	parsed[1] = a.search.split('=wall')[1].split('_')[1];
	
	console.log(parsed[0], parsed[1], String(window.location).match('vk,com'));
	getGroupInfo(parsed[0]);

    }else{
	document.getElementById('post').value = 'Something goes wrong. Enter valid string. GL';
    }
}

function contain(str,what) {
    var s = str;
    
}

//'http://vk.com/darcor?w=wall-45091870_69859'
//  45091870 