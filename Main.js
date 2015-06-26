/**
 * 
 */

VK.init({
    apiId: 1755175
});


var u = 11;

function test1() {
    VK.api("users.get",{user_ids:"1,2,3"}, function(data){
	u = data.response.id;
	document.getElementById('count').innerHTML = u;
    });
}

