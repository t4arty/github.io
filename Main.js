/**
 * 
 */

VK.init({
    apiId: 1755175
});


var u = 11;

function test1() {
    VK.api("users.get",{user_ids:"1,2,3"}, function(data){
	for(i=0;i<data.response.length;i++) {
	    u = data.response[i].first_name;
	    document.getElementById('count').innerHTML += u + '<br>';
	}
    });
}

