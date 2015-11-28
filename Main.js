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

var sexArray;
var manpos = [];
var sexCountArray = [0,0,0];
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
			getGroupMembers(getParsedInfo(),0);
		}
	});

}

function getGroupMembers(objTargets, offset) {
	var aboutPost = objTargets;
	// 0-group, 1-item_post
	var targetGroup;
	var targetGroupItem;
	var itemsByOneTime=10;


	var code = 'var od=-10639516;var id=62622753;'
               +'var i=0;var off=0;var c=1000;'
               +'var mc=API.likes.getList({"type":"post","owner_id":od,"item_id":id,"count":c,"offset":off}).count;'
               +'var lusers=[]; var like;'
               +'while(i<10 && off<mc){'
               +'like=API.likes.getList({"type":"post","owner_id":od,"item_id":id,"count":c,"offset":off}).items;'
               +'lusers=lusers+API.users.get({"user_ids":like,"fields":"sex"})@.sex;'
               +'off=off+c;i=i+1;};'
               +'return {"c":mc,"sex":lusers};';

	VK.api('execute', {'code' : code,}, function(data) {
		if (data.response.error) {
			errorMSG('Wrong: Group Member');
			console.log("error");
		} else {

			var dtd = data.response.sex;//
			var cM = data.response.c;
			sexArray = dtd;//JSON.parse("["+data.response.sex+"]"); //
			//put different in array.
			for (var i = 0; i < sexArray.length; i++) {// 1 man 2 woman
				if (sexArray[i] == 1) {
					sexCountArray[1]++;
					manpos.push(i);
				}
				if (sexArray[i] == 2){
					sexCountArray[2]++;
					wompos.push(i);
				}
				if (sexArray[i] == 0){
					sexCountArray[0]++; 
					onopos.push(i);
				}
			}
			
			console.log("0: "+sexCountArray[0]);
			console.log("1: "+sexCountArray[1]);
			console.log("2: "+sexCountArray[2]);
			
			console.log("sArray: "+sexArray.length);
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