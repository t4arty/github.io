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
var parsed = [];

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

                groupViewChanges(getGroupData());

                getGroupMembers(parsed);
            }
        }
	});
}

function getGroupMembers(objTarget) {
    var offset = '0';
    var co = '1000';
    var aboutPost = objTarget; // 0-group, 1-item_post
    var group_members_count = 0;
    var code = '';
    
    var manPos = []; //man
    var womanPos = []; //woman

    var bothSex = [];


    /*VK.api('likes.getList', {'type':'post','owner_id':info[0],'item_id':info[1],'offset':OFFSET,'count':15}, function (data) {
        if (data.error) { errorMSG('Wrong: Likes fail.'); }

        m_count = data.response.count;
        var t = data.response;
        var members = [];
        members = members.concat(t.users);

        document.getElementById('m_members').innerHTML = 'Count: '+m_count +'<br>'+ ' users: '+members.length;
        setTimeout(waiting, 333);
    });*/
    console.log("post", aboutPost[0], aboutPost[1]);

    var code1 = 'var a=API.likes.getList({"type":"post","owner_id":"'+aboutPost[0]+'","item_id":"'+aboutPost[1]+'","offset":0,"count":100}); return {"ids":a.items};';

    code = 'var c=0;var co=100;var p=[];var i=0;var o=0;var u=[];'+
        'while(i!=10) {var li=API.likes.getList({"type":"post","owner_id":'+aboutPost[0]+',"item_id":'+aboutPost[1]+',"filter":"likes","friends_only":0,"offset":o,"count":co});'+
        'c=li.count;u=u+API.users.get({"user_ids":li.items,"fields":"sex"})@.sex;i=i+1;o=o+co;}'+
        'return {"count":c,"user":u,"le":u.length};';

    VK.api('execute', { 'code': code1, }, function (data) {
        console.log(data);
        if (data.response.error) {
            errorMSG('Wrong: Group Member');
            console.log("error");
        } else {
            //group_members_count = data.response.count;
            bothSex = bothSex.concat(data.response.user);
            /*for (i = 0; i < bothSex.length; i++) {
                if (bothSex[i] == 1) {
                    manPos.push(i);
                } else {
                    womanPos.push(i);
                }
            }*/

            console.log(data,"bo l: "+bothSex.length, "bo arr: "+bothSex);
            console.log("m: " + manPos.length);
            console.log("w: " + womanPos.length);
        }
    });
}

function getGroupData() {
    return obj;
}

function getParsedInfo() {
    return parsed;
}

function waiting(tsec) {
    //time
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
