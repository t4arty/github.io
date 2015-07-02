/**
 * 
 */

VK.init({
    apiId: 1755175
});

var WRONG_TEXT = 'Something goes wrong. Enter valid string.';

var grp = '';
var us = '';
var grpAvatar = '';

var obj = [];
var parsed = [];

function getGroupInfo(groupId) {
    
    VK.api("groups.getById", { 'group_id': Math.abs(groupId), 'fields': 'members_count,photo_100' }, function (data) {
        if (data.error) {
            return;
        }
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
}

function parseLink() {
    var link = String(document.getElementById('post').value);
    
    if (link != '' && (link.match('vk.com') == 'vk.com') && (link.match('wall-') == 'wall-')) {
	
        if (link.indexOf('=wall') != -1) {
            var adr = link.substring(link.indexOf('=wall') + 5, link.length);
            var p = adr.split('_');
            if ((p[0] === undefined) && (p[1] === undefined)) {
                errorMSG();
            } else {
                parsed[0] = p[0];
                parsed[1] = p[1];
                getGroupInfo(parsed[0]);
            }
        } else {
            errorMSG();
        }
    }else{
        errorMSG();
    }
}

function clearadress() {
    document.getElementById('post').value = '';
}

function errorMSG() {
    document.getElementById('post').value = WRONG_TEXT;
    setTimeout(clearadress, 800);
}

//'http://vk.com/darcor?w=wall-45091870_69859'
//  45091870 