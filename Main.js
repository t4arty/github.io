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
var info = [];

function getGroupInfo() {
    VK.api("groups.getById",{'group_id': '45091870','fields':'members_count,photo_100'}, function(data){
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
    var link = '';
    
    if (link != '' || link.contains('vk.com')) {
	
    }
}

//'http://vk.com/darcor?w=wall-45091870_69859'
//  45091870 