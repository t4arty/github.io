/**
 * 
 */

VK.init({
    apiId: 1755175
});


var u = 11;

function getGroupInfo() {
    VK.api("groups.getById",{'group_id':'45091870','fields':'members_count,photo_100'}, function(data){
	for(key in data.response) {
	    u = key;
	    document.getElementById('count').innerHTML += u + '<br>';
	}
    });
}

//'http://vk.com/darcor?w=wall-45091870_69859'
//  45091870 