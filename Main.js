/**
 *
 */

VK.init({
	apiId : 1755175
});

var WRONG_TEXT = 'Something goes wrong. Enter valid post address.';

var grp = '';
var us = '';
var grpAvatar = '';

var obj = [];
var parsed = [0, 0];

var grCount = 0;
var grOffset = 0;

var sexArray = [];
var manpos = [];
var sexCountArray = [];
var wompos = [];
var onopos = [];
var wArray = [];
var mArray = [];
var m = 0;
var w = 0;



function getGroupInfo(groupId) {// ??? 2nd main funtion

	VK.api("groups.getById", {
		'group_id' : Math.abs(groupId),
		'fields' : 'members_count,photo_100'
	}, function(data) {
		if (data.error) {
			errorMSG('Error in data. Wrong group data.')
		} else {
			for (var i = 0; i < data.response.length; i++) {
				grp = data.response[i].name;
				us = data.response[i].members_count;
				grpAvatar = data.response[i].photo_100;

				obj[0] = grp;
				obj[1] = us;
				obj[2] = grpAvatar;

			}
			groupViewChanges(getGroupData());
			//UI changes
			getGroupMembers(getParsedInfo(),1000);
		}
	});

}

function getGroupMembers(objTargets, offset) {
	var aboutPost = objTargets;
	// 0-group, 1-item_post
	var code = '';
	code = 'var c=0;var co=1000;var p=[];var i=0;var o=' + offset + ';var u=[];' + 'while(i!=10) {var li=API.likes.getList({"type":"post","owner_id":' + aboutPost[0] + ',"item_id":' + aboutPost[1] + ',"filter":"likes","friends_only":0,"offset":o,"count":co});' 
	+ 'c=li.count;u=u+API.users.get({"user_ids":li.items,"fields":"sex"})@.sex;i=i+1;o=o+co;}' 
	+ 'return {"count":c,"user":u};';

	VK.api('execute', {'code' : code,}, function(data) {
		if (data.response.error) {
			errorMSG('Wrong: Group Member');
			console.log("error");
		} else {
			sexArray = sexArray.concat(JSON.parse("[" + data.response.user + "]"));
			//put different in array.
			for (var i = 0; i < sexArray.length; i++) {// 1 man 2 woman
				if (sexArray[i] == 1)
					sexCountArray[1]++;
					manpos.push(i);
				if (sexArray[i] == 2)
					sexCountArray[2]++;
					wompos.push(i);
				if (sexArray[i] == 0)
					sexCountArray[0]++; 
					onopos.push(i);
			}
		}
	});
}

function getGroupData() {//data for groupName,groupMembersCount, avatar.
	return obj;
}

function getParsedInfo() {//getting obj {groupID, postID}
	return parsed;
}

function waiting() {//maybe wait some time
	var se = 0;
	var t = setTimeout(function() {
		if (se > 1) {
			waiting();
			console.log('waits ----------------------------------');
			se = 0;
		}
		se++;
	}, 500);
}

function groupViewChanges(obj) {//changes UI view
	var a = obj;
	document.getElementById('groupName').innerHTML = 'Name: ' + a[0];
	document.getElementById('members_count').innerHTML = 'Count: ' + a[1];
	document.getElementById('av').src = a[2];
}

function parseLink() {// main function for parse link from text area.
	var link = String(document.getElementById('post').value);

	if (link != '' && (link.match('vk.com') == 'vk.com') && (link.match('wall-') == 'wall-')) {

		if (link.indexOf('=wall') != -1) {
			var adr = link.substring(link.indexOf('=wall') + 5, link.length);
			var p = adr.split('_');
			if ((p[0] === undefined) && (p[1] === undefined)) {
				errorMSG('Wrong: group or post or both');
			} else {
				if ((/\d+/.test(p[0])) && (/\d+/.test(p[1]))) {
					parsed[0] = p[0];
					parsed[1] = p[1];
					getGroupInfo(parsed[0]);
				}

			}
		} else {
			errorMSG('Wrong: not wall post');
		}
	} else {
		errorMSG('Wrong: not vk.com');
	}
}

function clearadress() {// clear text area
	document.getElementById('post').value = '';
}

function errorMSG(msg) {// shows error messages in main text area
	document.getElementById('post').value = msg;
	var t = setTimeout(clearadress, 1000);
}