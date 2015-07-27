/**
 * 
 */

VK.init({
    apiId: 1755175
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
var wompos = [];
var wArray = [];
var mArray = [];
var m = 0;
var w = 0;

function getGroupInfo(groupId) {
    
    VK.api("groups.getById", { 'group_id': Math.abs(groupId), 'fields': 'members_count,photo_100' }, function (data) {
        if (data.error) {
            errorMSG('Error in data. Wrong group data.')
        }else{
            for (var i = 0; i < data.response.length; i++) {
                grp = data.response[i].name;
                us = data.response[i].members_count;
                grpAvatar = data.response[i].photo_100;

                obj[0] = grp;
                obj[1] = us;
                obj[2] = grpAvatar;

            }
            groupViewChanges(getGroupData());
            waiting();
        }
	});
    
    getGroupMembers(parsed,0);
}



function getGroupMembers(objTargets,offset){ 
    var aboutPost = objTargets; // 0-group, 1-item_post
    var code = '';
    code = 'var c=0;var co=1000;var p=[];var i=0;var o='+offset+';var u=[];'+
        'while(i!=10) {var li=API.likes.getList({"type":"post","owner_id":'+aboutPost[0]+',"item_id":'+aboutPost[1]+',"filter":"likes","friends_only":0,"offset":o,"count":co});'+
        'c=li.count;u=u+API.users.get({"user_ids":li.users,"fields":"sex"})@.sex;i=i+1;o=o+co;}'+
        'return {"count":c,"user":u};';
    
    VK.api('execute', { 'code': code, }, function (data) {
        if (data.response.error) {
            errorMSG('Wrong: Group Member');
            console.log("error");
        } else {
            sexArray = sexArray.concat(JSON.parse("[" + data.response.user + "]"));
            for (i = 0; i < sexArray.length; i++) { // 1 man 2 woman
                if (sexArray[i] == 1) manpos.push(i);
                if (sexArray[i] == 2) wompos.push(i);
            }
            console.log();
            console.log("--------------------------");
            console.log("m: " + manpos.length);
            console.log("w: " + wompos.length);
            console.log(sexArray.length);
        }
    });
}

function getGroupData() {
    return obj;
}

function getParsedInfo() {
    return parsed;
}

function waiting() {
    var se = 0;
    setTimeout(function () {
        if (se++ > 1) {
            waiting();
            console.log('waits ----------------------------------');
        }
    }, 500);
}

    function groupViewChanges(obj) {
        var a = obj;
        document.getElementById('groupName').innerHTML = 'Name: '+a[0];
        document.getElementById('members_count').innerHTML = 'Count: '+a[1];
        document.getElementById('av').src = a[2];
    }

    function parseLink() {
        var link = String(document.getElementById('post').value);
    
        if (link != '' && (link.match('vk.com') == 'vk.com') && (link.match('wall-') == 'wall-')) {
	
            if (link.indexOf('=wall') != -1) {
                var adr = link.substring(link.indexOf('=wall') + 5, link.length);
                var p = adr.split('_');
                if ((p[0] === undefined) && (p[1] === undefined)) {
                    errorMSG('Wrong: group or post or both');
                } else {
                    if ((/\d+/.test(p[0])) && (/\d+/.test(p[1]))) {
                        parsed[0] = p[0]; parsed[1] = p[1];
                        getGroupInfo(parsed[0]);
                    }
                
                }
            } else {
                errorMSG('Wrong: not wall post');
            }
        }else{
            errorMSG('Wrong: not vk.com');
        }
    }

    function clearadress() {
        document.getElementById('post').value = '';
    }

    function errorMSG(msg) {
        document.getElementById('post').value = msg;
        setTimeout(clearadress, 1000);
    }