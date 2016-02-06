/**
 * cheer
 */

VK.init({
	apiId : 1755175
});

var WRONG_TEXT = 'Something goes wrong. Enter valid post address.';

var grp = '';
var us = '';
var grpAvatar = '';

var obj = [];
var parsed = new Array(2);

var grCount = 0;
var grOffset = 0;

var sexArray = [];
var manpos = [];
var wompos = [];
var onopos = [];
var wArray = [];
var mArray = [];
var m = 0;
var w = 0;

//boys girls
var sexCountArray = [];
	sexCountArray[0] = 0;
	sexCountArray[1] = 0;
	sexCountArray[2] = 0;
//

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
			//UI changes group view(avatar name and so on)
			groupViewChanges(getGroupData());
			//UI changes
			progressMembersStart(); //start msg about job
			getGroupMembers(getParsedInfo(),massoff);
		}

	});
}

function makeCanculateSex(array) {
var sexArr = array;
	for (var s in sexArr) {
		if (s == 0) sexCountArray[0]++;
		if (s == 1) sexCountArray[1]++;
		if (s == 2) sexCountArray[2]++;
	}

	for (var r in sexCountArray) {
		console.log(r);
	}
}

function getGroupMembers(objTargets, offset) {

	var clearTimeout = [];
	var cMembers = 0;
	var aboutPost = objTargets;
	// 0-group, 1-item_post
	var code = '';
	code = 'var od='+aboutPost[0]+';'
           +'var id='+aboutPost[1]+';'
           +'var i=0;var off='+offset+';var c=1000;'
           +'var mc=API.likes.getList({"type":"post","owner_id":od,"item_id":id,"count":c,"offset":off}).count;'
           +'var lusers=[]; var like;'
           +'while(i<10 && off<mc){'
           +'like=API.likes.getList({"type":"post","owner_id":od,"item_id":id,"count":c,"offset":off}).users;'
           +'lusers=lusers+API.users.get({"user_ids":like,"fields":"sex"})@.sex;'
           +'off=off+c;i=i+1;};'
           +'return {"count":mc,"sex":lusers};';

	VK.api('execute', {'code' : code,}, function(data) {
		if (data.error) {
			errorMSG('Wrong: Group Member');
			console.log(data.error.error_msg);
		} else {

			document.getElementById("m_members").innerHTML = 'Count: ' + data.response.count + ' members.' + " Length sex: " + data.response.sex.length;
			document.getElementById("pCaption").innerHTML += '<br><br>'+data.response.sex;
			var dtd = data.response.sex;
			var cM = data.response.count;
			cMembers = cM;
			sexArray = sexArray.concat(dtd);
			massoff = sexArray.length;

			if (cM > sexArray.length) {
				setTimeout(function() { getGroupMembers(getParsedInfo(), massoff); },500);
			}else{
				makeCanculateSex(sexArray);
				console.log("sArray : "+sexArray.length);
				console.log('Array full');
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

function progressMembersStart() {
	document.getElementById('goes').innerHTML = 'Start.'
}
function progressMembersEnd() {
	document.getElementById('goes').innerHTML = 'End.'
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